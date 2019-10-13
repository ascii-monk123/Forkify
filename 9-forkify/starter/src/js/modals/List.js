import uniqid from 'uniqid';
//This list will contain details about the recipe list which will be displayed on the cart
export default class List {
  constructor() {
    this.items = []; //This will be an array if item objects with item,id,unit etc.
  }
  //This function will make a new item to be displayed on the cart
  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(), //This function returns a unique id which we can use
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }
  deleteItem(id) {
    //This finds the index of the item which we want to delete
    const index = this.items.findIndex(ele => ele.id === id);
    //[2,4,8].splice(1,1)=>returns 4 and original array=[2,8]
    this.items.splice(index, 1);
  }
  //This method updates the count in the cart
  updateCount(id, newCount) {
    //This returns the required object in the items array and we give the count property a new count in it
    this.items.find(ele => ele.id === id).count = newCount;
  }
}
