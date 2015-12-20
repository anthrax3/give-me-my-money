App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({});

App.IndexController = Ember.Controller.extend({

  grandTotal: Ember.computed('internetTotal', 'electTotal', 'rentTotal', function(){
    var total = 0;
    var rent = this.format(this.get('rentTotal'));
    var internet = this.format(this.get('internetTotal'));
    var elect = this.format(this.get('electTotal'));
    total += rent;
    total += internet;
    total += elect;
    return total;
  }),

  rentThirdHalved: Ember.computed('rentTotal', function(){
    return this.third(this.get('rentTotal')) / 2;
  }),

  toAustinTotal: Em.computed('internetTotal', 'rentThirdHalved', function(){
    return this.third(this.get('internetTotal')) + this.get('rentThirdHalved');
  }),

  toMattTotal: Em.computed('electTotal', 'rentThirdHalved', function(){
    return this.third(this.get('electTotal')) + this.get('rentThirdHalved');
  }),

  third: function(amount){
    var rtn = this.format(amount);
    return rtn / 3;
  },

  format: function(number){
    var rtn = number ? number : 0;
    return Number(rtn);
  }

});

Ember.Handlebars.helper('round', function(value, options) {
  var rtn = value ? value : 0;
  rtn = Math.round(Number(rtn) * 100) / 100;
  var escaped = Ember.Handlebars.Utils.escapeExpression(rtn);
  return new Ember.Handlebars.SafeString(escaped);
});

Ember.Handlebars.helper('divide', function(value, key1, key2) {
  var rtn = value ? value : 0;
  rtn = key1 ? rtn / key1 : rtn;
  rtn = typeof key2 === 'object' ? rtn : rtn / key2;
  rtn = Math.round(Number(rtn) * 100) / 100;
  var escaped = Ember.Handlebars.Utils.escapeExpression(rtn);
  return new Ember.Handlebars.SafeString(escaped);
});

