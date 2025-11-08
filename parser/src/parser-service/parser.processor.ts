import type { Job } from "bullmq";

import axios from "axios";

import type { GetAnalyzeData } from "./types/analyze.types";
import { DI } from "../main";
import config from "../config";

export const forceStart = async (job: Job<any, any>) => {
  const chatId = job.data.chatId;
  const message = job.data.message;
  const payload = {
    chatId,
    message,
    stream: false,
  };

  const response = await axios.post(config.external.chat.url, payload, {
    headers: {
      Authorization: `${config.external.chat.token}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  const result = response.data;
  DI.parserQueue.addJob("done_analyse", result);
};
