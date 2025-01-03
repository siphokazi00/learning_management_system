const calendarElement = document.getElementById('calendar');

// Function to generate a calendar for the current month
function generateCalendar() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  // Add headers for days of the week
  const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  headers.forEach(day => {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'header';
    headerDiv.textContent = day;
    calendarElement.appendChild(headerDiv);
  });

  // Add empty cells for days before the first day
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    calendarElement.appendChild(emptyDiv);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    calendarElement.appendChild(dayDiv);
  }
}

// Initialize the calendar
generateCalendar();