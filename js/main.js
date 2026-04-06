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