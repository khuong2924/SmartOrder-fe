import axios from 'axios';
import { API_CONFIG } from './apiConfig';

const API_URL = API_CONFIG.DOMAIN2_API_URL;

export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/menuItems`);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const fetchCategories = async () => {

  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data.map(category => category.name);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to mock data if API fails
    return [
      'Khai vị',
      'Món chính',
      'Tráng miệng',
      'Đồ uống'
    ];
  }
};

// Helper function to transform API data to match the expected format in the app
export const transformMenuItems = (apiMenuItems) => {
  return apiMenuItems.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.categoryName,
    image: item.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWFxirpXQpbMIJJKsVkJdosxGdy3oyQHYEA&s', 
    preparationTime: item.preparationTime
  }));
};