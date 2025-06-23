import { BaseService } from "./base.service";
// @ts-ignore
import serverConfig from "@/config/server.config.json";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Chạy trên trình duyệt
    return window.location.protocol === "https:"
      ? serverConfig.HTTPS_SERVER_URL
      : serverConfig.HTTP_SERVER_URL;
  } else {
    // Chạy trên server (Node.js)
    // Ưu tiên HTTPS nếu có, hoặc fallback về HTTP
    return process.env.PROTOCOL === "https"
      ? serverConfig.HTTPS_SERVER_URL
      : serverConfig.HTTP_SERVER_URL;
  }
}

export class SeoService extends BaseService {
  constructor() {
    super(getBaseUrl());
  }
  
}

export const seoService:SeoService = new SeoService();
