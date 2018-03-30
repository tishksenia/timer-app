//Loads saved data from Web Storage, if there's any
if(localStorage.getItem('events') === null) {
    var events = [  
    ];
} else {
    var events = JSON.parse(localStorage.getItem('events'));
}

//Saves data before closing/refreshing browser tab/window
window.onunload = function(){
    localStorage.setItem('events', JSON.stringify(events));
};

//Initializes the list of timers
drawTimersList(events);

//Event handlers for Add/Delete buttons
var add_button = document.querySelector('.add-event');
add_button.onclick = function() {
    addNewTimer();
    refreshList();
}
var reset_button = document.querySelector('.reset-events');
reset_button.onclick = function() {
    if(confirm("The action will delete all saved timers. Are you sure?")) {
        events = [];
        refreshList();
    }
    
}

//Refreshes timers every second
var refreshTime = 1000;
var timerID = window.setInterval(function() {
        redrawCountdowns();
    }, refreshTime);


/*
 * Redraws countdowns from timers list.
 */
function redrawCountdowns() {
    var countdowns = document.querySelectorAll('.countdown');
    var times = document.querySelectorAll('.time');
    for(var i = 0; i < countdowns.length; i++) {
        countdowns[i].innerHTML = '<i>R:</i> ' + calculateRemainingTimeFromNow( times[i].innerHTML );
        console.log(countdowns[i]);
    }
}

/*
 * Outputs timers list from events array.
 * */
function drawTimersList() {
    var timers_list = document.querySelector('.timers-list');

    for(var i = 0; i < events.length; i++) {
        var single_event = document.createElement('div');
        single_event.className = "single-event";

        var timer = timers_list.appendChild(single_event);

        
        var delete_btn = document.createElement('button');
        delete_btn.nameOfEvent = events[i].name;
        delete_btn.innerHTML = "delete";
        delete_btn.className = "timer-app-button delete-timer-button";
        delete_btn.onclick = function() {
            if(confirm("Timer with name " + this.nameOfEvent + " will be deleted. Continue?")) {
                removeTimer(this.nameOfEvent);
            }
        }
        
        var event_name = document.createElement('h4');
        event_name.innerHTML = events[i].name;
        timer.appendChild(event_name);
        timer.appendChild(delete_btn);

        var time = document.createElement('span');
        var time_left = document.createElement('span');
        time.className = "timer time";
        time_left.className = "timer countdown";
        time.innerHTML = events[i].time;
        time_left.innerHTML =  '<i>R:</i> ' +
                calculateRemainingTimeFromNow(events[i].time);
        timer.appendChild(time);
        timer.appendChild(time_left);
    }
}

/*
 * Refreshes list of timers by deleting all elements and calling drawTimersList with new events array.
 * */
function refreshList() {
    var timers_list = document.querySelector('.timers-list');
    var single_events  = document.querySelectorAll('.single-event');
    for(var i = 0; i < single_events.length; i++) {
        timers_list.removeChild(single_events[i]);
    }
    drawTimersList(events);
}

/*
 * Calculates time remaining to given time.
 * @returns remaining time
 */
function calculateRemainingTimeFromNow(timeAsString) {
    //sample date as we don't need it, just creating object to store time
    var time = new Date('Sep 5, 2018 ' + timeAsString + ':00').getTime();
    
    
    var now = new Date().getTime();
    var distance = time - now;
    
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + 1; //расхождение на +1 минуту
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if(now > time) {
        return '00:00:00';
    }
    return hours + ':' + minutes + ':' + seconds;
}

/*
 * Asks for user input to get new event name & time. Adds new timer to the events array;
 */
function addNewTimer() {
    var new_timer_name = prompt("Enter event's name: ", "Do thing");
    if(new_timer_name != null) 
        var new_timer_time = prompt("Enter time: ", "21:23");
    if(new_timer_name != null && new_timer_time != null) {
        var new_timer = {
            "name": new_timer_name,
            "time": new_timer_time
        };
        events.push(new_timer);
    }
    
}

/*
 * Asks for user input to get event name. Then finds that name and, if found, deletes it.
 * Otherwise outputs error message.
 * @name name of the timer to delete
 */
function removeTimer(name) {
    var timer_name_to_delete = name;
    var index = -1;
    for(var i = 0; i < events.length; i++) {
        if(events[i].name === timer_name_to_delete) {
            index = i;
        }
    }
    console.log(timer_name_to_delete + '  ' + index);
    if(index === -1)
        alert("We couldn't find element with this name: " + timer_name_to_delete);
    else
        events.splice(index, 1);
}