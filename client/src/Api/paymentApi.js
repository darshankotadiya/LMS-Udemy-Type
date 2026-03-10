import api from './config.js';

// Direct course purchase / enrollment
export const purchaseCourse = async (courseId) => {
  try {
    const response = await api.post(`/payment/purchase/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Purchase course error:', error);
    throw error;
  }
};
