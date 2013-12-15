findHandlersJS
==============

Stop wasting your time looking for where those handlers are registered, use findHandlersJS and discover them instantly.
Usage: findEventHandlers(eventType, jQuerySelector)
Imagine you want to find all the "click" event handlers for all the buttons that are immediate children of the div with id="myDiv":
findEventHandlers("click", "div#myDiv > :button")

It will return an array with the element names, the jQuery $._data event information and the list of elements that that event handler covers (targets).
For example, if div#myDiv has a delegate handler with the selector :button and there is a button with id="save" inside the div, you would get this result:
[{
	element: div#myDiv,
	events: [{
		type: "click",
		handler: function() {...},
		namespace: "",
		selector: ":button",
		...
		targets: [button#save]			
	}]
}] 

If you are using the console on Chrome, you can right click the handler, click show function definition and add your breakpoints to debug the handlers.
