export const goatConfig = {
  apiKey: process.env.GOAT_API_KEY || '',
  webhookSecret: process.env.GOAT_WEBHOOK_SECRET || '',
  maxRetries: 3,
  timeout: 30000, // 30 seconds
};
