//import icons from 'url:../../img/icons.svg';

class SearchView {
    _parentElement = document.querySelector('.search');

    _clear(){
        this._parentElement.querySelector('.search__field').value = '';
    }

    getQuery(){
        const query =  this._parentElement.querySelector('.search__field').value;
        this._clear();
        return query;
    }

    addHandlerSearch(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();