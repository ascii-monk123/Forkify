import { elements } from './base';

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
