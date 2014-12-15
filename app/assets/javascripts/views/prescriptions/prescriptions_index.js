RxKeeper.Views.PrescriptionsIndex = Backbone.View.extend({

  template: JST['prescriptions/index'],
  
  tagName: "section",

  className: "prescription-index",
  
  events: {
    "click button": "deleteRx"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "sync remove", this.render)
  },
  
  render: function() {
    var content = this.template({
      prescriptions: this.collection
    });
    this.$el.html(content);
    
    return this;
  },
  
  deleteRx: function(event) {
    event.preventDefault();
    var deleted = this.collection.remove(event.currentTarget.id)
    deleted.destroy()
  }

});
