// Function to make sure the rest of the document has loaded before running
$("document").ready(function() {

    // This code sets the date at the top of the page to the current day
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

    // An empty array that will hold the saved entries
    var savedEntries = [];

    /* This block of code checks if there is data in local storage. 
       If there is, it gets pushed into the savedEntries array */
    var checkStorage = JSON.parse(localStorage.getItem("schedule"));
    if (checkStorage) {
        checkStorage.forEach(function(entry) {
            savedEntries.push(entry);
        });
        localStorage.setItem("schedule", JSON.stringify(savedEntries));
    };
    
    // This for loop creates 10 time blocks, from 8AM to 5PM
    for (var i = 0; i < 10; i++) {

        // A variable set to the hour assigned to the time-block
        var time = moment().hour(8 + i);

        // A variable representing the current hour
        var current = moment().get('hour');

        // Creating the elements necessary to render each time-block
        var timeBlock = $("<section>");
        timeBlock.addClass("time-block");
        var row = $("<div>");
        row.addClass("row");
        var hour = $("<div>");
        hour.addClass("hour font-weight-bold");

        // Sets the text of the hour div to the appropriate hour
        hour.text(time.format('hA'));

        var textarea = $("<textarea>");
        textarea.attr("rows", "2");

        // Gives each textarea placeholder text
        textarea.attr("placeholder", "Add Event");

        // Assigns an id to each textarea corresponding to the hour it represents
        textarea.attr("id", time.format('h'));

        /* This conditional statement uses moments.js to determine if the time-block's 
           specified hour is before, during, or after the current hour */
        if (moment(time.get('hour')).isSame(current)) {
            textarea.addClass("present");
        } else if (moment(time.get('hour')).isBefore(current)) {
            textarea.addClass("past");
        } else {
            textarea.addClass("future");
        };
        var save = $("<button>");
        save.addClass("saveBtn fa fa-save ");

        // This gives each button a value that matches with its corresponding textarea's id
        save.attr("value", time.format('h'));

        // Attaches all the elements to the page
        row.append(hour);
        row.append(textarea);
        row.append(save);
        timeBlock.append(row);
        $(".container").append(timeBlock);
    };    
    
    // This code attaches any data in local storage to it's appropriate time-block
    savedEntries.forEach(function(entry) {
        $("#" + entry.hour).val(entry.scheduled);
    });

    // This is a jQuery event listener attached to each save button
    $(".saveBtn").on("click", function() {

        // Creates a variable set to the value property of the button that was clicked
        var hour = $(this).val();

        // Uses the above variable to target the textarea with a matching id
        var planned = $("#" + hour);

        // A flag used to determine if a time-block already has a saved object
        var flag = "false";

        // This code loops through the savedEntries array to check if that hour already has an associated time-block
        for (var i = 0; i < savedEntries.length; i++) {
            if (savedEntries[i].hour === hour) {

                // If it does, the flag is set to true, and the existing object is updated
                flag = "true";
                savedEntries[i].scheduled = planned.val();
            };
        };
        // If no corresponding object was found in the savedEntries array, a new object is created and put into local storage
        if (flag === "false") {
            savedEntries.push({
                hour: hour,
                scheduled: planned.val()
            });
        };
        localStorage.setItem("schedule", JSON.stringify(savedEntries));
    });
});
