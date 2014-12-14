/*jslint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true
*/
/*global $, app */
var app = app || {};

app.util = (function(){
  var chgNewLine, getFormAttributes;

  chgNewLine = function(str){
    var _str = str;

    if(str === undefined){
      return str;
    }
    _str = _str.replace(/\r\n/g, "<br>");
    _str = _str.replace(/\n|\r/g, "<br>");

    return _str;
  };

  getFormAttributes = function(value){
    var values, i, params, return_data = {};
    values = $('#'+value);
    params = values.serializeArray();
    for(i = 0; i < params.length; i++){
      return_data[params[i].name] = params[i].value;
    }
    return return_data;
  };

  return {
    chgNewLine        : chgNewLine,
    getFormAttributes  : getFormAttributes
  };
}());
