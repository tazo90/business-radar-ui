import { createRouter } from "../create-router";
import { projectRouter } from "./api/project";

export const apiRouter = createRouter().merge("project.", projectRouter);
