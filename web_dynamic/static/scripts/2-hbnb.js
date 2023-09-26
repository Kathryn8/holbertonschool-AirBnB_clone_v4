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
      $('div#api_status').removeClass("available");
    }
  });
});