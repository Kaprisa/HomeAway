import { $, $$ } from './bling';
import { numValidator } from './inputValidator';
import axios from 'axios';
import autocomplete from './autocomplete';
import { showPopup, hidePopup, dynamicPopup } from './popup';

function uploadPhoto(photo, cb){
	if (!photo) return cb('');
	const config = {
      headers: { 'content-type': 'multipart/form-data' }
  	};
	 	const formData = new FormData();
	  formData.append("photo", photo);
	  axios.post('/api/fileUpload', formData, config)
	    .then( res =>  {
	    	cb(res.data)
	    }).catch(err => {console.error(err); return;});
}

function loadPhoto(input, img) {
	input.on('change', function(event){
		const file = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.onload = (function(theFile) {
	   	return function(e) {
	      img.setAttribute('src', e.target.result);
	    };
	  })(file);
	  fileReader.readAsDataURL(file);
	});
}

function postData(data) {
 	uploadPhoto($('#photo').files[0], function(photo) {
		if (photo.length) data.photo = photo;
		axios.post($('.editor__form').action, data).then(res => {
			dynamicPopup({action: 'success', msg: 'Данные успешно загружены!'});
		}).catch(err => {
			dynamicPopup({action: 'error', msg: 'Ошибка загрузки данных :('});
			console.error(err)});
	});
}

function editor(){

 if ($('.editor')) {

		$$('.js-number').forEach( input => numValidator(input));

		if($('#address')) {
			autocomplete($('#address'), $('#lat'), $('#lng'));
		}

		if($('#photo')){
			loadPhoto($('#photo'), $('.editor__img'));
		}

		if ($('#editor-add-eqi')){
			$('#editor-add-eqi').on('click', function(){
				$('.editor__equipment').querySelector('.editor-table tbody').insertAdjacentHTML('beforeend','<tr class="editor-table__row js-eqi"><td class="editor-table__col" contenteditable="true"></td><td class="editor-table__col" contenteditable="true"></td></tr>');
			});
		}

		$('.editor__form').on('submit', function(e){
		 	e.preventDefault();

		 	if ($('#apartment-editor')){
			 	let equipment = [];
			 	if ($('.js-eqi')){
			 		$$('.js-eqi').forEach(item => {
			 			const cols = item.querySelectorAll('td');
			 			const [ name, icon ] = [ cols[0].innerHTML, cols[1].innerHTML ];
			 			equipment.push({
			 				name,
			 				icon
			 			});
			 		});
			 	};  
			 	const data = {
			 		name: $('#name').value,
			 		type: $('#type').value,
			 		phone: $('#phone').value,
			 		location: {
			 			address: $('#address').value,
			 			coordinates: []
			 		},
			 		description: $('#description').value,
			 		prices: {
						day: $('#dayPrice').value,
						hour: $('#hourPrice').value
			 		},
			 		equipment,
			 		characteristics: {
			 			floor: $('#floor').innerHTML,
			 			square: $('#square').innerHTML,
			 			places: $('#places').innerHTML,
			 			people: $('#people').innerHTML,
			 		}		
			 	};
			 	data.location.coordinates[0] = $('#lng').value;
			 	data.location.coordinates[1] = $('#lat').value;
			 	postData(data);			 	
			}
			if ($('#office-editor')) {
					const data = {
				 		name: $('#name').value,
				 		phone: $('#phone').value,
				 		description: $('#description').value,
				 		businessHours: [],
				 		location: {
				 			address: $('#address').value,
				 			coordinates: []
				 		}	
				 	};
				 	data.businessHours[0] = {
				 		start: $('#weekdays-start').value,
				 		end: $('#weekdays-end').value
				 	};
				 	data.businessHours[1] = {
				 		start: $('#weekend-start').value,
				 		end: $('#weekend-end').value
				 	};
				 	data.location.coordinates[0] = $('#lng').value;
				 	data.location.coordinates[1] = $('#lat').value;
				 	postData(data);
				}

		if ($('#place-editor')) {
			const data = {
		 		name: $('#name').value,
		 		purpose: $('#purpose').value,
		 		description: $('#description').value,
		 		location: {
		 			address: $('#address').value,
		 			coordinates: []
		 		}	
		 	};
		 	data.location.coordinates[0] = $('#lng').value;
		 	data.location.coordinates[1] = $('#lat').value;
		 	postData(data);
		}

		});

		if ($('#confirm-delete')) {

			$('#confirm-delete').on('click', function(){
				const popup = $('.confirm-popup');
				showPopup(popup, false);
				popup.querySelector('#cancel').on('click', function(){
					hidePopup(popup);
				})
				popup.querySelector('.confirm-popup__form').on('submit', function(e) {
					e.preventDefault();
					axios.delete(this.action).then( res => {
						const content = popup.querySelector('.popup__content');
						const inner = content.innerHTML;
						content.innerHTML = `<div class="confirm-popup__res">Удаление прошло успешно!</div>`;
						hidePopup(popup)
						content.innerHTML = inner;
					}).catch(err => {
						console.error(err);
					})
				})
			});
		}
	}
}


export default editor();