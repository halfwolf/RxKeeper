RxKeeper.Views.PrescriptionNew = Backbone.View.extend({

  template: JST['prescriptions/new'],
  
  tagName: "section",

  className: "prescription-form",
  
  events: {
    'click #contacts': 'contactRender',
    'click #glasses': 'glassesRender',
    'submit': 'create'
  },
  
  render: function(contacts) {
    var cx = contacts || false;
    var content = this.template({
      contacts: cx
    });
    this.$el.html(content);
    
    return this;
  },
  
  create: function(event) {
    event.preventDefault();
    this.$('button').prop("disabled",true)
    $('div.rx-errors').empty();
    
    var newPrescription = new RxKeeper.Models.Prescription({ 
      
      name: this.$('#name').val(),
      contacts: this.$('input[type="radio"]:checked').val(),
      right_sph: this.$('#right_sphere').val(),
      right_cyl: this.$('#right_cylinder').val(),
      right_axis: this.$('#right_axis').val(),
      right_bc: this.$('#right_bc').val(),
      right_diam: this.$('#right_diam').val(),
      left_sph: this.$('#left_sphere').val(),
      left_cyl: this.$('#left_cylinder').val(),
      left_axis: this.$('#left_axis').val(),
      left_bc: this.$('#left_bc').val(),
      left_diam: this.$('#left_diam').val()
    })
    var self = this;
    newPrescription.save([], {
      success: function() { Backbone.history.navigate('#/prescriptions', true);},
      error: function(o, r, options) { 
        self.addErrors(r.responseJSON); 
        self.$('button').prop("disabled",false)
      }
    })

  },
  
  addErrors: function(response) {
    response.forEach(function(error) {
      $('div.rx-errors').append("<li>" + error + "</li>")
    })
  },
  
  contactRender: function() { 
    var form = JST['prescriptions/contacts_form'];
    var right = form({ side: "right"});
    var left = form({side: "left"})
    $('div.contact-form-right').html(right)
    $('div.contact-form-left').html(left)
   },
  
  glassesRender: function() { 
    $('div.contact-form-right').empty();
    $('div.contact-form-left').empty();
  }

});
