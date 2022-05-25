const ORGANIZATIONS_API = {
  ORGANIZATIONS: {
    LIST: "/organizations",
    DETAIL: "/organizations/:org",
    BRANDS: "/organizations/:org/brands",
    COUNTRIES: "/organizations/:org/countries",
    STORES: "/organizations/:org/stores",
    STORE: "/organizations/:org/stores/:store",
    STORE_JOBS: "/organizations/:org/stores/:store/jobs",
    JOBS: "/organizations/:org/jobs",
    JOB: "/organizations/:org/jobs/:job",
  },
};

export const API_ENDPOINTS = {
  CATEGORIES: "/categories-kfc.json",
  ...ORGANIZATIONS_API,
};
