$(document).ready(function () {
  let ids_obj = {};
  $('input[type="checkbox"]').on('change', function () {
    const amenity_id = this.dataset.id;
    const amenity_name = this.dataset.name;
    if (this.checked) {
      console.log('Checked');
      ids_obj[amenity_id] = amenity_name
      console.log(ids_obj)
    }
    else {
      console.log('Unchecked');
      delete ids_obj[amenity_id];
      console.log(ids_obj)
    };
    $('.amenities > h4').text(Object.values(ids_obj).join(', '))
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    console.log(data)
    if (data.status === "OK") {
      console.log("ok")
      $('div#api_status').addClass("available");
    } else {
      $('#api_status').removeClass("available");
    }
  });

  $.ajax({
    type: "POST",
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      // console.log(data)
      // console.log(typeof (data))
      console.log("================")
      for (const place of data) {
        console.log(place.name);
        $('section.places').append(`<article>
				<div class="title_box">
					<h2>${place.name}</h2>
					<div class="price_by_night">$${place.price_by_night}</div>
				</div>
				<div class="information">
					<div class="max_guest">${place.max_guest} Guest${(place.max_guest != 1 ? "s" : "")}</div>
					<div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms != 1 ? "s" : "")}</div>
					<div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms != 1 ? "s" : "")}</div>
				</div>
				<div class="user">
				</div>
				<div class="description">
					${place.description}
				</div>
			</article>`)
      }

    }
  })
});
