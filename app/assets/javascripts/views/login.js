RxKeeper.Views.Login = Backbone.View.extend({
  
  template: JST['login'],
  
  events: { 'submit': 'createSession' },
  
  tagName: "section",

  className: "user-sign-in",
  
  initialize: function() {
    this.form = $('form');
  },
  
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  
  createSession: function(event) {
    event.preventDefault();
    $('div.log-errors').empty();
    this.submitButton = $('button');
    this.submitButton.prop("disabled", true);    
    var session = new RxKeeper.Models.Session({
      user: {
        username: $('#user_username').val(), 
        password: $('#user_password').val()
      }
    });
    
    var self = this;
    session.save(null, {
      error: function(o, r, options) { 
        self.addErrors(r.responseJSON); 
        self.submitButton.prop("disabled",false)
      },
      success: function() {
        self.submitButton.prop("disabled", true);
        Backbone.history.navigate('#/prescriptions', true);
      }
    });
 
  },
  
  addErrors: function(response) {
    response.forEach(function(error) {
      $('div.log-errors').append("<li>" + error + "</li>")
    })
  }
  
});
