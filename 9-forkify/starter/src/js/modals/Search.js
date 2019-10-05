import Axios from 'axios';
import { key } from '../config';
export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getData() {
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
