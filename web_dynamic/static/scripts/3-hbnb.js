$(document).ready(function () {
  const idsObj = {};
  $('input[type="checkbox"]').on('change', function () {
    const amenityId = this.dataset.id;
    const amenityName = this.dataset.name;
    if (this.checked) {
      console.log('Checked');
      idsObj[amenityId] = amenityName;
      console.log(idsObj);
    } else {
      console.log('Unchecked');
      delete idsObj[amenityId];
      console.log(idsObj);
    }
    $('.amenities > h4').text(Object.values(idsObj).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    console.log(data);
    if (data.status === 'OK') {
      console.log('ok');
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
      // console.log(data)
      // console.log(typeof (data))
      console.log('================');
      for (const place of data) {
        console.log(place.name);
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
<div class="description">${place.description}</div>
</article>`);
      }
    }
  });
});
