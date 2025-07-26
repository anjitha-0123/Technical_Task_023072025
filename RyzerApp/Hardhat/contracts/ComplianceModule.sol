// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./IdentityRegistry.sol";

contract ComplianceModule {
    IdentityRegistry public identityRegistry;
    mapping(string => bool) public whitelistedCountries;

    constructor(address _identityRegistry) {
        identityRegistry = IdentityRegistry(_identityRegistry);
    }

    function setWhitelistedCountry(string memory country, bool status) public {
        // Add role check if needed
        whitelistedCountries[country] = status;
    }

    function isTransferAllowed(address from, address to) external view returns (bool) {
        return identityRegistry.isVerified(from) &&
               identityRegistry.isVerified(to) &&
               whitelistedCountries[identityRegistry.getCountry(to)];
    }
}
