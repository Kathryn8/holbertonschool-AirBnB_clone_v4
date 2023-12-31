$(document).ready(function () {
  const checkedAmenities = {};
  $('input[type="checkbox"]').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if (this.checked) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    $('.amenities > h4').text(Object.values(checkedAmenities).join(', ').substring(0, 20));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      for (const place of data) {
        $('section.places').append(`<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${(place.max_guest !== 1 ? 's' : '')}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms !== 1 ? 's' : '')}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms !== 1 ? 's' : '')}</div>
        </div>
        <div class="user">
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`);
      }
    }

  });

  const amenityObj = {};

  $('button').click(function () {
    const amenityList = $.map(checkedAmenities, function (value, key) { return key; });
    amenityObj.amenities = amenityList;

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(amenityObj),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (data) {
        $('section.places').empty();
        for (const place of data) {
          $('section.places').append(`<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${(place.max_guest !== 1 ? 's' : '')}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms !== 1 ? 's' : '')}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms !== 1 ? 's' : '')}</div>
          </div>
          <div class="user">
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`);
        }
      }
    });
  });
});
