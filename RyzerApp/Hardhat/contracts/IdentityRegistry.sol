// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract IdentityRegistry {
    address public admin;

    struct Identity {
        bool isVerified;
        string country;
    }

    mapping(address => Identity) public identities;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setIdentity(address user, bool verified, string memory country) external onlyAdmin {
        identities[user] = Identity(verified, country);
    }

    function isVerified(address user) external view returns (bool) {
        return identities[user].isVerified;
    }

    function getCountry(address user) external view returns (string memory) {
        return identities[user].country;
    }
}
