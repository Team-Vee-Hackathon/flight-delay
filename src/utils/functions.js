import axios from "axios";

export const accountString = (account) => {
  return account.slice(0, 6) + "..." + account.slice(-4);
};

// // Define multipliers for different cabin classes
// const multipliers: any = {
//   "economy": 0.1, //6h
//   "business": 0.25, //12h
//   "first": 0.4 //24h
// };

/**
* Calculate the insurance payout based on cabin class, ticket price, and number of travelers.
*
* @param {number} ticketPrice - The price of a single plane ticket.
* @param {string} cabinClass - The cabin class ('Economy', 'Business', 'First').
* @param {number} numTravelers - The number of people traveling.
* @returns {number} - The calculated insurance payout.
*/
export function calculateInsurancePayout(ticketPrice, cabinClass, numTravelers) {
  if (ticketPrice <= 0 || numTravelers <= 0) {
    throw new Error('Ticket price and number of travelers must be greater than zero.');
  }
  switch (cabinClass) {
    case "economy":
      return (ticketPrice * 0.1 * numTravelers).toFixed(2);
    case "business":
      return (ticketPrice * 0.25 * numTravelers).toFixed(2);
    case "first":
      return (ticketPrice * 0.4 * numTravelers).toFixed(2);
    default:
      throw new Error('Invalid cabin class. Choose from Economy, Business, or First.');
  }

}

// Example usage:
// try {
//   const ticketPrice = 500; // Example ticket price
//   const cabinClass = 'Business'; // Example cabin class
//   const numTravelers = 3; // Example number of travelers

//   const payout = calculateInsurancePayout(ticketPrice, cabinClass, numTravelers);
//   console.log(`The insurance payout is: $${payout.toFixed(2)}`);
// } catch (error) {
//   console.error(error.message);
// }


const getEthPriceInUSD = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'ethereum',
        vs_currencies: 'usd'
      }
    });
    return response.data.ethereum.usd;
  } catch (error) {
    console.error('Error fetching ETH price in USD:', error);
    throw error;
  }
};


const getGHSRateInUSD = async () => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/GHS');
    return response.data.rates.USD;
  } catch (error) {
    console.error('Error fetching GHS rate in USD:', error);
    throw error;
  }
};
let gEthPriceInUSD = null
let gGhsRateInUSD = null
export const convertGhsToEth = async (ghsAmount) => {
  try {
    if (gEthPriceInUSD == null && gGhsRateInUSD == null) {
      const [ethPriceInUSD, ghsRateInUSD] = await Promise.all([getEthPriceInUSD(), getGHSRateInUSD()]);
      gEthPriceInUSD = ethPriceInUSD
      gGhsRateInUSD = ghsRateInUSD
    }
    const usdAmount = ghsAmount * gGhsRateInUSD;
    const ethAmount = usdAmount / gEthPriceInUSD;
    return ethAmount;
  } catch (error) {
    console.error('Error converting GHS to ETH:', error);
    throw error;
  }
};

export const convertUsdToEth = async (usdAmount) => {
  try {
    const ethPriceInUSD = await getEthPriceInUSD();
    const ethAmount = usdAmount / ethPriceInUSD;
    return ethAmount;
  } catch (error) {
    console.error('Error converting USD to ETH:', error);
    throw error;
  }
};


