//runs when html has finished loading
$(document).ready(function() {

    // Declare elements as variables
    var dayDisplay = $("#currentDay"); //Where the date will be displayed
    var container = $(".container"); //Where the timeblock will be displayed

    var timeBlocks = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];
    // var timeBlocks = ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'];
    var timeObj; //global object for the scheduler

    var now = moment(); //current time
    var day = now.format("dddd, MMMM Do YYYY"); //adjust the format of the today's date

    dayDisplay.text(day); //display the date in the text

    //check at the beginning if there is already a file in localstorage
    if(localStorage.getItem("scheduler")){
        timeObj = JSON.parse(localStorage.getItem("scheduler"));
        //if the file in localstorage is for a past day, calls the reset function
        if(timeObj.date!=day) {
            reset();
        }
    }
    else{
        reset();
    }

    // reset function that adds the today's date and creates/sets empty string for each time block
    function reset(){
        timeObj = {
            date: day
        }
        $.each(timeBlocks,function(index,time){
            timeObj[time]="";
        });
    }

    // loop that creates a row with the time, textarea and button for each time block
    $.each(timeBlocks,function(index,time){

        //creates a row div that will contains the three elements 
        var rowDiv = $("<div/>");
        rowDiv.addClass("row time-block");

        //creates the time label that takes 1 column width
        var hourDiv = $("<div/>");
        hourDiv.addClass("hour col-1");
        hourDiv.text(time);

        //creates the textarea that takes 10 columns width
        var eventDiv = $("<textarea/>");
        eventDiv.addClass("col-10 text-left description " + checkHour(time)); //the last class is determined by the checkHour function
        eventDiv.val(timeObj[time]); //set the text to whatever is saved in the timeObj at the corresponding time

        //creates the button that takes 1 column width
        var btnDiv = $("<button/>");
        btnDiv.addClass("saveBtn col-1");
        btnDiv.append('<i class="fas fa-lock"></i>');

        //appends the three elements above in order
        rowDiv.append(hourDiv);
        rowDiv.append(eventDiv);
        rowDiv.append(btnDiv);

        //appends the row div to the container div
        container.append(rowDiv);
    });

    // checkHour function checks takes in an argument time. The time argument is one hour block. It checks that one hour block is in the past, present or future. It returns the appropriate string.
    function checkHour(time){
        var timeHour = moment(time,'ha'); //change the time in the moment.js format
        var currentHour = moment(now.format('ha'),'ha'); //get the hour of the current time and change it the same moment.js format for comparison
        if(timeHour.isBefore(currentHour)){
            return "past";
        }
        else if(timeHour.isAfter(currentHour)){
            return "future";
        }
        else{
            return "present";
        }
    }

    //listens to click within the container
    container.click(function(event){
        var target = $(event.target);
        //if the user clicked inside the button but outside the icon
        //save the current day in the timeOjb
        //find the text in the textarea of the same row and save it to the correspnding time block in the timeObj
        //then saves timeObj with key scheduler in localStorage
        if(target.is("button")){
            timeObj.date=day;
            timeObj[target.siblings("div").text()]=target.siblings("textarea").val();
            localStorage.setItem("scheduler",JSON.stringify(timeObj));
        }

        //if the user clicked the icon within the button
        //same as above code but using the parent of the icon (button) to find the corresponding elements
        else if(target.is("i")){
            timeObj.date=day;
            timeObj[target.parent().siblings("div").text()]=target.parent().siblings("textarea").val();
            localStorage.setItem("scheduler",JSON.stringify(timeObj));
        }
    });
});