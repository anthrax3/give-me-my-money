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

  totalThird: Ember.computed('grandTotal', function(){
    return this.format(this.third(this.get('grandTotal')));
  }),

  mattTotal: Ember.computed.alias('totalThird'),
  cortnieTotal: Ember.computed.alias('totalThird'),
  austinTotal: Ember.computed.alias('totalThird'),

  rentHalved: Ember.computed('rentTotal', function(){
    return this.format(this.get('rentTotal') / 2);
  }),

  internetThird: Ember.computed('internetTotal', function(){
    return this.format(this.third(this.get('internetTotal')));
  }),

  electThird: Ember.computed('electTotal', function(){
    return this.format(this.third(this.get('electTotal')));
  }),

  rentThird: Ember.computed('rentTotal', function(){
    return this.format(this.third(this.get('rentTotal')));
  }),

  rentThirdHalved: Ember.computed('rentThird', function(){
    return this.format(this.get('rentThird') / 2);
  }),

  toAustinTotal: Em.computed('internetThird', 'rentThirdHalved', function(){
    return this.format(this.get('internetThird') + this.get('rentThirdHalved'));
  }),

  toMattTotal: Em.computed('electThird', 'rentThirdHalved', function(){
    return this.format(this.get('electThird') + this.get('rentThirdHalved'));
  }),

  third: function(amount){
    var rtn = this.format(amount);
    return rtn / 3;
  },

  format: function(number){
    var rtn = number ? number : 0;
    return Math.round(Number(rtn) * 100) / 100;
  }

});

