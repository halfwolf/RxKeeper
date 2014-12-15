RxKeeper.Routers.Router = Backbone.Router.extend({
  
  initialize: function() {
    this.$rootEl = $('#content');
    this.prescriptions = new RxKeeper.Collections.Prescriptions();
    this.session = new RxKeeper.Models.Session;
    this.session.fetch();
  },

  routes: {
    '': "home",
    'prescriptions/new': 'prescriptionNew',
    'prescriptions': 'prescriptionsIndex',
    'login': 'login',
    'signup': 'signup',
    'signout': 'signOut'
  },
  
  home: function() {
    
  },
  
  prescriptionsIndex: function() {
    this.prescriptions.fetch();
    var view = new RxKeeper.Views.PrescriptionsIndex({
      collection: this.prescriptions
    })
    var self = this;
    this.session.fetch({
      success: function(model, response) {
        self.checkAuth(view, response)}
    });
  },
  
  prescriptionNew: function() {
    this.prescriptions.fetch();
    var view = new RxKeeper.Views.PrescriptionNew;
    var self = this;
    this.session.fetch({
      success: function(model, response) {
        self.checkAuth(view, response)}
    });
  },
  
  checkAuth: function(view, response) {
    if (response[0].authorized) {
      this.updateNav(response)
      this._swapView(view)
    } else {  
      this.updateNav(response)
      this.navigate('/login', true)
    }
  },
  
  updateNav: function(response) {
    var navTemplate = JST['nav'];
    var nav = navTemplate({
      username: response[0].username
    })
    $('.nav-content').html(nav)
  },
  
  login: function() {
    var view = new RxKeeper.Views.Login;
    this._swapView(view);
  },
  
  signup: function() {
    var view = new RxKeeper.Views.SignUp;
    this._swapView(view);
  },
  
  signOut: function() {
    $.ajax({
        url: '/api/session/',
        type: 'DELETE'
    });
    var self = this;
    this.session.fetch({
      success: function(model, response) { self.checkAuth(null, response)}
    });
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})
