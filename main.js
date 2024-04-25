//const selectors, getting elements from DOM
/** @type {HTMLElement} */
const daysGrid = document.querySelector(".day_grid"),
currentDate = document.querySelector(".title_bar span"),
prevNextIcon = document.querySelectorAll(".title_bar div button");

// getting new date, current year and month
let date = new Date(),
currentDay = date.getDate(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing String names of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
/**
 * Renders/Creates the content of the Calendar
 */            
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month, in terms of week days
    // zero indexed, ie 0 = sun, 1 = mon ... 6 = sat
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month, ie 31
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month, ie what week day
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let spanList = []; //houses all newly created HTML elements

    // creating span elements of previous month prefix days of this month
    for (let i = firstDayofMonth; i > 0; i--) { 
        /** @type {HTMLSpanElement} */
        let dayEle = document.createElement('span');
        dayEle.className = "inactive";
        dayEle.innerText = (lastDateofLastMonth - i + 1);
        spanList.push(dayEle);
    }


    let isCorrectMonth = currMonth === new Date().getMonth();
    let isCorrectYear = currYear === new Date().getFullYear();
    // create all days of the current month in span elements
    for (let i = 1; i <= lastDateofMonth; i++) { 
        let isToday = i === currentDay && isCorrectMonth
                     && isCorrectYear ? "active" : "";
        // if the users current date matches above date then give it the active class
        let dayEle = document.createElement('span');
        dayEle.className = isToday;
        dayEle.innerText = (i);
        spanList.push(dayEle);
    }
     // creating spans of next months suffix days of this current month
    for (let i = lastDayofMonth; i < 6; i++) {
        let dayEle = document.createElement('span');
        dayEle.className = "inactive";
        dayEle.innerText = (i - lastDayofMonth + 1);
        spanList.push(dayEle);
    }
    // Replace Old date text with the newly updated date
    currentDate.innerText = `${months[currMonth]} ${currYear}`; 
    // animation toggle, making sure if animation loading was playing before it is removed before we unload the calendar
    if(daysGrid.classList.contains("loadingIn")){ 
        daysGrid.classList.remove("loadingIn");
    }
    // start the loading animation 
    daysGrid.classList.add("loading"); 
    //update event listener to render the span list to the calendar grid, once the load out animation ended
    daysGrid.onanimationend = () => {
        if(daysGrid.classList.contains("loading")){
            daysGrid.replaceChildren();
            spanList.forEach((ele) => daysGrid.appendChild(ele));
            daysGrid.classList.toggle("loading");
            daysGrid.classList.add("loadingIn");
        }
    }
}
// implicitly call the render calendar function once the script been loaded by the page
renderCalendar();

/** added on click listener to update the calendar content, forward or backwards */
prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // roll over, and update year and month information
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            // seems redundant, should be able to just removed this
            date = new Date(); 
        }
        renderCalendar(); // calling renderCalendar function, with updated dates
    });
});
