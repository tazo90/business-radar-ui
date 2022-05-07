import { createRouter } from "../create-router";
import { projectRouter } from "./api/project";
import { applicationRouter } from "./api/application";
import { consumerRouter } from "./api/consumer";
import { organizationRouter } from "./api/organization";

export const apiRouter = createRouter()
  //
  .merge("project.", projectRouter)
  .merge("application.", applicationRouter)
  .merge("consumer.", consumerRouter)
  .merge("organization.", organizationRouter);
