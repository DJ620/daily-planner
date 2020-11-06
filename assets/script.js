// Function to make sure the rest of the document has loaded before running
$("document").ready(function() {

    // Global variable set to the current day's date
    var today = moment().format("dddd, MMMM Do, YYYY");

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

    $("#currentDay").text(today);
    
    for (var i = 0; i < 10; i++) {
        var time = moment().hour(8 + i);
        var current = moment().get('hour');

        var timeBlock = $("<section>");
        timeBlock.addClass("time-block");

        var row = $("<div>");
        row.addClass("row");

        var hour = $("<div>");
        hour.addClass("hour");
        hour.text(time.format('hA'));

        var textarea = $("<textarea>");
        if (moment(time.get('hour')).isSame(current)) {
            textarea.addClass("present");
        } else if (moment(time.get('hour')).isBefore(current)) {
            textarea.addClass("past");
        } else {
            textarea.addClass("future");
        }
        textarea.attr("rows", "2");
        textarea.attr("placeholder", "Add Event");
        textarea.attr("id", time.format('h'));

        var save = $("<button>");
        save.addClass("saveBtn fa fa-save ");
        save.attr("value", time.format('h'));

        row.append(hour);
        row.append(textarea);
        row.append(save);
        timeBlock.append(row);
        $(".container").append(timeBlock);
    };    
    
    savedEntries.forEach(function(entry) {
        $("#" + entry.hour).val(entry.scheduled);
    });

    $(".saveBtn").on("click", function() {
        var hour = $(this).val();
        var planned = $('#' + hour);
        if (planned.val()) {
            savedEntries.push({
                day: today,
                hour: hour,
                scheduled: planned.val()
            });
            localStorage.setItem("schedule", JSON.stringify(savedEntries));
        };
    });
});
