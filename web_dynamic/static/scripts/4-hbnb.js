$(document).ready(function () {
  let checkedAmenities = {};
  $('input[type="checkbox"]').on('change', function () {
    const amenity_id = this.dataset.id;
    const amenity_name = this.dataset.name;
    if (this.checked) {
      // console.log('Checked');
      checkedAmenities[amenity_id] = amenity_name
      // console.log(checkedAmenities)
    }
    else {
      // console.log('Unchecked');
      delete checkedAmenities[amenity_id];
      // console.log(checkedAmenities)
    };
    $('.amenities > h4').text(Object.values(checkedAmenities).join(', '))
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    // console.log(data)
    if (data.status === "OK") {
      // console.log("ok")
      $('div#api_status').addClass("available");
    } else {
      $('#api_status').removeClass("available");
    }
  });

  // $.ajax({
  //   type: "POST",
  //   url: 'http://0.0.0.0:5001/api/v1/places_search/',
  //   data: "{}",
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "json",
  //   success: function (data) {
  //     // console.log(data)
  //     // console.log(typeof (data))
  //     // console.log("================")
  //     for (const place of data) {
  //       // console.log(place.name);
  //       $('section.places').append(`<article>
  // 			<div class="title_box">
  // 				<h2>${place.name}</h2>
  // 				<div class="price_by_night">$${place.price_by_night}</div>
  // 			</div>
  // 			<div class="information">
  // 				<div class="max_guest">${place.max_guest} Guest${(place.max_guest != 1 ? "s" : "")}</div>
  // 				<div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms != 1 ? "s" : "")}</div>
  // 				<div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms != 1 ? "s" : "")}</div>
  // 			</div>
  // 			<div class="user">
  // 			</div>
  // 			<div class="description">
  // 				${place.description}
  // 			</div>
  // 		</article>`)
  //     }

  //   }
  // })
  // console.log(typeof (checkedAmenities))
  // console.log(checkedAmenities)
  let amenityList = Object.values(checkedAmenities).join(', ')
  //console.log(typeof (amenityList))
  console.log(amenityList)
  const amenityObj = {}

  $('button').click(function () {
    console.log("========   amenityList   ========")

    const amenityList = $.map(checkedAmenities, function (value, key) { return key; });
    console.log(typeof (amenityList))
    console.log(amenityList)
    amenityObj['amenities'] = amenityList
    console.log("========   amenityObj:  ========")
    console.log(amenityObj)
    console.log("pressed!")
    $.ajax({
      type: "POST",
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(amenityObj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log("========   DATA   ========")
        console.log(data)
        for (const place of data) {
          // console.log(place.name);
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
    });
  });
});
