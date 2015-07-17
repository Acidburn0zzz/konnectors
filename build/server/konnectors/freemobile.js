// Generated by CoffeeScript 1.9.0
var File, PhoneBill, async, cheerio, cozydb, fetcher, filterExisting, fs, getBillPage, getImageAndIdentifyNumber, getImageAndIdentifyNumbers, getNumberValue, getSmallImage, getSound, linkBankOperation, localization, log, logIn, logOut, moment, parseBillPage, pngjs, prepareLogIn, request, requestJson, saveDataAndFile, transcodeLogin, unifyLogin;

cozydb = require('cozydb');

requestJson = require('request-json');

moment = require('moment');

cheerio = require('cheerio');

fs = require('fs');

async = require('async');

pngjs = require('pngjs-image');

request = require('request');

File = require('../models/file');

fetcher = require('../lib/fetcher');

filterExisting = require('../lib/filter_existing');

saveDataAndFile = require('../lib/save_data_and_file');

linkBankOperation = require('../lib/link_bank_operation');

localization = require('../lib/localization_manager');

log = require('printit')({
  prefix: "Free Mobile",
  date: true
});

request = request.defaults({
  headers: {
    "User-Agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0"
  }
});

PhoneBill = cozydb.getModel('PhoneBill', {
  date: Date,
  vendor: String,
  amount: Number,
  fileId: String
});

PhoneBill.all = function(callback) {
  return PhoneBill.request('byDate', callback);
};

module.exports = {
  name: "Free Mobile",
  slug: "freemobile",
  description: 'konnector description free mobile',
  vendorLink: "https://mobile.free.fr/",
  fields: {
    login: "text",
    password: "password",
    folderPath: "folder"
  },
  models: {
    phonebill: PhoneBill
  },
  init: function(callback) {
    var map;
    map = function(doc) {
      return emit(doc.date, doc);
    };
    return PhoneBill.defineRequest('byDate', map, function(err) {
      return callback(err);
    });
  },
  fetch: function(requiredFields, callback) {
    log.info("Import started");
    return fetcher["new"]().use(prepareLogIn).use(getImageAndIdentifyNumbers).use(logIn).use(getBillPage).use(parseBillPage).use(logOut).use(filterExisting(log, PhoneBill)).use(saveDataAndFile(log, PhoneBill, 'freemobile', ['facture'])).use(linkBankOperation({
      log: log,
      model: PhoneBill,
      identifier: 'free mobile',
      dateDelta: 14,
      amountDelta: 0.1
    })).args(requiredFields, {}, {}).fetch(function(err, fields, entries) {
      var localizationKey, notifContent, options, _ref;
      log.info("Import finished");
      notifContent = null;
      if ((entries != null ? (_ref = entries.filtered) != null ? _ref.length : void 0 : void 0) > 0) {
        localizationKey = 'notification free mobile';
        options = {
          smart_count: entries.filtered.length
        };
        notifContent = localization.t(localizationKey, options);
      }
      return callback(err, notifContent);
    });
  }
};

logOut = function(requiredFields, billInfos, data, next) {
  var logOutUrl, options;
  logOutUrl = "https://mobile.free.fr/moncompte/index.php?logout=user";
  options = {
    method: 'GET',
    url: logOutUrl,
    jar: true
  };
  return request(options, function(err, res, body) {
    if (err != null) {
      log.error("Couldn't logout of Free Mobile website");
      next(err);
    }
    return next();
  });
};

prepareLogIn = function(requiredFields, billInfos, data, next) {
  var homeUrl, options;
  homeUrl = "https://mobile.free.fr/moncompte/index.php?page=home";
  options = {
    method: 'GET',
    jar: true,
    url: homeUrl
  };
  return request(options, function(err, res, body) {
    var $, loginPageData;
    if (err != null) {
      log.error("Cannot connect to Free Mobile : " + homeUrl);
      next(err);
    }
    loginPageData = body;
    data.imageUrlAndPosition = [];
    $ = cheerio.load(loginPageData);
    $('img[class="ident_chiffre_img pointer"]').each(function() {
      var imagePath, position;
      imagePath = $(this).attr('src');
      position = $(this).attr('alt');
      position = position.replace('position ', '');
      return data.imageUrlAndPosition.push({
        imagePath: imagePath,
        position: position
      });
    });
    return next();
  });
};

getImageAndIdentifyNumbers = function(requiredFields, billInfos, data, next) {
  var urlAndPosition;
  urlAndPosition = data.imageUrlAndPosition;
  return async.map(urlAndPosition, getImageAndIdentifyNumber, function(err, results) {
    if (err != null) {
      log.error("Coud not get or decode image");
      next(err);
    }
    data.conversionTable = results;
    return next();
  });
};

logIn = function(requiredFields, billInfos, data, next) {
  var baseUrl, homeUrl, transcodedLogin, uniqueLogin;
  homeUrl = "https://mobile.free.fr/moncompte/index.php?page=home";
  baseUrl = "https://mobile.free.fr/moncompte/";
  transcodedLogin = transcodeLogin(requiredFields.login, data.conversionTable);
  uniqueLogin = unifyLogin(transcodedLogin);
  return async.eachSeries(uniqueLogin, getSmallImage, function(err) {
    var form, i, login, options, _i, _len;
    if (err != null) {
      next(err);
    }
    login = "";
    for (_i = 0, _len = transcodedLogin.length; _i < _len; _i++) {
      i = transcodedLogin[_i];
      login += i;
    }
    form = {
      login_abo: login,
      pwd_abo: requiredFields.password
    };
    options = {
      method: 'POST',
      form: form,
      jar: true,
      url: homeUrl,
      headers: {
        referer: homeUrl
      }
    };
    return request(options, function(err, res, body) {
      if ((err != null) || (res.headers.location == null) || res.statusCode !== 302) {
        log.error("Authentification error");
        next('bad credentials');
      }
      options = {
        method: 'GET',
        jar: true,
        url: homeUrl,
        headers: {
          referer: homeUrl
        }
      };
      return request(options, function(err, res, body) {
        var $, connectionForm;
        if (err != null) {
          next(err);
        }
        $ = cheerio.load(body);
        connectionForm = $('#form_connect');
        if (connectionForm.length !== 0) {
          log.error("Authentification error");
          next('bad credentials');
        }
        return next();
      });
    });
  });
};

getBillPage = function(requiredFields, billInfos, data, next) {
  var billUrl, options;
  billUrl = "https://mobile.free.fr/moncompte/index.php?page=suiviconso";
  options = {
    method: 'GET',
    url: billUrl,
    jar: true
  };
  return request(options, function(err, res, body) {
    if (err != null) {
      next(err);
    }
    data.html = body;
    return next();
  });
};

parseBillPage = function(requiredFields, bills, data, next) {
  var $;
  bills.fetched = [];
  if (data.html == null) {
    return next();
  }
  $ = cheerio.load(data.html);
  $('div[class="factLigne hide "]').each(function() {
    var amount, bill, date, month, pdfUrl;
    log.info("New bill found");
    amount = $($(this).find('.montant')).text();
    amount = amount.replace('€', '');
    amount = parseFloat(amount);
    pdfUrl = $(this).find('.pdf a').attr('href');
    pdfUrl = "https://mobile.free.fr/moncompte/" + pdfUrl;
    month = $(this).find('.date span').attr('title');
    moment.lang('fr');
    date = moment(month, 'LL');
    bill = {
      amount: amount,
      date: date,
      vendor: 'Free Mobile'
    };
    if (date.year() > 2011) {
      bill.pdfurl = pdfUrl;
    }
    return bills.fetched.push(bill);
  });
  return next();
};

getImageAndIdentifyNumber = function(imageInfo, callback) {
  var baseUrl;
  baseUrl = "https://mobile.free.fr/moncompte/";
  return getSound(imageInfo.position, function(err) {
    var options;
    if (err != null) {
      callback(err, null);
    }
    options = {
      method: 'GET',
      jar: true,
      url: "" + baseUrl + imageInfo.imagePath,
      encoding: null
    };
    return request(options, function(err, res, body) {
      if (err != null) {
        callback(err, null);
      }
      return pngjs.loadImage(body, function(err, resultImage) {
        var blue, green, idx, image, stringcheck, x, y, _i, _j;
        if (resultImage.getWidth() < 24 || resultImage.getHeight() < 28) {
          callback('Wrong image size', null);
        }
        stringcheck = "";
        for (x = _i = 15; _i <= 22; x = ++_i) {
          for (y = _j = 12; _j <= 26; y = ++_j) {
            idx = resultImage.getIndex(x, y);
            green = resultImage.getGreen(idx);
            blue = resultImage.getBlue(idx);
            if (green + blue < 450) {
              stringcheck += "1";
            } else {
              stringcheck += "0";
            }
          }
        }
        image = {
          position: "" + imageInfo.position,
          numberValue: "" + (getNumberValue(stringcheck))
        };
        return callback(err, image);
      });
    });
  });
};

getSound = function(position, callback) {
  var baseUrl, options;
  baseUrl = "https://mobile.free.fr/moncompte/";
  options = {
    method: 'GET',
    url: baseUrl + "chiffre.php?getsound=1&pos=" + position,
    jar: true,
    headers: {
      referer: baseUrl + "sound/soundmanager2_flash9.swf"
    }
  };
  return request(options, function(err, res, body) {
    if (err != null) {
      callback(err);
    }
    return callback(null);
  });
};

getNumberValue = function(stringcheck) {
  var distance, distanceMin, i, idxDistanceMin, j, symbols, _i, _j, _ref;
  symbols = ['001111111111110011111111111111111111111111111110000000000011110000000000011111111111111111011111111111111001111111111110', '001110000000000001110000000000001110000000000011111111111111111111111111111111111111111111000000000000000000000000000000', '011110000001111011110000111111111000001111111110000011110011110000111100011111111111000011011111110000011001111000000011', '011100000011110111100000011111111000110000111110000110000011110001110000011111111111111111011111111111110001110001111100', '000000011111000000001111111000000111110011000011110000011000111111111111111111111111111111111111111111111000000000011000', '111111110011110111111110011111111001110000111111001100000011111001100000011111001111111111111001111111111010000111111110', '001111111111110011111111111111111111111111111110001100000011110001100000011111001111111111111101111111111011100111111110', '111000000000000111000000000000111000000011111111000011111111111011111111111111111111000000111111000000000111100000000000', '001110001111110011111111111111111111111111111110000110000011110000110000011111111111111111011111111111111001111001111110', '001111111000110011111111100111111111111100111110000001100011110000001100011111111111111111011111111111111001111111111110'];
  distanceMin = stringcheck.length;
  idxDistanceMin = 10;
  for (i = _i = 0; _i <= 9; i = ++_i) {
    if (stringcheck === symbols[i]) {
      return i;
    } else {
      distance = 0;
      for (j = _j = 0, _ref = stringcheck.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; j = 0 <= _ref ? ++_j : --_j) {
        if (stringcheck[j] !== symbols[i][j]) {
          distance += 1;
        }
      }
      if (distance < distanceMin) {
        idxDistanceMin = i;
        distanceMin = distance;
      }
    }
  }
  return idxDistanceMin;
};

transcodeLogin = function(login, conversionTable) {
  var conversion, i, transcoded, _i, _j, _len, _len1;
  transcoded = [];
  for (_i = 0, _len = login.length; _i < _len; _i++) {
    i = login[_i];
    for (_j = 0, _len1 = conversionTable.length; _j < _len1; _j++) {
      conversion = conversionTable[_j];
      if (conversion.numberValue === i) {
        transcoded.push(conversion.position);
      }
    }
  }
  return transcoded;
};

unifyLogin = function(login) {
  var digit, initTest, unique, valeur, _i, _j, _len, _len1;
  unique = [];
  for (_i = 0, _len = login.length; _i < _len; _i++) {
    digit = login[_i];
    initTest = true;
    for (_j = 0, _len1 = unique.length; _j < _len1; _j++) {
      valeur = unique[_j];
      if (valeur === digit) {
        initTest = false;
      }
    }
    if (initTest) {
      unique.push(digit);
    }
  }
  return unique;
};

getSmallImage = function(digit, callback) {
  var baseUrl, options;
  baseUrl = "https://mobile.free.fr/moncompte/";
  options = {
    method: 'GET',
    jar: true,
    url: baseUrl + "chiffre.php?pos=" + digit + "&small=1"
  };
  return request(options, function(err, res, body) {
    if (err != null) {
      callback(err);
    }
    return setTimeout(callback, 500, null);
  });
};
