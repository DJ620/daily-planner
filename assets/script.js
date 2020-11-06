console.log(moment().format("dddd, MMMM Do, YYYY"));
$("document").ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));
    
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
        textarea.attr("id", time.format('h'));

        var save = $("<button>");
        save.addClass("saveBtn fa fa-save ");
        save.attr("value", time.format('h'));

        row.append(hour);
        row.append(textarea);
        row.append(save);
        timeBlock.append(row);
        $(".container").append(timeBlock);
    }    

    var savedEntries = [];

    $(".saveBtn").on("click", function() {
        var hour = $(this).val();
        var planned = $('#' + hour);
        if (planned.val()) {
            savedEntries.push({
                day: moment().format("MMM Do YY"),
                hour: hour,
                scheduled: planned.val()
            })
            
        }
    })

    console.log(moment().format("MMM Do YY"));

});
