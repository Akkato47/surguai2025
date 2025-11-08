import type { GetAnalyzeData } from "./types/analyze.types";

import { DI } from "../main";
import { getAnalyze } from "./ml.processor";

const registerWorkers = () =>
  DI.workerRouter.add<GetAnalyzeData, any>({
    prefix: "ml_analyze",
    func: getAnalyze,
  });

export { registerWorkers };
