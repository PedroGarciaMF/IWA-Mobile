import axios from 'axios';
import '../Global.js';

const ProductsService = {
  getProducts: async function(limit = 50) {
    console.log(`ProductService::getProducts: retrieving ${limit} products`);
    try {
      const response = await axios.get(`${global.API_BASE}/products?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.log(`ProductService::getProducts: ${error}`);
    }
  },

  getProduct: async function (pid = '') {
    console.log(`ProductService::getProducts: retrieving product id: ${pid}`);
    try {
      const response = await axios.get(`${global.API_BASE}/products/${pid}`);
      return response.data;
    } catch (error) {
      console.log(`ProductService::getProduct: ${error}`);
    }
  },
};

export default ProductsService;
