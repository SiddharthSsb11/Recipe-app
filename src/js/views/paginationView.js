import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')

    addHandlerPaginationBtn(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline')
            if(!btn) return
            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        })
    }

    _generateMarkup(){
        const numPage = Math.ceil(this._data.results.length / this._data.resultsPerPage); //state.search.result.length
        //console.log(numPage)

        //on page 1 and there are more pages
        if (this._data.page === 1 && numPage > 1) {
          return `
            <button data-goto = "${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        }

        //on last page and more pages
        if(this._data.page === numPage && numPage > 1){
            return `
            <button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${this._data.page - 1}</span>
          </button>
            `;
        } 

        if (this._data.page < numPage) {
          return `
            <button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${this._data.page - 1}</span>
          </button>
            
          <button data-goto = "${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        }
        
        return ''
    }
}

export default new PaginationView();