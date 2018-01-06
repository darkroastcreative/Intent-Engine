/*
intentEngine.js
v1.3.1
David Fink
@darkroastcreate
david@darkroastcreative.co
http://darkroastcreative.co
*/

class IntentEngine {

  constructor() {
    // Establish a set of variables for use with the engine
    var intent = this.getIntent();
    var nullIntent = true;
    var data = {};
    var pages = this.getPages();
    var gotPages = false;
    var hasPages = false;
    const TRANSITION_TIME = 350;
  }

  setIntent(intent) {
    this.intent = intent;
    if (this.intent != null) {
      this.nullIntent = false;
      return this.intent;
    }
    this.nullIntent = true;
  }

  getIntent() {

    // Get query arguments from URI
    var $_GET = {},
      args = location.search.substr(1).split(/&/);
    for (var i = 0; i < args.length; ++i) {
      var tmp = args[i].split(/=/);
      if (tmp[0] !== "") {
        $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
      }
    }

    // Assign intent property to the intent variable and set nullIntent variable accordingly
    this.setIntent($_GET.intent);
    return this.intent;
  }

  setData(data) {
    this.data = data;
  }

  getData(key) {
    if (key == null) {
      return this.data;
    }
    else {
      return this.data[key];
    }
  }

  addData(key, value) {
    this.data[key] = value;
  }

  removeData(key) {
    if (key != null) {
      this.data[key] = null;
    }
  }

  getPages() {

    // Clear page name array
    var pages = [];

    // Detect pages and add their names to the array
    $.each($(".page"), function (i) {
      pages.push($(this).attr("id"));
    });

    // Set gotPages to true
    this.gotPages = true;

    // If the array was populated with any pages, set hasPages to true
    if (pages.length > 0) {
      this.hasPages = true;
    }

    this.pages = pages;

  }

  hasPage(pageName) {

    // If the page list has already been retrieved, continue with checking for
    // the specified page, otherwise get the page list and try again
    if (this.gotPages) {
      if (this.hasPages && this.pages.indexOf(pageName) > -1) {
        return true;
      }
    }
    else {
      this.getPages();
      this.hasPage(pageName);
    }
    return false;

  }

  showIntentContent(transitionTime) {
    // check for the presence of parameters in the function call and act accordingly
    if (transitionTime == null) {
      transitionTime = this.TRANSITION_TIME;
    }

    // Hide all pages
    $.each($(".page"), function (i) {
      $(this).hide();
    });

    // Show the content associated with the current intent
    if (!this.nullIntent && this.hasPage(this.intent)) {
      $("#" + this.intent).show(transitionTime);
      return;
    }
    $("#default").show(transitionTime);

  }

  actOnIntent(intent, transitionTime) {
    this.setIntent(intent);
    this.showIntentContent(transitionTime);
  }

}
