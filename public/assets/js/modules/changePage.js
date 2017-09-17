import { $$, $ } from './bling';
import axios from 'axios';
import smoothScroll from './smoothScroll'
//import history from 'history'

function changePageReq(navParentClass, page, sort = 'created', hst = true) {
	axios.get(`${page}?axs=1&sort=${sort}`).then(res => {
		if (!res.data) return;
		$('#catalog-holder').innerHTML = res.data;
		smoothScroll(document.body, 0, 2000);
		const state = { page: page, sort: sort };
		if (hst){
			history.pushState(state, 'HotelHome', state.page);
		}
		changePage(navParentClass);
	})
}

function changePage(navParentClass) {
	if (!navParentClass || !$(`.${navParentClass}`)) return 
	$$(`.${navParentClass}__link`).on('click', function(e){
		e.preventDefault();
		const sort = $('.sort__current').getAttribute('data-sort');
		const href = this.getAttribute('href');
		changePageReq(navParentClass, href, sort);
	});
	window.onpopstate = function(e) {
  	if (!e.state) return;
  	changePageReq(navParentClass, e.state.page, e.state.sort, false);
	};
}

function sort() {
	const items = $$('.js-sort-item');
	items.on('click', function(){
		changePageReq('pagination', `/catalog/${$('.type__current').getAttribute('data-type')}/page/${$('.pagination__link_active').innerHTML}`, this.getAttribute('data-sort'));
	});	
}

function changeType() {
	const items = $$('.js-type-item');
	items.on('click', function(){
		changePageReq('pagination', `/catalog/${this.getAttribute('data-type')}/page/1`);
	});	
}

export { changePage, changeType, sort };