import { Goat } from '@goatfi/sdk';
import { goatConfig } from '../config/goat.config';

export class WalletService {
  private goat: Goat;

  constructor() {
    this.goat = new Goat({
      apiKey: goatConfig.apiKey,
    });
  }

  async getWalletBalance(): Promise<number> {
    try {
      const balance = await this.goat.wallet.getBalance();
      return balance;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      throw error;
    }
  }
}
