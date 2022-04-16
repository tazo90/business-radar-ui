const ORGANIZATIONS_API = {
  ORGANIZATIONS: {
    LIST: "/organizations",
    DETAIL: "/organizations/:org",
    STORE_LIST: "/organizations/:org/stores",
    STORE_DETAIL: "/organizations/:org/stores",
  },
};

export const API_ENDPOINTS = {
  JOBS: "/jobs/",
  CUSTOMER: {
    BRANDS: "/customer/brands",
    COUNTRIES: "/customer/countries",
  },
  CATEGORIES: "/categories-kfc.json",
  ...ORGANIZATIONS_API,
};
