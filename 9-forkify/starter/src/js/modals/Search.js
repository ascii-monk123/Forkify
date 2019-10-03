import Axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getData() {
    const key = 'e2e11bf7792a898129b4bbe90d214578';
    try {
      const results = await Axios(
        `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
      );

      this.result = results.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
