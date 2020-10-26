var dayDisplay = $("#currentDay");
var container = $(".container");

// var timeBlocks = ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];

var timeBlocks = ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'];
var timeObj;

var now = moment();
var day = now.format("dddd, MMMM Do YYYY");

dayDisplay.text(day);

if(localStorage.getItem("scheduler")){
    timeObj = JSON.parse(localStorage.getItem("scheduler"));
    if(timeObj.date!=day) reset();
}
else{
    console.log('catch')
    reset();
}

function reset(){
    timeObj = {
        date: day
    }
    $.each(timeBlocks,function(index,time){
        timeObj[time]="";
    });
}

$.each(timeBlocks,function(index,time){
    var rowDiv = $("<div/>");
    rowDiv.addClass("row time-block");
    
    var hourDiv = $("<div/>");
    hourDiv.addClass("hour col-1 pt-2 pr-1 text-right");
    hourDiv.append(time);

    var eventDiv = $("<textarea/>");
    eventDiv.addClass("col-10 text-left description " + checkHour(time));
    eventDiv.val(timeObj[time]);

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
        // console.log("past");
        return "past";
    }
    else if(timeHour.isAfter(currentHour)){
        // console.log("future");
        return "future";
    }
    else{
        // console.log("present");
        return "present";
    }
}

container.click(function(event){
    var target = $(event.target);
    if(target.is("button")){
        // console.log(target.siblings("textarea").val());
        // console.log(target.siblings("div").text());  
        timeObj.date=day;
        timeObj[target.siblings("div").text()]=target.siblings("textarea").val();
        localStorage.setItem("scheduler",JSON.stringify(timeObj));
        
    }
    else if(target.is("i")){

        timeObj.date=day;
        timeObj[target.parent().siblings("div").text()]=target.parent().siblings("textarea").val();
        localStorage.setItem("scheduler",JSON.stringify(timeObj));
        // console.log(target.parent().siblings("textarea").val());
    }
})