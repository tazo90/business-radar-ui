export * from "./base-marker";
import { drawStoreMarker } from "./store-marker";
import { drawJobMarker } from "./job-marker";
import { drawSummaryMarker } from "./summary-marker";

export default {
  jobMarker: drawJobMarker,
  storeMarker: drawStoreMarker,
  summaryMarker: drawSummaryMarker,
};
