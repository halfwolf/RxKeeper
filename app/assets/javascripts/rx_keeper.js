window.RxKeeper = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new RxKeeper.Routers.Router
    Backbone.history.start();
  }
};

$(document).ready(function(){
  RxKeeper.initialize();
});
