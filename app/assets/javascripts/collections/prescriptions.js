RxKeeper.Collections.Prescriptions = Backbone.Collection.extend({
  model: RxKeeper.Models.Prescription,
  
  url: 'api/prescriptions'

});
