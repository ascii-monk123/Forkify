export default class Likes {
  constructor() {
    this.likes = []; //An array to store the like objects
  }
  addLike(id, title, author, img) {
    const like = { id, title, author, img }; //Id of the recipe we obtain from the API
    this.likes.push(like);
    return like;
  }
  deleteLike(id) {
    const index = this.likes.findIndex(ele => ele.id === id);
    this.likes.splice(index, 1);
  }
  isLiked(id) {
    return this.likes.findIndex(ele => ele.id === id) !== -1;
  }
  getNumLikes() {
    return this.likes.length;
  }
}
