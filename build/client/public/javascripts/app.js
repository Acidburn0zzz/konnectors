(function(){"use strict";var e=typeof window=="undefined"?global:window;if(typeof e.require=="function")return;var t={},n={},r={}.hasOwnProperty,i={},s=function(e,t){return e.indexOf(t,e.length-t.length)!==-1},o=function(e,t){var n=0;t&&(t.indexOf(!1)&&(n="components/".length),t.indexOf("/",n)>0&&(t=t.substring(n,t.indexOf("/",n))));var r=i[e+"/index.js"]||i[t+"/deps/"+e+"/index.js"];return r?"components/"+r.substring(0,r.length-".js".length):e},u=function(){var e=/^\.\.?(\/|$)/;return function(t,n){var r=[],i,s;i=(e.test(n)?t+"/"+n:n).split("/");for(var o=0,u=i.length;o<u;o++)s=i[o],s===".."?r.pop():s!=="."&&s!==""&&r.push(s);return r.join("/")}}(),a=function(e){return e.split("/").slice(0,-1).join("/")},f=function(t){return function(n){var r=u(a(t),n);return e.require(r,t)}},l=function(e,t){var r={id:e,exports:{}};return n[e]=r,t(r.exports,f(e),r),r.exports},c=function(e,i){var s=u(e,".");i==null&&(i="/"),s=o(e,i);if(r.call(n,s))return n[s].exports;if(r.call(t,s))return l(s,t[s]);var a=u(s,"./index");if(r.call(n,a))return n[a].exports;if(r.call(t,a))return l(a,t[a]);throw new Error('Cannot find module "'+e+'" from '+'"'+i+'"')};c.alias=function(e,t){i[t]=e},c.register=c.define=function(e,n){if(typeof e=="object")for(var i in e)r.call(e,i)&&(t[i]=e[i]);else t[e]=n},c.list=function(){var e=[];for(var n in t)r.call(t,n)&&e.push(n);return e},c.brunch=!0,e.require=c})(),require.register("collections/folders",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return i(n,e),n.prototype.model=t("../models/folder"),n.prototype.url="folders/",n.prototype.comparator=function(e,t){return e.getFullPath().localeCompare(t.getFullPath())},n.prototype.getAllPaths=function(){return this.models.map(function(e){return{path:e.getFullPath(),id:e.get("id")}})},n}(Backbone.Collection)}),require.register("collections/konnectors",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return i(n,e),n.prototype.model=t("../models/konnector"),n.prototype.url="konnectors/",n.prototype.comparator=function(e,t){return e.isConfigured()&&!t.isConfigured()?-1:!e.isConfigured()&&t.isConfigured()?1:e.get("name")>t.get("name")?1:e.get("name")<t.get("name")?-1:0},n}(Backbone.Collection)}),require.register("initialize",function(e,t,n){var r,i,s,o,u,a;a=t("./lib/request"),o=t("./realtime"),s=t("../collections/konnectors"),i=t("../collections/folders"),r=t("./views/app_view"),u=t("./router"),$(function(){var e,n,a,f,l,c,h,p,d,v;h=window.locale,d=new Polyglot;try{p=t("locales/"+h)}catch(m){n=m,h="en",p=t("locales/en")}return d.extend(p),window.t=d.t.bind(d),l=window.initKonnectors||[],f=window.initFolders||[],c=new s(l),a=new i(f),v=new o,v.watch(c),v.watch(a),e=new r({collection:c,folders:a}),e.render(),window.router=new u({appView:e}),Backbone.history.start()})}),require.register("lib/base_view",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t.prototype.template=function(){},t.prototype.initialize=function(){},t.prototype.getRenderData=function(){var e;return{model:(e=this.model)!=null?e.toJSON():void 0}},t.prototype.render=function(){return this.beforeRender(),this.$el.html(this.template(this.getRenderData())),this.afterRender(),this},t.prototype.beforeRender=function(){},t.prototype.afterRender=function(){},t.prototype.destroy=function(){return this.undelegateEvents(),this.$el.removeData().unbind(),this.remove(),Backbone.View.prototype.remove.call(this)},t}(Backbone.View)}),require.register("lib/request",function(e,t,n){e.request=function(e,t,n,r){return $.ajax({type:e,url:t,data:n!=null?JSON.stringify(n):null,contentType:"application/json",dataType:"json",success:function(e){if(r!=null)return r(null,e)},error:function(e){if(e!=null&&e.msg!=null&&r!=null)return r(new Error(e.msg));if(r!=null)return r(new Error("Server error occured"))}})},e.get=function(t,n){return e.request("GET",t,null,n)},e.post=function(t,n,r){return e.request("POST",t,n,r)},e.put=function(t,n,r){return e.request("PUT",t,n,r)},e.del=function(t,n){return e.request("DELETE",t,null,n)}}),require.register("lib/view_collection",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o=function(e,t){function r(){this.constructor=e}for(var n in t)u.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u={}.hasOwnProperty;r=t("lib/base_view"),n.exports=i=function(e){function t(){return this.fetch=s(this.fetch,this),this.removeItem=s(this.removeItem,this),this.addItem=s(this.addItem,this),t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.itemview=null,t.prototype.views={},t.prototype.template=function(){return""},t.prototype.itemViewOptions=function(){},t.prototype.collectionEl=null,t.prototype.onChange=function(){return this.$el.toggleClass("empty",_.size(this.views)===0)},t.prototype.appendView=function(e){return this.$collectionEl.append(e.el)},t.prototype.initialize=function(){return t.__super__.initialize.apply(this,arguments),this.views={},this.listenTo(this.collection,"reset",this.onReset),this.listenTo(this.collection,"add",this.addItem),this.listenTo(this.collection,"remove",this.removeItem),this.listenTo(this.collection,"sort",this.render),this.$collectionEl=$(this.collectionEl)},t.prototype.render=function(){var e,n,r;n=this.views;for(e in n)r=n[e],r.$el.detach();return t.__super__.render.apply(this,arguments)},t.prototype.afterRender=function(){var e,t,n;t=this.views;for(e in t)n=t[e],this.appendView(n.$el);return this.onReset(this.collection),this.onChange(this.views)},t.prototype.remove=function(){return this.onReset([]),t.__super__.remove.apply(this,arguments)},t.prototype.onReset=function(e){var t,n,r;n=this.views;for(t in n)r=n[t],r.remove();return e.forEach(this.addItem)},t.prototype.addItem=function(e){var t,n;return t=_.extend({},{model:e},this.itemViewOptions(e)),n=new this.itemview(t),this.views[e.cid]=n.render(),this.appendView(n),this.onChange(this.views)},t.prototype.removeItem=function(e){return this.views[e.cid].remove(),delete this.views[e.cid],this.onChange(this.views)},t.prototype.fetch=function(e){return this.collection.fetch(e)},t}(r)}),require.register("locales/en",function(e,t,n){n.exports={"bad credentials":"Bad Credentials","no bills retrieved":"No bills retrieved","key not found":"Key not found","last import:":"Last import:","save and import":"Save and import","auto import":"Automatic import","imported data:":"Imported data:","importing...":"importing...","no import performed":"No import performed",firstname:"Firstname",lastname:"Lastname",login:"Login",password:"Password",email:"Email",accessToken:"Access token",accessTokenSecret:"Access token secret",consumerKey:"Consumer Key",consumerSecret:"Consumer Secret",apikey:"Api key",phoneNumber:"Phone number",folderPath:"Folder path",none:"None","every hour":"Every hour","every day":"Every day","every week":"Every week","each month":"Each month","date format":"LLL","home headline":"With Konnectors you can retrieve many data and save them into your Cozy.\nFrom your phone bills to your connected scale, or your tweets. Configure the connectors you are interested in:","home config step 1":"Select a connector in the menu on the left","home config step 2":"Follow the instructions to configure it","home config step 3":"Your data are retrieved and saved into your Cozy","home more info":"More information:","home help step 1":"You must manually trigger the import, except if you enable the auto-import.","home help step 2":"Disable the auto-stop feature for the Konnector application in your Cozy, otherwise the auto-import won't work.","notification import error":"an error occurred during import of data","error occurred during import.":"An error occurred during the last import.","error occurred during import:":"An error occurred during the last import:","konnector description free":"Download all your internet bills from Free. This konnector requires the Files application to store the bill PDF files.","konnector description free mobile":"Download all your phone bills from Free Mobile. This konnector requires the Files application to store the bill PDF files.","konnector description bouygues":"Download all your phone bills from Bouygues Telecom. This konnector requires the Files application to store the bill PDF files.","konnector description bouygues box":"Download all your internet bills from Bouygues Telecom. This konnector requires the Files application to store the bill PDF files.","konnector description github":"Download all your Github Bills. This konnector requires the Files application to store the bill PDF files.","konnector description github commits":"Save infos from all your Github Commits.","konnector description jawbone":"Download Move and Sleep Data from Jawbone CSV file.","konnector description rescuetime":"Download all your activities from Rescue Time","konnector description withings":"Download all your measures from your Withings account.","konnector description twitter":'Download all your tweets published on Twitter. This konnector requires two\nidentifiers and two secret keys. They can be generated on the <a\nhref="https://apps.twitter.com/">Twitter app dashboard</a>. There you will\nbe able to create an app. They will give you credentials for this app. The\ncurrent konnector will use them to connect to Twitter and fetch your data.',"notification prefix":"Konnector %{name}:","notification github commits":"%{smart_count} new commit imported |||| %{smart_count} new commits imported","notification twitter":"%{smart_count} new tweet imported |||| %{smart_count} new tweets imported","notification free":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification github":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification jawbone":"%{smart_count} new measure imported |||| %{smart_count} new measures imported","notification rescuetime":"%{smart_count} new activity imported |||| %{smart_count} new activites imported","notification withings":"%{smart_count} new measure imported |||| %{smart_count} new measures imported","notification free mobile":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported"}}),require.register("locales/fr",function(e,t,n){n.exports={"bad credentials":"Mauvais identifiants","no bills retrieved":"Pas de facture trouvées","key not found":"Clé non trouvée","last import:":"Dernière importation :","save and import":"Sauvegarder et importer","auto import":"Importation automatique","imported data:":"Données importées :","importing...":"importation en cours...","no import performed":"Pas d'importation effectuée",firstname:"Prénom",lastname:"Nom",login:"Identifiant",password:"Mot de passe",email:"Mail",accessToken:"Access token",accessTokenSecret:"Access token secret",consumerKey:"Consumer Key",consumerSecret:"Consumer Secret",apikey:"Api key",phoneNumber:"Numéro de téléphone",folderPath:"Chemin du dossier",none:"Aucun","every hour":"Toutes les heures","every day":"Tous les jours","every week":"Toutes les semaines","each month":"Tous les mois","date format":"DD/MM/YYYY [à] HH[h]mm","home headline":"Konnectors vous permet de récupérer de nombreuses données et de les intégrer votre Cozy.\nDe vos factures de téléphone aux données de votre balance connectée en passant par vos tweets. Configurez les connecteurs qui vous intéressent :","home config step 1":"Sélectionnez un connecteur dans le menu à gauche","home config step 2":"Suivez les instructions pour le configurer","home config step 3":"Vos données sont récupérées et intégrer à votre Cozy","home more info":"Quelques informations supplémentaires :","home help step 1":"Vous devez manuellement déclencher l'importation sauf si vous avez activé l'importation automatique","home help step 2":"Désactivez la fonction d'auto-stop pour l'application Konnectors dans votre Cozy, sinon l'importation automatique ne fonctionnera pas.","notification import error":"une erreur est survenue pendant l'importation des données","error occurred during import.":"Une erreur est survenue lors de la dernière importation.","error occurred during import:":"Une erreur est survenue lors de la dernière importation :","konnector description free":"Téléchargez toutes vos factures internet de Free. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description free mobile":"Téléchargez toutes vos factures Free Mobile. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description bouygues":"Téléchargez toutes vos factures téléphones de Bouygues Telecom. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description bouygues box":"Téléchargez toutes vos factures internet de Bouygues Telecom. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description github":"Téléchargez toutes vos factures Github. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description github commits":"Sauvegardez les informations de tous vos commits Github.","konnector description jawbone":"Téléchargez les données de déplacement et de sommeil depuis un fichier CSV Jawbone.","konnector description rescuetime":"Téléchargez toutes vos activités RescueTime.","konnector description withings":"Téléchargez toutes les mesures de vos appareils Withings.","konnector description twitter":"Téléchargez tous vos tweets publiés sur Twitter.","konnector description twitter":'Téléchargez tous vos tweets publiés sur Twitter. Ce connecteur requiert\ndeux identifiants and deux clés secrètes. Vous pouvez les générer via le\nhref="https://apps.twitter.com/">tableau Twitter de gestion\nd\'applications</a>. Vous pourrez y créez une application. Twitter vous\nfournira des identifiants pour cette application. Avec ces identifiants\nce connecteur pourra récupérer vos données.',"notification prefix":"Konnector %{name} :","notification github commits":"%{smart_count} nouveau commit importé |||| %{smart_count} nouveaux commits importés","notification twitter":"%{smart_count} nouveau tweet importé |||| %{smart_count} nouveaux tweets importés","notification free":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification github":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification jawbone":"%{smart_count} nouvelle mesure importée |||| %{smart_count} nouvelles mesures importées","notification rescuetime":"%{smart_count} nouvelle activité importée |||| %{smart_count} nouvelles activités importées","notification withings":"%{smart_count} nouvelle mesure importée |||| %{smart_count} nouvelles mesures importées","notification free mobile":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées"}}),require.register("models/folder",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t.prototype.rootUrl="folders/",t.prototype.url=function(){return"folders/"+this.get("id")},t.prototype.getFullPath=function(){return this.get("path")+"/"+this.get("name")},t}(Backbone.Model)}),require.register("models/konnector",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t.prototype.rootUrl="konnectors/",t.prototype.url=function(){return"konnectors/"+this.get("id")},t.prototype.isConfigured=function(){var e,t,n,r,i,s,o,u;n=this.get("fieldValues")||{},r=this.get("fields"),s=Object.keys(n).length,o=Object.keys(r).length,i=!0;for(e in r)t=r[e],i=i&&((u=n[e])!=null?u.length:void 0)>0;return s>=o&&i},t}(Backbone.Model)}),require.register("realtime",function(e,n,r){var i,s,o,u=function(e,t){function r(){this.constructor=e}for(var n in t)a.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},a={}.hasOwnProperty;s=n("../models/konnector"),i=n("../models/folder"),r.exports=o=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return u(n,e),n.prototype.models={konnector:s,folder:i},n.prototype.events=["konnector.update","folder.create","folder.update","folder.delete"],n.prototype.onRemoteUpdate=function(e){var n,r,s,o,u,a;return(e!=null?(u=e.get("docType"))!=null?u.toLowerCase():void 0:void 0)==="konnector"?(r=e.get("isImporting"),a=e.get("slug"),s=e.get("lastImport"),n=moment(s).format(t("date format")),o=$(".konnector-"+a+" .last-import"),r?o.html(t("importing...")):s!=null?o.html(n):o.html(t("no import performed"))):Backbone.Mediator.pub("folders:update",new i(e.attributes))},n.prototype.onRemoteCreate=function(e){return Backbone.Mediator.pub("folders:create",e)},n.prototype.onRemoteDelete=function(e){return Backbone.Mediator.pub("folders:delete",e)},n}(CozySocketListener)}),require.register("router",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t.prototype.routes={"":"main","konnector/:slug":"konnector"},t.prototype.initialize=function(e){return t.__super__.initialize.call(this),this.appView=e.appView},t.prototype.main=function(){return this.appView.showDefault()},t.prototype.konnector=function(e){return this.appView.showKonnector(e)},t}(Backbone.Router)}),require.register("views/app_view",function(e,t,n){var r,i,s,o,u,a=function(e,t){function r(){this.constructor=e}for(var n in t)f.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},f={}.hasOwnProperty;i=t("../lib/base_view"),s=t("./konnector"),o=t("./menu"),u=t("../lib/request"),n.exports=r=function(e){function n(e){n.__super__.constructor.call(this,e),this.folders=e.folders}return a(n,e),n.prototype.el="body",n.prototype.template=t("./templates/home"),n.prototype.defaultTemplate=t("./templates/default"),n.prototype.events={"click #menu-toggler":"toggleMenu"},n.prototype.subscriptions={"folders:create":"onFolderRemoteCreate","folders:update":"onFolderRemoteUpdate","folders:delete":"onFolderRemoteDelete"},n.prototype.afterRender=function(){return this.container=this.$(".container"),this.menuView=new o({collection:this.collection}),this.menuView.render()},n.prototype.showDefault=function(){return this.menuView.unselectAll(),this.container.html(this.defaultTemplate()),this.hideMenu()},n.prototype.showKonnector=function(e){var t,n,r,i;return r=this.collection.findWhere({slug:e}),i=this.folders.getAllPaths(),this.konnectorView!=null&&this.konnectorView.destroy(),t=this.container.find("#default"),t.length>0&&(this.$("#menu-toggler").remove(),t.remove()),r!=null?(this.konnectorView=new s({model:r,paths:i}),n=this.konnectorView.render().$el,this.$(".container").append(n),this.menuView.unselectAll(),this.menuView.selectItem(r.cid),this.hideMenu()):window.router.navigate("",!0)},n.prototype.toggleMenu=function(){return this.$("#menu").toggleClass("active")},n.prototype.hideMenu=function(){return this.$("#menu").removeClass("active")},n.prototype.onFolderRemoteCreate=function(e){return this.folders.add(e),this.konnectorView.paths=this.folders.getAllPaths(),this.konnectorView.render()},n.prototype.onFolderRemoteUpdate=function(e){if(e!=null)return this.folders.add(e,{merge:!0}),this.konnectorView.paths=this.folders.getAllPaths(),this.konnectorView.render()},n.prototype.onFolderRemoteDelete=function(e){return this.folders.remove(e),this.konnectorView.paths=this.folders.getAllPaths(),this.konnectorView.render()},n}(i)}),require.register("views/konnector",function(e,n,r){var i,s,o=function(e,t){return function(){return e.apply(t,arguments)}},u=function(e,t){function r(){this.constructor=e}for(var n in t)a.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},a={}.hasOwnProperty;i=n("../lib/base_view"),r.exports=s=function(e){function r(){return this.afterRender=o(this.afterRender,this),r.__super__.constructor.apply(this,arguments)}return u(r,e),r.prototype.template=n("./templates/konnector"),r.prototype.className="konnector",r.prototype.events={"click #import-button":"onImportClicked"},r.prototype.initialize=function(e){return r.__super__.initialize.call(this,e),this.paths=e.paths||[],this.listenTo(this.model,"change",this.render)},r.prototype.afterRender=function(){var e,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E;y=this.model.get("slug"),l=this.model.get("lastImport"),o=this.model.get("isImporting"),f=this.model.get("lastAutoImport"),this.error=this.$(".error"),(this.model.get("errorMessage")==null||o)&&this.error.hide(),this.$el.addClass("konnector-"+y),o?(this.$(".last-import").html(t("importing...")),this.disableImportButton()):l!=null?(n=moment(l).format(t("date format")),this.$(".last-import").html(n),this.enableImportButton()):(this.$(".last-import").html(t("no import performed")),this.enableImportButton()),E=this.model.get("fieldValues"),E==null&&(E={}),d=this.model.get("fields");for(h in d){b=d[h],E[h]==null&&(E[h]=""),e='<div class="field line">\n<div><label for="'+y+"-"+h+'-input">'+t(h)+"</label></div>";if(b==="folder"){e+='<div><select id="'+y+"-"+h+'-input" class="folder"">',g={path:"",id:""},v=this.paths;for(r=0,c=v.length;r<c;r++)p=v[r],p.path===E[h]?(e+='<option selected value="'+p.id+'">'+p.path+"</option>",g=p):e+='<option value="'+p.id+'">'+p.path+"</option>";e+="</select></div>",e+='<a href="#apps/files/folders/'+g.id+'"\n   class="folder-link"\n   target="_blank">\n    open selected folder\n</a>',e+="</div>"}else e+='<div><input id="'+y+"-"+h+'-input" type="'+b+'"\n            value="'+E[h]+'"/></div>\n</div>';this.$(".fields").append(e),b==="folder"&&this.$("#"+y+"-"+h+"-input").change(function(e){return function(){var t,n,r,i;return r=e.$("#"+y+"-"+h+"-input").val(),n=e.$("#"+y+"-"+h+"-input"),t=n.parent().parent().find(".folder-link"),i="#apps/files/folders/"+r,t.attr("href",i)}}(this))}i=this.model.get("importInterval"),i==null&&(i=""),s={none:t("none"),hour:t("every hour"),day:t("every day"),week:t("every week"),month:t("each month")},e='<div class="field line">\n<div><label for="'+y+'-autoimport-input">'+t("auto import")+'</label></div>\n<div><select id="'+y+'-autoimport-input" class="autoimport">';for(a in s)w=s[a],m=i===a?"selected":"",e+='<option value="'+a+'" '+m+">"+w+"</option>";return e+='\n</select>\n<span id="'+y+'-first-import">\n<span id="'+y+'-first-import-text">\n<a id="'+y+'-first-import-link" href="#">Select a starting date</a></span>\n<span id="'+y+'-first-import-date"><span>From</span>\n<input id="'+y+'-import-date" class="autoimport" maxlength="8" type="text">\n</input>\n</span></span>\n</div>\n</div>',this.$(".fields").append(e),this.$("#"+y+"-first-import-date").hide(),this.$("#"+y+"-import-date").datepicker({minDate:1,dateFormat:"dd-mm-yy"}),this.$("#"+y+"-autoimport-input").val()!=="none"&&this.$("#"+y+"-autoimport-input").val()!=="hour"?(u=moment(f).valueOf()>moment().valueOf(),f!=null&&u?(b=moment(f).format("DD-MM-YYYY"),this.$("#"+y+"-first-import-date").show(),this.$("#"+y+"-first-import-text").hide(),this.$("#"+y+"-import-date").val(b)):this.$("#"+y+"-first-import").show()):this.$("#"+y+"-first-import").hide(),this.$("#"+y+"-first-import-link").click(function(e){return function(t){return t.preventDefault(),e.$("#"+y+"-first-import-date").show(),e.$("#"+y+"-first-import-text").hide()}}(this)),this.$("#"+y+"-autoimport-input").change(function(e){return function(){return e.$("#"+y+"-autoimport-input").val()!=="none"&&e.$("#"+y+"-autoimport-input").val()!=="hour"?e.$("#"+y+"-first-import").show():e.$("#"+y+"-first-import").hide()}}(this))},r.prototype.disableImportButton=function(){return this.$("#import-button").attr("aria-busy",!0),this.$("#import-button").attr("aria-disabled",!0)},r.prototype.enableImportButton=function(){return this.$("#import-button").attr("aria-busy",!1),this.$("#import-button").attr("aria-disabled",!1)},r.prototype.onImportClicked=function(){var e,n,r,i,s,o,u,a,f,l,c,h,p,d;if(!this.model.get("isImporting")){this.$(".error").hide(),n={},h=this.model.get("slug"),s=$("#"+h+"-import-date").val(),n.date=s,l=this.model.get("fields");for(a in l){p=l[a];if(p==="folder"){i=$("#"+h+"-"+a+"-input").val(),d="",c=this.paths;for(r=0,u=c.length;r<u;r++)f=c[r],f.id===i&&(d=f.path);n[a]=d}else n[a]=$("#"+h+"-"+a+"-input").val()}return o=$("#"+h+"-autoimport-input").val(),this.disableImportButton(),e={fieldValues:n,importInterval:o},this.model.save(e,{success:function(e,t){},error:function(e){return function(n,r){if(r.status>=400&&r.status!==504)return e.$(".error .message").html(t(r.responseText)),e.$(".error").show()}}(this)})}},r}(i)}),require.register("views/menu",function(e,t,n){var r,i,s,o=function(e,t){function r(){this.constructor=e}for(var n in t)u.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u={}.hasOwnProperty;s=t("../lib/view_collection"),i=t("./menu_item"),n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.collectionEl="#konnectors",t.prototype.itemview=i,t.prototype.initialize=function(e){return t.__super__.initialize.call(this,e),this.listenTo(this.collection,"change",this.collection.sort.bind(this.collection)),this.listenTo(this.collection,"change",this.render)},t.prototype.afterRender=function(){return t.__super__.afterRender.call(this),this.selectItem(this.selectedCid)},t.prototype.selectItem=function(e){var t;this.selectedCid=e,t=this.views[e];if(t!=null)return t.select()},t.prototype.unselectAll=function(){var e,t,n,r;t=this.views,n=[];for(e in t)r=t[e],n.push(r.unselect());return n},t}(s)}),require.register("views/menu_item",function(e,n,r){var i,s,o=function(e,t){function r(){this.constructor=e}for(var n in t)u.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u={}.hasOwnProperty;i=n("../lib/base_view"),r.exports=s=function(e){function r(){return r.__super__.constructor.apply(this,arguments)}return o(r,e),r.prototype.tagName="li",r.prototype.template=n("./templates/menu_item"),r.prototype.initialize=function(e){return r.__super__.initialize.call(this,e),this.listenTo(this.model,"change",this.render)},r.prototype.getRenderData=function(){var e,n;return n=this.model.get("lastImport"),this.model.isConfigured()&&n!=null?(e=moment(n).format(t("date format")),n=t("last import:")+"  "+e):this.model.isConfigured()?n=t("no import performed"):n="",_.extend({},r.__super__.getRenderData.call(this),{lastImport:n})},r.prototype.afterRender=function(){return this.model.isConfigured()&&this.$el.addClass("configured"),this.$el.addClass(this.model.get("slug"))},r.prototype.select=function(){return this.$el.addClass("selected")},r.prototype.unselect=function(){return this.$el.removeClass("selected")},r}(i)}),require.register("views/templates/default",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push('<div id="menu-toggler"><div class="fa fa-bars"></div></div><div id="default" class="default"><header></header><p>');var __val__=t("home headline");buf.push(escape(null==__val__?"":__val__)),buf.push("</p><ul><li>");var __val__=t("home config step 1");buf.push(escape(null==__val__?"":__val__)),buf.push("</li><li>");var __val__=t("home config step 2");buf.push(escape(null==__val__?"":__val__)),buf.push("</li><li>");var __val__=t("home config step 3");buf.push(escape(null==__val__?"":__val__)),buf.push("</li></ul>"+escape((interp=t("home more info"))==null?"":interp)+"<ul><li>");var __val__=t("home help step 1");buf.push(escape(null==__val__?"":__val__)),buf.push("</li><li>");var __val__=t("home help step 2");buf.push(escape(null==__val__?"":__val__)),buf.push("</li></ul></div>")}return buf.join("")}}),require.register("views/templates/home",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push('<div id="menu" class="menu"><ul id="konnectors"></ul></div><div class="container"></div>')}return buf.join("")}}),require.register("views/templates/konnector",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push('<!-- .konnector --><h2 class="name"><div id="menu-toggler"><div class="fa fa-bars"></div></div><span class="service-icon"></span><span>'+escape((interp=model.name)==null?"":interp)+'</span></h2><div class="description">');var __val__=t(model.description);buf.push(null==__val__?"":__val__),buf.push('</div><div class="fields"></div><div class="buttons"><button id="import-button">'+escape((interp=t("save and import"))==null?"":interp)+"</button></div>");if(model.errorMessage){buf.push('<div class="error"><span class="error">');var __val__=t("error occurred during import:")+" ";buf.push(escape(null==__val__?"":__val__)),buf.push('<span class="message">');var __val__=t(model.errorMessage);buf.push(escape(null==__val__?"":__val__)),buf.push("</span></span></div>")}buf.push('<div class="status">'+escape((interp=status)==null?"":interp)+'</div><div class="infos"><div class="date"><span class="label">'+escape((interp=t("last import:"))==null?"":interp)+'&nbsp;</span><span class="last-import"></span></div><div class="datas">'+escape((interp=t("imported data:"))==null?"":interp)+"&nbsp;"),function(){if("number"==typeof model.modelNames.length)for(var e=0,t=model.modelNames.length;e<t;e++){var n=model.modelNames[e];buf.push("<a"),buf.push(attrs({href:"/apps/databrowser/#search/all/"+n+"",target:"_blank"},{href:!0,target:!0})),buf.push(">"+escape((interp=n)==null?"":interp)+"&nbsp;</a>")}else{var t=0;for(var e in model.modelNames){t++;var n=model.modelNames[e];buf.push("<a"),buf.push(attrs({href:"/apps/databrowser/#search/all/"+n+"",target:"_blank"},{href:!0,target:!0})),buf.push(">"+escape((interp=n)==null?"":interp)+"&nbsp;</a>")}}}.call(this),buf.push("</div></div>")}return buf.join("")}}),require.register("views/templates/menu_item",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push("<a"),buf.push(attrs({href:"#konnector/"+model.slug+""},{href:!0})),buf.push('><span class="service-icon"></span><div><span class="name">');var __val__=model.name;buf.push(escape(null==__val__?"":__val__)),buf.push("</span>");if(lastImport!=null&&lastImport.length>0){buf.push('<span class="last-import">');var __val__=lastImport;buf.push(escape(null==__val__?"":__val__)),buf.push("</span>")}model.isImporting===!0?buf.push('<div class="spinholder"><img src="images/spinner.svg"/></div>'):model.errorMessage!=null&&(buf.push("<i"),buf.push(attrs({title:t("error occurred during import."),"class":"fa fa-warning"},{title:!0})),buf.push("></i>")),buf.push("</div></a>")}return buf.join("")}})