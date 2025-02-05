import { GoatSDK, TransactionConfig } from '@goat-sdk/core';

export class GoatService {
  private goatSDK: GoatSDK;

  constructor(apiKey: string) {
    this.goatSDK = new GoatSDK({
      apiKey,
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
    });
  }

  async createTransaction(transactionData: TransactionConfig) {
    try {
      const transaction = await this.goatSDK.transactions.create(transactionData);
      return transaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async getTransaction(transactionId: string) {
    try {
      const transaction = await this.goatSDK.transactions.get(transactionId);
      return transaction;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }

  async updateTransaction(transactionId: string, updateData: Partial<TransactionConfig>) {
    try {
      const transaction = await this.goatSDK.transactions.update(transactionId, updateData);
      return transaction;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  }

  async cancelTransaction(transactionId: string) {
    try {
      const result = await this.goatSDK.transactions.cancel(transactionId);
      return result;
    } catch (error) {
      console.error('Error canceling transaction:', error);
      throw error;
    }
  }
}
