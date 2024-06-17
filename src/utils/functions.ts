export const accountString = (account) => {
  return account.slice(0, 6) + "..." + account.slice(-4);
};

// Define multipliers for different cabin classes
const multipliers = {
  Economy: 1.0,
  Business: 1.5,
  First: 2.0
};

/**
* Calculate the insurance payout based on cabin class, ticket price, and number of travelers.
*
* @param {number} ticketPrice - The price of a single plane ticket.
* @param {string} cabinClass - The cabin class ('Economy', 'Business', 'First').
* @param {number} numTravelers - The number of people traveling.
* @returns {number} - The calculated insurance payout.
*/
export function calculateInsurancePayout(ticketPrice, cabinClass, numTravelers) {
  // Validate the inputs
  if (!multipliers.hasOwnProperty(cabinClass)) {
      throw new Error('Invalid cabin class. Choose from Economy, Business, or First.');
  }
  if (ticketPrice <= 0 || numTravelers <= 0) {
      throw new Error('Ticket price and number of travelers must be greater than zero.');
  }

  // Calculate the payout
  const payout = ticketPrice * multipliers[cabinClass] * numTravelers;
  return payout;
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
