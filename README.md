# Intent Engine
The Intent Engine provides a framework for developers to easily determine and act on user intents within websites and apps.

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
### getIntent()
`getIntent()` attempts to retrieve the intent of a user by checking for the `intent` query component in a URI, and if there is a value set for this component. The engine's internal `intent` variable will be set to the value (which may be null), and the internal `nullIntent` variable will be set to reflect whether or not the intent is null. In addition, the function will return the detected intent.

### getPages()
For projects utilizing the Intent Engine page structure, the `getPages()` function checks for pages present in a given file, and sets the engine's internal `pages` variable to an array of found pages. If no pages are found, this variable will store an empty array.

### hasPage(pageName)
For projects utilizing the Intent Engine page structure, `hasPage()` accepts a page name as a String, and returns a boolean value indicating whether or not the page exists.

## showIntentContent(intent, transitionTime)
For projects utilizing the Intent Engine page structure, `showIntentContent()` shows the page associated with the intent, and hides any other page that was visible to the user. The function accepts a String representing the current intent and a transition time for displaying the desired page (in milliseconds).
