const FlightDelayInsurance = artifacts.require("FlightDelayInsurance");

module.exports = function (deployer) {
  deployer.deploy(FlightDelayInsurance);
};
