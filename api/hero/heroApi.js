import { apiRequest } from "../apiHandler";

export const LandingApi = {
  getHeroData: () => {
    return apiRequest("/hero", "GET");
  },
};
