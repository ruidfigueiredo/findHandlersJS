var findEventHandlers = function (eventType, jqSelector) {
    var results = [];
    var $ = jQuery;// to avoid conflict between others frameworks like Mootools

    var arrayIntersection = function (array1, array2) {
        return $(array1).filter(function (index, element) {
            return $.inArray(element, $(array2)) !== -1;
        });
    };

    var haveCommonElements = function (array1, array2) {
        return arrayIntersection(array1, array2).length !== 0;
    };


    var addEventHandlerInfo = function (element, event, $elementsCovered) {
        var extendedEvent = event;
        if ($elementsCovered !== void 0 && $elementsCovered !== null) {
            $.extend(extendedEvent, { targets: $elementsCovered.toArray() });
        }
        var eventInfo;
        var eventsInfo = $.grep(results, function (evInfo, index) {
            return element === evInfo.element;
        });

        if (eventsInfo.length === 0) {
            eventInfo = {
                element: element,
                events: [extendedEvent]
            };
            results.push(eventInfo);
        } else {
            eventInfo = eventsInfo[0];
            eventInfo.events.push(extendedEvent);
        }
    };


    var $elementsToWatch = $(jqSelector);
    if (jqSelector === "*")//* does not include document and we might be interested in handlers registered there
        $elementsToWatch = $elementsToWatch.add(document); 
    var $allElements = $("*").add(document);

    $.each($allElements, function (elementIndex, element) {
        var allElementEvents = $._data(element, "events");
        if (allElementEvents !== void 0 && allElementEvents[eventType] !== void 0) {
            var eventContainer = allElementEvents[eventType];
            $.each(eventContainer, function(eventIndex, event){
                var isDelegateEvent = event.selector !== void 0 && event.selector !== null;
                var $elementsCovered;
                if (isDelegateEvent) {
                    $elementsCovered = $(event.selector, element); //only look at children of the element, since those are the only ones the handler covers
                } else {
                    $elementsCovered = $(element); //just itself
                }
                if (haveCommonElements($elementsCovered, $elementsToWatch)) {
                    addEventHandlerInfo(element, event, $elementsCovered);
                }
            });
        }
    });

    return results;
};
