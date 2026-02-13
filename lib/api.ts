import { Publive } from "publive-cms-sdk";

export class APIService {
  private readonly publive: Publive;
  
  constructor() {
    // Safely access environment variables with fallbacks
    const environment = process.env.NEXT_PUBLIC_PL_ENVIRONMENT || "development";
    const publisherId = parseInt(process.env.NEXT_PUBLIC_PL_PUBLISHER_ID || "1");
    const apiKey = process.env.NEXT_PUBLIC_PL_PUBLISHER_API_KEY as string;
    const apiSecret = process.env.NEXT_PUBLIC_PL_PUBLISHER_API_SECRET as string;
    try {
      this.publive = new Publive({
        environment: environment as "development" | "beta" | "production",
        publisherId: publisherId,
        apiKey: apiKey,
        apiSecret: apiSecret,
      });
    } catch (error) {
      console.error('Failed to initialize Publive SDK:', error);
      throw new Error('Failed to initialize API service');
    }
  }

  getSDK() {
    if (!this.publive) {
      throw new Error('Publive SDK not initialized');
    }
    return this.publive;
  }
}