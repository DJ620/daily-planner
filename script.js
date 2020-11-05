console.log(moment().format("dddd, MMMM Do, YYYY"));
$("document").ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));
})
