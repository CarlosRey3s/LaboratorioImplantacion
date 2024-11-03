const helpers = require('handlebars'); 
 
// Este helper nos permite comparar 2 valores en la plantilla handlebars 
helpers.registerHelper('eq', function (a, b, options) { 
  return a === b ? options.fn(this) : options.inverse(this); // Utlizamos un if 
ternario 
}); 
 
module.exports = helpers; 