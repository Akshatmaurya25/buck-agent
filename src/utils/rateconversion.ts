import axios from 'axios';
import { formatEther, parseEther } from 'viem';

interface ConversionRates {
  usd: number;
  inr: number;
}

export class CurrencyConverter {
  private static async getETHPrices(): Promise<ConversionRates> {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,inr'
      );
      return response.data.ethereum;
    } catch (error) {
      console.error('Error fetching ETH prices:', error);
      throw new Error('Failed to fetch conversion rates');
    }
  }

  public static async convertETHToMultipleCurrencies(ethAmount: bigint) {
    try {
      const ethInDecimal = Number(formatEther(ethAmount));
      const rates = await this.getETHPrices();

      return {
        eth: ethInDecimal.toFixed(4),
        usdc: (ethInDecimal * rates.usd).toFixed(2),
        inr: (ethInDecimal * rates.inr).toFixed(2)
      };
    } catch (error) {
      console.error('Error converting currencies:', error);
      throw new Error('Currency conversion failed');
    }
  }

  public static formatCurrencyResponse(converted: {
    eth: string;
    usdc: string;
    inr: string;
  }) {
    return {
      eth: `${converted.eth} ETH`,
      usdc: `${converted.usdc} USDC`,
      inr: `₹${converted.inr}`
    };
  }
}

export default CurrencyConverter;