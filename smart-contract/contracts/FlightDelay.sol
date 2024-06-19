// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FlightDelay {
    address public owner;

    struct Payment {
        address payer;
        uint256 amount;
        bool isPayout;
    }

    Payment[] public payments;

    event InsurancePaid(address indexed payer, uint256 amount);
    event PayoutWithdrawn(address indexed recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function payForInsurance() public payable {
        require(msg.value > 0, "Payment must be greater than 0");

        payments.push(Payment({
            payer: msg.sender,
            amount: msg.value,
            isPayout: false
        }));

        emit InsurancePaid(msg.sender, msg.value);
    }

    function withdrawPayout(address payable recipient, uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance");

        payments.push(Payment({
            payer: recipient,
            amount: amount,
            isPayout: true
        }));

        recipient.transfer(amount);
        emit PayoutWithdrawn(recipient, amount);
    }

    receive() external payable {}
}
