const eventsListElement = document.getElementById('eventsList');

// Sample events data
const events = [
  {
    title: 'Parent-Teacher Meeting',
    date: '2025-01-15',
    description: 'Discuss student progress with parents.',
  },
  {
    title: 'Science Fair',
    date: '2025-02-10',
    description: 'Showcase student projects in science and technology.',
  },
  {
    title: 'Sports Day',
    date: '2025-03-25',
    description: 'Annual sports competition and awards ceremony.',
  },
];

// Function to render events
function renderEvents() {
  events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event';

    const eventTitle = document.createElement('h3');
    eventTitle.textContent = `${event.title} - ${event.date}`;
    eventDiv.appendChild(eventTitle);

    const eventDescription = document.createElement('p');
    eventDescription.textContent = event.description;
    eventDiv.appendChild(eventDescription);

    eventsListElement.appendChild(eventDiv);
  });
}

// Initialize the events list
renderEvents();