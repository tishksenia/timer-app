var events = [
    {
        "name": "Walk a doggo",
        "time": "06:00"
    },
    {
        "name": "Go to Uni",
        "time": "07:00"
    },
    {
        "name": "Dinner break",
        "time": "12:00"
    },
    {
        "name": "Homework",
        "time": "16:30"
    },
    {
        "name": "Sleep time",
        "time": "16:00"
    },
    {
        "name": "Now",
        "time": "2:11"
    }  
];

drawTimersList(events);

var add_button = document.querySelector('.add-event');
add_button.onclick = function() {
    addNewTimer(events);
    refreshList(events);
}

var delete_button = document.querySelector('.delete-event');
delete_button.onclick = function() {
    removeTimer(events);
    refreshList(events);
    
}


/*
 * Outputs timers list from events array.
 * @param {type} events
 * */
function drawTimersList(events) {
    var timers_list = document.querySelector('.timers-list');

    for(var i = 0; i < events.length; i++) {
        var single_event = document.createElement('div');
        single_event.className = "single-event";

        var timer = timers_list.appendChild(single_event);

        var event_name = document.createElement('h4');
        event_name.innerHTML = events[i].name;
        timer.appendChild(event_name);

        var time_left = document.createElement('span');
        time_left.className = "timer";
        
        time_left.innerHTML = events[i].time + '<br><i>R:</i> ' +
                calculateRemainingTimeFromNow(events[i].time);
        timer.appendChild(time_left);
    }
}

/*
 * Refreshes list of timers by deleting all elements and calling drawTimersList with new events array.
 * @param {type} events
 * */
function refreshList(events) {
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
    
    if(now > time) {
        return '00:00';
    }
    return hours + ':' + minutes;
}

/*
 * Asks for user input to get new event name & time. Adds new timer to the events array;
 * @param {type} events
 */
function addNewTimer(events) {
    var new_timer_name = prompt("Enter event's name: ", "Do thing");
    var new_timer_time = prompt("Enter time: ", "21:23");
    var new_timer = {
        "name": new_timer_name,
        "time": new_timer_time
    };
    events.push(new_timer);
}

/*
 * Asks for user input to get event name. Then finds that name and, if found, deletes it.
 * Otherwise outputs error message.
 * @param {type} events
 */
function removeTimer(events) {
    var timer_name_to_delete = prompt("Enter event's name: ", "");
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