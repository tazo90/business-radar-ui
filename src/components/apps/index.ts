import StoresApp from "./stores";
import JobsApp from "./jobs";
import { ApplicationType } from "@prisma/client";

export default {
  stores: {
    app: StoresApp,
    type: ApplicationType.STORES,
    description: 'Stores locator'
  },
  jobs: {
    app: JobsApp,
    type: ApplicationType.JOBS,
    description: 'Jobs locator'
  },
  ecommerce: {
    app: null,
    type: ApplicationType.ECOMMERCE,
    description: 'Ecommerce locator'
  }
};
