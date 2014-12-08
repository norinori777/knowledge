/*jslint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true
*/
/*global $, app */
var app = app || {};

app.util = (function () {
  var chgNewLine;
  //
  chgNewLine = function ( str ) {
    var _str = str;

    // _str = _str.replace(/\r\n/g, "&lt;br /&gt;<br>");
    // _str = _str.replace(/\n|\r/g, "&lt;br /&gt;<br>");
    _str = _str.replace(/\r\n/g, "<br>");
    _str = _str.replace(/\n|\r/g, "<br>");

    return _str;
  };

  return {
    chgNewLine    : chgNewLine
  };
}());
