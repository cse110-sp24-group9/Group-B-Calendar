/** @type {HTMLElement} */
const daysGrid = document.querySelector(".day_grid"),
currentDate = document.querySelector(".title_bar span"),
prevNextIcon = document.querySelectorAll(".title_bar div button");

// getting new date, current year and month
let date = new Date(),
currentDay = date.getDate(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
              
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month, in terms of week days
    // zero indexed, ie 0 = sun, 1 = mon ... 6 = sat
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month, ie 31
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month, ie what week day
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let spanList = [];

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        /** @type {HTMLSpanElement} */
        let dayEle = document.createElement('span');
        dayEle.className = "inactive";
        dayEle.innerText = (lastDateofLastMonth - i + 1);
        spanList.push(dayEle);
    }
    let isCorrectMonth = currMonth === new Date().getMonth();
    let isCorrectYear = currYear === new Date().getFullYear();
    
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === currentDay && isCorrectMonth
                     && isCorrectYear ? "active" : "";
        let dayEle = document.createElement('span');
        dayEle.className = isToday;
        dayEle.innerText = (i);
        spanList.push(dayEle);
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        let dayEle = document.createElement('span');
        dayEle.className = "inactive";
        dayEle.innerText = (i - lastDayofMonth + 1);
        spanList.push(dayEle);
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    if(daysGrid.classList.contains("loadingIn")){ //animation toggle
        daysGrid.classList.remove("loadingIn");
    }
    daysGrid.classList.add("loading"); // start the loading animation 
    daysGrid.onanimationend = () => {
        if(daysGrid.classList.contains("loading")){
            daysGrid.replaceChildren();
            spanList.forEach((ele) => daysGrid.appendChild(ele));
            daysGrid.classList.toggle("loading");
            daysGrid.classList.add("loadingIn");
        }
    }
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});
