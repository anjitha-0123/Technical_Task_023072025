const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RWAAssetModule1", (m) => {
  // 1. Deploy IdentityRegistry (no constructor args)
  const identityRegistry = m.contract("IdentityRegistry");

  // 2. Deploy ComplianceModule, passing the address of IdentityRegistry
  const complianceModule = m.contract("ComplianceModule", [identityRegistry]);

  // 3. Deploy RWAAssetToken, passing the address of ComplianceModule
  const rwaAssetToken = m.contract("RWAAssetToken", [complianceModule]);

  // Return all contracts for access in tests/scripts
  return { identityRegistry, complianceModule, rwaAssetToken };
});