import { publicClient } from "./client";

const apiClient = publicClient;

export const api = {
  createBooking: (payload) => apiClient.post("/bookings", payload),
  checkRoomAvailability: (payload) =>
    apiClient.post("/bookings/availability", payload),
  submitInquiry: (payload) => apiClient.post("/inquiries", payload),
  submitMeetingEnquiry: (payload) =>
    apiClient.post("/meeting-enquiries", payload),
  getCareers: () => apiClient.get("/careers"),
  applyToCareer: (careerId, payload) =>
    apiClient.post(`/careers/${careerId}/apply`, payload),
};

export const blogApi = {
  getCategories: () => apiClient.get("/blogs/categories/all"),
  getAll: (params) => apiClient.get("/blogs", { params }),
  getByIdentifier: (identifier) => apiClient.get(`/blogs/${identifier}`),
};

export const offerApi = {
  getAll: (params = {}) =>
    apiClient.get("/offers", { params: { onlyActive: true, ...params } }),
  getByIdentifier: (identifier) => apiClient.get(`/offers/${identifier}`),
  validateCode: (code) => apiClient.post("/offers/validate", { code }),
};

export default apiClient;
