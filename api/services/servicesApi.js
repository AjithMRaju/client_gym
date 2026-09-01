import { apiRequest } from "../apiHandler";

export const servicesApi = {
  getServiceData: () => {
    return apiRequest("/services", "GET");
  },
};
