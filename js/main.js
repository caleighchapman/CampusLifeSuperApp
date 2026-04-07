// WEATHER API setup
// this fetches real current weather for Jackson MS using OpenWeatherMap
const apiKey = "02b6524ac2a21e66f95bc30d772c21e6";
const city = "Jackson,MS,US";

// this function calls the weather API and displays the result on the page
function loadWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      // pull the info we want out of the API response
      let temp = data.main.temp;
      let description = data.weather[0].description;
      let humidity = data.main.humidity;

      // put the weather info into the widget on the page
      document.getElementById("weather-display").innerHTML = 
        `Jackson, MS: ${Math.round(temp)}°F — ${description} | Humidity: ${humidity}%`;
    })
    .catch(error => {
      // if something goes wrong, show this message instead
      document.getElementById("weather-display").innerHTML = "Weather unavailable right now.";
    });
}

// run the weather function as soon as the page loads
loadWeather();

// DINING PAGE JAVASCRIPT
// this function runs when a dining location button is clicked
// it receives the name of the location that was clicked
function showLocation(location) {

  // this grabs the empty div from the HTML so we can put content in it
  let infoDiv = document.getElementById("location-info");

  // Real Millsaps dining info from millsaps.edu/campus-life/eating-on-campus
  if (location === "reubens") {
    infoDiv.innerHTML = `
      <div class="card mx-auto" style="max-width: 600px;">
        <div class="card-body">
          <h2 class="card-title">Reuben's</h2>
          <p>Reuben's is a late-night spot to get a great sandwich or something from the grill. Meet up with friends for some studying fuel.</p>
          <p><strong>Location:</strong> College Center</p>
          <a href="https://millsaps.mydininghub.com/en/location/ruebens" target="_blank" class="btn btn-primary">View Full Menu</a>
        </div>
      </div>`;

  } else if (location === "caf") {
    infoDiv.innerHTML = `
      <div class="card mx-auto" style="max-width: 600px;">
        <div class="card-body">
          <h2 class="card-title">The Caf</h2>
          <p>The Caf is an all-you-care-to-eat dining facility with a multitude of stations, each offering something different. With a rotating menu, there are always delicious options available.</p>
          <p><strong>Location:</strong> Main floor of the College Center</p>
          <a href="https://millsaps.mydininghub.com/en/location/the-cafeteria" target="_blank" class="btn btn-primary">View Full Menu</a>
        </div>
      </div>`;

  } else if (location === "ecogrounds") {
    infoDiv.innerHTML = `
      <div class="card mx-auto" style="max-width: 600px;">
        <div class="card-body">
          <h2 class="card-title">EcoGrounds</h2>
          <p>EcoGrounds offers consciously great coffee. Responsibly sourced, slowly hand roasted and air cooled to perfection. Grab a pick-me-up on your way to class.</p>
          <a href="https://millsaps.mydininghub.com/en/location/ecogrounds" target="_blank" class="btn btn-primary">View Full Menu</a>
        </div>
      </div>`;
  }
}

// CLUBS PAGE JAVASCRIPT
// real Millsaps clubs data from millsaps.edu/campus-life/get-involved
// each club has a name and a category so we can filter them
const clubs = [
  { name: "Government and Politics Club", category: "academic" },
  { name: "History Club", category: "academic" },
  { name: "Millsaps Mock Trial", category: "academic" },
  { name: "Millsaps Model United Nations", category: "academic" },
  { name: "Pre-Law Society", category: "academic" },
  { name: "Psych Club", category: "academic" },
  { name: "Black Girl Projects x Millsaps", category: "culture" },
  { name: "Hispanic Heritage Club", category: "culture" },
  { name: "International Student Organization", category: "culture" },
  { name: "Male Empowerment Network (M.E.N.)", category: "culture" },
  { name: "Pan-African Student Alliance (PASA)", category: "culture" },
  { name: "South Asian Cultural Association (SACA)", category: "culture" },
  { name: "Chi Omega", category: "greek" },
  { name: "Kappa Delta", category: "greek" },
  { name: "Phi Mu", category: "greek" },
  { name: "Lambda Chi Alpha", category: "greek" },
  { name: "Kappa Alpha Order", category: "greek" },
  { name: "Sigma Alpha Epsilon", category: "greek" },
  { name: "Catholic Student Association", category: "religious" },
  { name: "Christian Collective", category: "religious" },
  { name: "Fellowship of Christian Athletes", category: "religious" },
  { name: "Millsaps Christian Fellowship", category: "religious" },
  { name: "Anime and K-pop Club (AKC)", category: "special" },
  { name: "Chess Club", category: "special" },
  { name: "Coding Club", category: "special" },
  { name: "Fashion Collective", category: "special" },
  { name: "Garden Club", category: "special" },
  { name: "Pickleball Club", category: "special" },
  { name: "Pride Club", category: "special" },
  { name: "Rotaract Club", category: "special" },
];

// this function runs when a filter button is clicked
// it shows only the clubs that match the selected category
function filterClubs(category) {

  // grab the container div where club cards will appear
  let container = document.getElementById("clubs-container");

  // if "all" is selected show every club, otherwise only show matching category
  let filtered = category === "all" ? clubs : clubs.filter(club => club.category === category);

  // clear whatever was showing before
  container.innerHTML = "";

  // loop through the filtered clubs and create a card for each one
  filtered.forEach(club => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${club.name}</h5>
            <span class="badge" data-category="${club.category}">${club.category}</span>
          </div>
        </div>
      </div>`;
  });
}

// only run filterClubs if the clubs container exists on this page
if (document.getElementById("clubs-container")) {
  filterClubs("all");
}

// EVENTS PAGE JAVASCRIPT
// this function fetches real upcoming events from the Millsaps events calendar
// it uses the Localist API which is free and doesn't need a key
function loadEvents() {

  // the API URL for Millsaps upcoming events
  const eventsUrl = "https://calendar.millsaps.edu/api/2/events?days=30&pp=6";

  fetch(eventsUrl)
    .then(response => response.json())
    .then(data => {

      // hide the "Loading events..." message once data arrives
      document.getElementById("loading").style.display = "none";

      // grab the container where event cards will go
      let container = document.getElementById("events-container");

      // loop through each event and create a card for it
      data.events.forEach(item => {
        let event = item.event;
        let title = event.title;
        let date = new Date(event.event_instances[0].event_instance.start).toLocaleDateString();
        let url = event.localist_url;

        container.innerHTML += `
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text"><strong>Date:</strong> ${date}</p>
                <a href="${url}" target="_blank" class="btn btn-primary btn-sm">Learn More</a>
              </div>
            </div>
          </div>`;
      });
    })
    .catch(error => {
      // if the API fails show this message instead
      document.getElementById("loading").innerHTML = "Events unavailable right now. <a href='https://calendar.millsaps.edu' target='_blank'>View the full calendar here.</a>";
    });
}

// only run loadEvents if the events container exists on this page
if (document.getElementById("events-container")) {
  loadEvents();
}