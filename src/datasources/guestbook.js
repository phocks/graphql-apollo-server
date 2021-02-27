const { RESTDataSource } = require('apollo-datasource-rest');

class GuestbookAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://127.0.0.1:5984/';
  }

  async getAllPosts() {
    const response = await this.get('launches');
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }
}

module.exports = GuestbookAPI;