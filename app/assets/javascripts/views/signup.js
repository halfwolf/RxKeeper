RxKeeper.Views.SignUp = Backbone.View.extend({
  
  template: JST['signup'],
  
  events: { 'submit': 'createUser' },
  
  tagName: "section",

  className: "user-sign-in",
  
  initialize: function() {
    this.form = $('form');
    this.username = $('#user_username').val;
    this.password = $('#user_password').val;
  },
  
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  
  createUser: function(event) {
    event.preventDefault();
    $('div.log-errors').empty();
    this.submitButton = $('button');
    this.submitButton.prop("disabled", true);    
    var user = new RxKeeper.Models.User({
      user: {
        username: $('#user_username').val(), 
        password: $('#user_password').val()
      }
    });
    
    var self = this;
    user.save(null, {
      error: function(o, r, options) { 
        self.addErrors(r.responseJSON); 
        self.submitButton.prop("disabled",false)
      },
      success: function() {
        self.submitButton.prop("disabled", true);
        Backbone.history.navigate('prescriptions', true);
      }
    });
    
   
      
  },
  
  addErrors: function(response) {
    response.forEach(function(error) {
      $('div.log-errors').append("<li>" + error + "</li>")
    })
  }
  
  
});
