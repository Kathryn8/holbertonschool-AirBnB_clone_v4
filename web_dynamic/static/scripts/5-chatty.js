$(document).ready(function () {
  const checkedAmenities = {};

  function updateAmenitiesText() {
    $('.amenities > h4').text(Object.values(checkedAmenities).join(', '));
  }

  function addPlaceToSection(place) {
    $('section.places').append(`
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? "s" : ""}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? "s" : ""}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? "s" : ""}</div>
        </div>
        <div class="user"></div>
        <div class="description">${place.description}</div>
      </article>
    `);
  }

  function updatePlaces(data) {
    $('section.places').empty();
    data.forEach(addPlaceToSection);
  }

  function updateApiStatus(data) {
    if (data.status === "OK") {
      $('div#api_status').addClass("available");
    } else {
      $('#api_status').removeClass("available");
    }
  }

  $('input[type="checkbox"]').on('change', function () {
    const amenity_id = this.dataset.id;
    const amenity_name = this.dataset.name;
    if (this.checked) {
      checkedAmenities[amenity_id] = amenity_name;
    } else {
      delete checkedAmenities[amenity_id];
    }
    updateAmenitiesText();
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', updateApiStatus);

  $.ajax({
    type: "POST",
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: updatePlaces
  });

  $('button').click(function () {
    const amenityList = Object.keys(checkedAmenities);
    const amenityObj = { amenities: amenityList };

    $.ajax({
      type: "POST",
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(amenityObj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: updatePlaces
    });
  });
});
