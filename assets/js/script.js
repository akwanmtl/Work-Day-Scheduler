var dayDisplay = $("#currentDay");
var container = $(".container");

// var timeBlocks = ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];

var timeBlocks = ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'];

var now = moment();
var day = now.format("dddd, MMMM Do YYYY");

dayDisplay.text(day);

$.each(timeBlocks,function(index,time){
    var rowDiv = $("<div/>");
    rowDiv.addClass("row time-block");
    
    var hourDiv = $("<div/>");
    hourDiv.addClass("hour col-1 pt-2 pr-1 text-right");
    hourDiv.append(time);

    var eventDiv = $("<textarea/>");
    eventDiv.addClass("col-10 text-left description " + checkHour(time));
    
    var btnDiv = $("<button/>");
    btnDiv.addClass("saveBtn col-1");
    btnDiv.append('<i class="fas fa-lock"></i>');

    rowDiv.append(hourDiv);
    rowDiv.append(eventDiv);
    rowDiv.append(btnDiv);

    container.append(rowDiv);
});

function checkHour(time){
    var timeHour = moment(time,'ha');
    var currentHour = moment(now.format('ha'),'ha');
    if(timeHour.isBefore(currentHour)){
        console.log("past");
        return "past";
    }
    else if(timeHour.isAfter(currentHour)){
        console.log("future");
        return "future";
    }
    else{
        console.log("present");
        return "present";
    }
}
