# Intent Engine
Intent Engine provides a framework for developers to easily determine and act on user intents within websites and apps.

[![codebeat badge](https://codebeat.co/badges/16a370d8-8478-4470-baef-0778416c99f5)](https://codebeat.co/projects/github-com-darkroastcreative-intent-engine-master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0ac118a4a49246b7bb28d0bf1cc3e335)](https://www.codacy.com/app/darkroastcreative/Intent-Engine?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=darkroastcreative/Intent-Engine&amp;utm_campaign=Badge_Grade)


[![Buy Me A Coffee](http://darkroastcreative.co/wp-content/uploads/2017/09/DRC_Buy-Me-A-Coffee_Button.png)](https://ko-fi.com/A1263BPJ)

Like Intent Engine? [Buy me a coffee (or two, I’ll drink them both).](https://ko-fi.com/A1263BPJ)

## Installation
To install the intent engine, simply include it in a directory where your website or application can access the file, and link the script in your site or application's files.

## Dependencies
* [jQuery](https://jquery.com/)

## Usage
### Setup
For the most basic setup, you can set the intent of a user by attaching the intent query component to links in your product. For example, for a link on a website that users to follow to request a quote for services, the link could set up as follows:

#### Example
`<a href="http://yoursite.com/contact?intent=quote">Request A Quote</a>`

To detect and act on intents, you will need an instance of Intent Engine. The recommended approach to this is creating a read-only instance using the `const` declaration, as demonstrated here:
`const intentEngine = new IntentEngine();`

This link will direct the user to the Contact page of this website, establishing that the user intends to request a quote, and allowing the site to respond to this specific intent.

### Detect Intent
To detect the user’s intent, call `getIntent()`. While the engine stores the intent value internally, it may be useful to store the return value as a variable.

### Act on the Intent
Using the detected intent, determine what action your product should take. One of the simplest ways to do this is to use String comparisons in `if` statements, such as shown in the example below.

#### Example
```
if(intent.equals('intent1')	{
	// Do something specific to intent 1
}
else if(intent.equals('intent2')	{
	// Do something specific to intent 2
}
else	{
	// Do nothing, or perform some default action
}
```

## Functions
### setIntent(intent)
`setIntent()` allows the user's intent to be set directly within Intent Engine by passing in a String as the `intent` parameter. The engine's internal `intent` variable will be set to this parameter, though Intent Engine will not act on this new intent.

### getIntent()
`getIntent()` attempts to retrieve the intent of a user by checking for the `intent` query component in a URI, and if there is a value set for this component. The engine's internal `intent` variable will be set to the value (which may be null), and the internal `nullIntent` variable will be set to reflect whether or not the intent is null. In addition, the function will return the detected intent.

### setData(data)
The `setData()` function allows data to be temporarily stored in Intent Engine. To use this function, data must be passed into the function through the `data` parameter as a JavaScript Object. By calling `setData()`, any existing data stored in Intent Engine will be overwritten.

#### Note
Currently, data stored in Intent Engine will be lost on refresh or if the user navigates to a new page. Please account for this when storing data within Intent Engine.

### getData(key)
`getData()` serves a dual purpose, as it can return both the entire set of data stored within the engine, or only return the data associated with a given key. To retreive all data stored in Intent Engine, do not pass in a key through the `key` parameter. To retrieve only data associated with a given key, pass the name of the key in through the `key` parameter as a String.

### addData(key, value)
To add data to be stored in Intent Engine, use the `addData()` function. This function requires two parameters, `key` and `value`. The `key` parameter must be passed in as a String, and represents the key name for the data. The `value` parameter can be any valid JavaScript data type, and represents the data to be added into Intent Engine.

### removeData(key)
To remove data from the data storage within Intent Engine, use the `removeData()` function. This function requires a key to be passed in through the `key` parameter as a String. This function will set the data associated with a key to be null, and thus no data that has been removed will be recoverable.

### getPages()
For projects utilizing the Intent Engine page structure, the `getPages()` function checks for pages present in a given file, and sets the engine's internal `pages` variable to an array of found pages. If no pages are found, this variable will store an empty array.

### hasPage(pageName)
For projects utilizing the Intent Engine page structure, `hasPage()` accepts a page name as a String, and returns a boolean value indicating whether or not the page exists.

### showIntentContent(transitionTime)
For projects utilizing the Intent Engine page structure, `showIntentContent()` shows the page associated with the intent, and hides any other page that was visible to the user. The function accepts a String representing the current intent and a transition time for displaying the desired page (in milliseconds).

### actOnIntent(intent, transitionTime)
The `actOnIntent()` function combines the actions of the `setIntent()` and `showIntentContent()` functions. This function accepts two String parameters, `intent` and `transitionTime`, which represent the intent which should be set and the transition time (in milliseconds) for acting on this new intent. While the `intent` parameter is required, it is not necessary to pass in a transition time, though a default value will be used if no transition time is specified.