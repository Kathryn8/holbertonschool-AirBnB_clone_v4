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
});
