export interface TransactionConfig {
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, any>;
  customerId?: string;
}

export interface TransactionResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
