/*
intentEngine.js
v1.4.1
David Fink
@darkroastcreate
david@darkroastcreative.co
http://darkroastcreative.co
*/

class IntentEngine {

  // Constructs the IntentEngine object
  constructor() {
    // Declare and initialize a set of variables for use with the engine
    let intent = this.getIntent(); // Represents the current intent
    let nullIntent = true; // Represents whether or not the current intent is set to null
    let data = {}; // Temporarily stores data associated with an intent (for use in passing data between actions)
    let previousIntent = ''; // Represents the previous intent (immediately before the current intent)
    let pages = this.getPages(); // Represents an array of pages
    let gotPages = false; // Represents whether or not the pages array has been retrieved
    let hasPages = false; // Represents whether or not the pages array contains pages
    const TRANSITION_TIME = 350; // Represents a constant transition time (in milliseconds)
    const localStorage = window.localStorage; // A reference to local storage
  }

  // Sets the current intent to the intent string passed in
  setIntent(intent) {
    this.previousIntent = this.intent; // Set the previous intent to be the current intent
    this.intent = intent; // Set the current intent to the intent string passed in
    // If the intent is not null, set nullIntent to false and return the intent
    if (this.intent != null) {
      this.nullIntent = false;
      return this.intent;
    }
    // If the intent is null, set nullIntent to true
    this.nullIntent = true;
  }

  // Retrieves and returns the current intent
  getIntent() {
    // Get query arguments from URI
    let $_GET = {},
      args = location.search.substr(1).split(/&/);
    for (let i = 0; i < args.length; ++i) {
      let tmp = args[i].split(/=/);
      if (tmp[0] !== '') {
        $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join('').replace('+', ' '));
      }
    }

    this.setIntent($_GET.intent); // Assign intent property to the intent variable and set nullIntent variable accordingly
    return this.intent; // Return the current intent
  }

  // Set the data variable, replacing any existing data
  setData(data) {
    this.data = data;
  }

  // Get all data stored within Intent Engine, or a subset of the data by key
  getData(key) {
    // If a key is not passed into the function call, return the entire data object
    if (key == null) {
      return this.data;
    }
    // If a key is passed into the function call, return the data associated with the given key
    else {
      return this.data[key];
    }
  }

  // Add data to the data object using a key-value pair
  addData(key, value) {
    this.data[key] = value;
  }

  // Remove data by key (deleting only the data associated with the given key)
  removeData(key) {
    if (key != null) {
      this.data[key] = null;
    }
  }

  // Save data stored in the data object in local storage
  saveData()  {
    this.localStorage.setItem("IntentEngineData", this.data);
  }

  // Load data stored in local storage to Intent Engine's data object
  loadData()  {
    this.data = this.localStorage.getItem("IntentEngineData");
  }

  // Retrieve and return the previous intent
  getPreviousIntent() {
    return this.previousIntent;
  }

  // Populate the pages array with pages detected by Intent Engine
  getPages() {
    let pages = []; // Declare and initialize a temporary pages array as an empty array

    // Detect pages and add their names to the pages array
    $.each($('.page'), function (i) {
      pages.push($(this).attr('id'));
    });

    this.gotPages = true; // Set gotPages to true

    // If the array was populated with any pages, set hasPages to true
    if (pages.length > 0) {
      this.hasPages = true;
    }

    this.pages = pages; // Set the engine's pages array to the temporary array used in this function
  }

  // Check whether a given page exists
  hasPage(pageName) {
    /**
     * If the page list has already been retrieved, continue with checking for
     * the specified page, otherwise get the page list and try again
     */
    if (this.gotPages) {
      if (this.hasPages && this.pages.indexOf(pageName) > -1) {
        return true; // If the page was found, return true
      }
      // TODO: Add 'else' case to handle if the page list has been retrieved and the specified page is not found
    }
    else {
      this.getPages(); // Call getPages() to retrieve a list of pages
      this.hasPage(pageName); // Recursively call hasPage() to check if the specified page exists
    }

    return false; // If the specified page is not found, return false
  }

  // Display a page assicuated with the current intent, optionally specifying a transition time (in milliseconds)
  showIntentContent(transitionTime) {
    // Check for the presence of parameters in the function call and act accordingly
    if (transitionTime == null) {
      transitionTime = this.TRANSITION_TIME;
    }

    // Hide all pages
    $.each($('.page'), function (i) {
      $(this).hide();
    });

    // Show the content associated with the current intent
    if (!this.nullIntent && this.hasPage(this.intent)) {
      $('#' + this.intent).show(transitionTime);
      return;
    }

    $('#default').show(transitionTime); // If the intent does not satisfy the above conditions, show the default page
  }

  // Set the current intent by calling setIntent and show the intent's associated content
  actOnIntent(intent, transitionTime) {
    this.setIntent(intent);
    this.showIntentContent(transitionTime);
  }

}