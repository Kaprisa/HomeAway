import axios from 'axios';

const mapOptions = {
	center: { lat: 55.76, lng: 37.6 },
	zoom: 5
};

function loadPlaces(map, lat = 55.76 , lng = 37.6) {
	axios.get(`/api/offices/near?lat=${lat}&lng=${lng}`).then( res => {
		const places = res.data;
		if (!places.length) {
			map.setCenter({lat: lat, lng: lng});
			return;
		}
		const bounds = new google.maps.LatLngBounds();
		const infoWindow = new google.maps.InfoWindow();

		const markers = places.map( place => {
			const [ placeLng, placeLat ] = place.location.coordinates;
			const position = { lat: placeLat, lng: placeLng };
			bounds.extend(position);
			const marker = new google.maps.Marker({ map, position });
			marker.place = place;
			return marker;
		});

		markers.forEach( marker => marker.addListener('click', function(){
				const html = `<div class="office-popup">
					<a class="office-popup__link" href="/office/${this.place._id}">
						<img class="office-popup__img" src="/uploads/${this.place.photo}" alt=${this.place.name}>
						<p class="office-popup__text"> ${this.place.name} - ${this.place.location.address}</p>
					</a>
				</div>`;

				infoWindow.setContent(html);
				infoWindow.open(map, this);
			}));
			map.setCenter(bounds.getCenter());
			map.fitBounds(bounds);
	});
}

function makeMap(mapDiv) {
	if (!mapDiv) return;

	const map = new google.maps.Map(mapDiv, mapOptions);

	const input = mapDiv.previousElementSibling;

	const autocomplete = new google.maps.places.Autocomplete(input);

	if (input.value/*.length*/) {
		google.maps.event.trigger(autocomplete, 'place_changed');
	} else {
		loadPlaces(map);
	}

	autocomplete.addListener('place_changed', () => {
		const place = autocomplete.getPlace();
		loadPlaces(map, place.geometry.location.lat(), place.geometry.location.lng());
	});

}

export default makeMap;