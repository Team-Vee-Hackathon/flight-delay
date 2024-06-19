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
