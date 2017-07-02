/*
intentEngine.js
David Fink
@darkroastcreate
david@darkroastcreative.co
http://darkroastcreative.co
*/

// Establish a set of variables for use with the engine
var pages = [];
var gotPages = false;
var hasPages = false;

function getIntent() {

  // Get query arguments from URI
  var $_GET = {},
    args = location.search.substr(1).split(/&/);
  for (var i = 0; i < args.length; ++i) {
    var tmp = args[i].split(/=/);
    if (tmp[0] != "") {
      $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
    }
  }

  // Assign intent property (if it exists) to the intent variable
  var intent = $_GET.intent;

  // Return the detected intent (or lack thereof)
  return intent;

}

function getPages() {

  // Clear page name array
  this.pages = [];

  // Detect pages and add their names to the array
  $.each($('.page'), function(i) {
    pages.push($(this).attr('id'));
  });

  // Set gotPages to true
  this.gotPages = true;

  // If the array was populated with any pages, set hasPages to true
  if(pages.length > 0)  {
    this.hasPages = true;
  }

  // Return the array of page names
  return this.pages;

}

function hasPage(pageName) {

  // If the page list has already been retrieved, continue with checking for
  // the specified page, otherwise get the page list and try again
  if(this.gotPages)  {
    if(this.hasPages && this.pages.indexOf(pageName) > -1)  {
      return true;
    }
  }
  return false;

}
