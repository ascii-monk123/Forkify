export default class Likes {
  constructor() {
    this.likes = []; //An array to store the like objects
  }
  addLike(id, title, author, img) {
    const like = { id, title, author, img }; //Id of the recipe we obtain from the API
    this.likes.push(like);
    //Persist data into local storage
    this.persistData();
    return like;
  }
  deleteLike(id) {
    const index = this.likes.findIndex(ele => ele.id === id);
    this.likes.splice(index, 1);
    //Persist data into local storage
    this.persistData();
  }
  isLiked(id) {
    return this.likes.findIndex(ele => ele.id === id) !== -1;
  }
  getNumLikes() {
    return this.likes.length;
  }
  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }
  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    //Restoring the likes from the local Storage
    if (storage) this.likes = storage; //To assign likes if there were alrady likes present
  }
}
