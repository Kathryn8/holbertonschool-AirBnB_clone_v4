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
      // ids_list = ids_list.filter(function (element) {
      // return element !== amenityId;
      // });
      console.log(idsObj);
    }
    $('.amenities > h4').text(Object.values(idsObj).join(', '));
  });
});
