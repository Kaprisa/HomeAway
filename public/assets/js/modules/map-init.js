
function mapInit(lat = 52.2703623, lng = 104.2813284) {
  const mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(lat, lng),
    styles: [{"featureType": "administrative", "stylers": [{"visibility": "off"}]}, {
      "featureType": "poi",
      "stylers": [{"visibility": "simplified"}]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{"visibility": "simplified"}]
    }, {"featureType": "water", "stylers": [{"visibility": "simplified"}]}, {
      "featureType": "transit",
      "stylers": [{"visibility": "simplified"}]
    }, {"featureType": "landscape", "stylers": [{"visibility": "simplified"}]}, {
      "featureType": "road.highway",
      "stylers": [{"visibility": "off"}]
    }, {"featureType": "road.local", "stylers": [{"visibility": "on"}]}, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{"visibility": "on"}]
    }, {"featureType": "water", "stylers": [{"color": "#abbaa4"}]}, {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [{"color": "#3f518c"}]
    }, {"featureType": "road.highway", "stylers": [{"color": "#ad9b8d"}]}],
    disableDefaultUI: true//,
    //scrollwheel: false
  };
  const mapElement = document.getElementById('map');
  const map = new google.maps.Map(mapElement, mapOptions);

  var marker = new google.maps.Marker({
    position: mapOptions.center,
    map: map,
    title: 'Это мы!'
  });
};

export default mapInit;
