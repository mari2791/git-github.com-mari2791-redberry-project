class ApiService {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async get(endpoint) {
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        this.checkResponse(response);
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow to handle it outside if needed
      }
    }
  
    async post(endpoint, data) {
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        this.checkResponse(response);
        return await response.json();
      } catch (error) {
        console.error('Error posting data:', error);
        throw error;
      }
    }
  
    async put(endpoint, data) {
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        this.checkResponse(response);
        return await response.json();
      } catch (error) {
        console.error('Error updating data:', error);
        throw error;
      }
    }
  
    async delete(endpoint) {
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          method: 'DELETE',
        });
        this.checkResponse(response);
        return await response.json();
      } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
      }
    }
  
    checkResponse(response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  }


  export default ApiService;