// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ComplianceModule.sol";

contract RWAAssetToken is ERC20, AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    ComplianceModule public compliance;

    constructor(address _compliance)
        ERC20("RWA Token", "RWA")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
        compliance = ComplianceModule(_compliance);
    }

    function mint(address to, uint256 amount) external onlyRole(ISSUER_ROLE) {
        require(compliance.isTransferAllowed(msg.sender, to), "Not compliant");
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 amount)
        internal override
    {
        super._update(from, to, amount);

        if (from != address(0) && to != address(0)) {
            require(compliance.isTransferAllowed(from, to), "Transfer not compliant");
        }
    }
}
