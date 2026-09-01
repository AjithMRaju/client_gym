import { apiRequest } from "../apiHandler";

export const AboutApi = {
  getAbout: () => {
    return apiRequest("/about", "GET");
  },
};
