# Intent Engine
intentEngine.js determines a user’s intent when browsing pages of a website or Web app, and allows the product to respond accordingly.

## Installation
To install the intent engine, simply include it in a directory where your website or application can access the file.

## Usage
### Setup
For the most basic setup, you can set the intent of a user by attaching the intent query component to links in your product. For example, for a link on a website that users to follow to request a quote for services, the link could set up as follows:

#### Example
`<a href="http://yoursite.com/contact?intent=quote">Request A Quote</a>`

This link will direct the user to the Contact page of this website, establishing that the user intends to request a quote, and allowing the site to respond to this specific intent.

### Detect Intent
To detect the user’s intent, call `getIntent()`. It may be useful to store the return value as a variable.

#### Example
```
var intent = getIntent();
```

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
	// Do nothing, or perform some defult action
}
```

## Functions
### getIntent()
`getIntent()` attempts to retrieve the intent of a user by checking for the `intent` query component in a URI, and if there is a value set for this component. If an intent is found, it will be returned as a String, otherwise the function will return `null`.

### getPages()
For projects utilizing the Intent Engine page structure, the `getPages()` function checks for pages present in a given file, and returns a String array of the page names. If no pages are found, the function will return an empty array.

### hasPage(pageName)
For projects utilizing the Intent Engine page structure, `hasPage()` accepts a page name as a String, and returns a boolean value indicating whether or not the page exists.
