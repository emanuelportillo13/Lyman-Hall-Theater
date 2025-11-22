"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Lyman Hall Theater August Calendar
   Author: Emanuel Portillo
   Date: November 22, 2025

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table and any events for each day are added below
      the day number.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title row in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate

*/

function createCalendar(calDate) {
   // Build the HTML for the entire calendar table
   var calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   return calendarHTML;
}

// Write the caption showing month and year
function calCaption(calDate) {
   var monthName = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
   ];

   var thisMonth = monthName[calDate.getMonth()];
   var thisYear  = calDate.getFullYear();

   return "<caption>" + thisMonth + " " + thisYear + "</caption>";
}

// Write the weekday header row
function calWeekdayRow() {
   var weekdayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   var rowHTML = "<tr>";
   for (var i = 0; i < weekdayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>" + weekdayName[i] + "</th>";
   }
   rowHTML += "</tr>";
   return rowHTML;
}

// Return the number of days in the month
function daysInMonth(calDate) {
   var month = calDate.getMonth();
   var year  = calDate.getFullYear();

   // Day 0 of the next month is the last day of the current month
   var lastDay = new Date(year, month + 1, 0);
   return lastDay.getDate();
}

// Write out the table rows and cells for each day
function calDays(calDate) {
   var totalDays   = daysInMonth(calDate);
   var highlightDay = calDate.getDate();

   // Start with the first day of the month
   var currentDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   var weekDay    = currentDay.getDay();

   var htmlCode = "<tr>";

   // Blank cells before the first day of the month
   for (var i = 0; i < weekDay; i++) {
      htmlCode += "<td class='calendar_dates'></td>";
   }

   // Loop through the days of the month
   for (var dayNum = 1; dayNum <= totalDays; dayNum++) {
      currentDay.setDate(dayNum);
      weekDay = currentDay.getDay();

      // Start a new row on Sundays (except for the first day already started)
      if (weekDay === 0 && dayNum !== 1) {
         htmlCode += "</tr><tr>";
      }

      var eventHTML = "";
      // Add any event information stored in the dayEvent array
      if (typeof dayEvent !== "undefined" && dayEvent[dayNum]) {
         eventHTML = dayEvent[dayNum];
      }

      // Highlight the selected day
      if (dayNum === highlightDay) {
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" +
                     dayNum + eventHTML + "</td>";
      } else {
         htmlCode += "<td class='calendar_dates'>" +
                     dayNum + eventHTML + "</td>";
      }
   }

   // Fill in any trailing blank cells in the last week
   weekDay = currentDay.getDay();
   if (weekDay !== 6) {
      for (var j = weekDay + 1; j <= 6; j++) {
         htmlCode += "<td class='calendar_dates'></td>";
      }
   }

   htmlCode += "</tr>";
   return htmlCode;
}

// Generate the calendar when the page has finished loading
window.addEventListener("load", function() {
   // Fixed date in August so the schedule always shows that month
   var thisDay = new Date("August 24, 2018");
   var calendarBox = document.getElementById("calendar");
   if (calendarBox) {
      calendarBox.innerHTML = createCalendar(thisDay);
   }
});
