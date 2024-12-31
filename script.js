document.addEventListener("DOMContentLoaded", function () {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = {
        "january": 31,
        "february": 28, // Default (adjusted for leap years later)
        "march": 31,
        "april": 30,
        "may": 31,
        "june": 30,
        "july": 31,
        "august": 31,
        "september": 30,
        "october": 31,
        "november": 30,
        "december": 31
    };

    document.getElementById("calculate").addEventListener("click", function () {
        const monthInput = document.getElementById("month").value.trim().toLowerCase();
        const day = parseInt(document.getElementById("day").value);
        const year = parseInt(document.getElementById("year").value);

        // Validate inputs
        if (!months[monthInput]) {
            alert("Invalid month. Please check your input.");
            return;
        }
        if (isNaN(day) || day < 1 || day > months[monthInput]) {
            alert("Invalid day for the given month.");
            return;
        }
        if (isNaN(year) || year < 1900 || year > 3000) {
            alert("Invalid year. Please enter a year between 1900 and 3000.");
            return;
        }

        // Adjust February for leap years
        if (monthInput === "february") {
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                months["february"] = 29;
            } else {
                months["february"] = 28;
            }
        }

        // Calculate total days since 01/01/1900
        let totalDays = (year - 1900) * 365;

        // Add leap days
        totalDays += Math.floor((year - 1900) / 4);  // Add leap years
        totalDays -= Math.floor((year - 1900) / 100); // Remove non-leap century years
        totalDays += Math.floor((year - 1600) / 400); // Add back leap century years

        // Add days from months in the current year
        let monthNames = Object.keys(months);
        let monthIndex = monthNames.indexOf(monthInput);
        for (let i = 0; i < monthIndex; i++) {
            totalDays += months[monthNames[i]];
        }

        // Add the current day
        totalDays += (day - 1);

        // Offset correction for 01/01/1900 being a Monday
        const dayOfWeek = (totalDays + 1) % 7;

        // Normalize both the current date and input date to only compare year, month, and day
        const currentDate = new Date();
        const inputDate = new Date(year, monthIndex, day);

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        // Compare the input date to the current date explicitly
        let timeRelation;
        if (year === currentYear && monthIndex === currentMonth && day === currentDay) {
            timeRelation = "is";
        } else if (inputDate < currentDate) {
            timeRelation = "was";
        } else {
            timeRelation = "will be";
        }

        // Display result
        const result = `${monthInput.charAt(0).toUpperCase() + monthInput.slice(1)} ${day}, ${year} ${timeRelation} a ${daysOfWeek[dayOfWeek]}.`;
        document.getElementById("result").textContent = result;
    });
});
