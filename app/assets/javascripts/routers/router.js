RxKeeper.Routers.Router = Backbone.Router.extend({
  
  initialize: function() {
    this.$rootEl = $('#content');
  },

  routes: {
    'prescriptions': 'prescriptionsIndex',
    'prescriptions/new': 'prescriptionNew',
    'prescriptions/:id': 'prescriptionShow'
  },
  
  prescriptionsIndex: function() {
    
    this.prescriptions = new RxKeeper.Collections.Prescriptions();
    this.prescriptions.fetch();
    
    var view = new RxKeeper.Views.PrescriptionsIndex({
      collection: this.prescriptions
    })
    
    this._swapView(view);
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})
