'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

require('moment');
require('moment/locale/ru');

require('./plugins');

var app = window.app = new Marionette.Application();

var NavbarView = require('./views/NavbarView');

require('./cdr');


var ModalRegion = Marionette.Region.extend({
  el: '#modal',

  onShow: function (view) {
    this.$el.find('.modal').modal();
  },

  hide: function () {
    this.$el.find('.modal').modal('hide');
  }
});

var RootView = Marionette.LayoutView.extend({
  el: 'body',

  regions: {
    navigation: '#navigation',
    main: '#main',
    modal: ModalRegion
  }
});

app.rootView = new RootView();

app.on('start', function (options) {
  app.navcol = new Backbone.Collection([{
    name: 'Звонки',
    icon: 'fa-bars',
    target: 'cdr',
    active: true
  }]);

  app.navbar = new NavbarView({
    collection: app.navcol
  });
  app.rootView.navigation.show(app.navbar);

  

  var routeFunctions = {
    cdr: 'showCDR'   
  };

  var controller = {
    changeTab: function (tab) {
      app.navbar.setActive(tab);
      app[routeFunctions[tab]]();
    }
  };

  app.router = new Marionette.AppRouter({
    controller: controller,
    appRoutes: {
      ':tab': 'changeTab'
    }
  });

  this.listenTo(app.navbar, 'navigate', function (target) {
    app.router.navigate(target);
    controller.changeTab(target);
  });

  if (Backbone.history) {
    Backbone.history.start();
  }

  if (Backbone.history.fragment === '') {
    app.router.navigate('cdr', { trigger: true });
  }
});


app.start();
