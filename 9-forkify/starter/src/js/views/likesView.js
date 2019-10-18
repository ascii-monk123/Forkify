import { elements } from './base';
import { limitRecipeTitle } from './searchView';

//This function will toggle the liked butoon depending upon if the recipe is liked or not
export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  //"img/icons.svg#icon-heart-outlined"
  document
    .querySelector('.recipe__love use') //This selects the use child element inside of the recipe__love div
    .setAttribute('href', `img/icons.svg#${iconString}`); //This sets the href attribute according to the isLiked or not
};
export const toggleLikedMenu = numberOfLikes => {
  elements.likesMenu.style.visibility =
    numberOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
  const markup = `
  <li>
  <a class="likes__link" href="#${like.id}">
      <figure class="likes__fig">
          <img src="${like.img}" alt="${like.title}">
      </figure>
      <div class="likes__data">
          <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
          <p class="likes__author">${like.author}</p>
      </div>
  </a>
</li>
  `;
  elements.likesList.insertAdjacentHTML('beforeend', markup);
};
export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href="#${id}"]`)
    .parentElement;
  if (el) {
    el.parentElement.removeChild(el);
  }
};
