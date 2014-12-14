RxKeeper.Views.PrescriptionShow = Backbone.View.extend({

  template: JST['prescriptions/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },
  
  render: function() {
    var content = this.template({
      prescription: this.model
    });
    this.$el.html(content);
    
    return this;
  }

});
