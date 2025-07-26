# ERC-3643 RWA Token System

A decentralized identity-validated token system with role-based access control and compliance checks.

---

## Project Overview

This system implements an ERC-3643-compliant token for real-world asset (RWA) tokenization with:

1. **On-chain identity validation**
2. **Role-based access control** 
3. **Compliance checks** 
4. **Restricted token transfers**


---

## Features


1. **Identity Registry** : Stores verified investor identities and eligibility                        
2. **Compliance Module** : Enforces country whitelists and KYC/AML rules                              
3. **RWA Asset Token**   : ERC-3643 token with restricted minting and compliance-checked transfers     
4. **Role Management**   : Issuer-only minting, Agent permissions, Investor restrictions              

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, ethers.js
- **Blockchain:** Ethereum, Solidity
- **Development:** Hardhat, OpenZeppelin
- **Testing:** MetaMask

---

## Getting Started

### 1. Clone Repository
```bash
git clone git@github.com:anjitha-0123/Technical_Task_023072025.git
```
## Hardhat
```
cd RyzerApp
```
```
cd Harhat
```
```
npm install
```
### To run hardhat
```
npx hardhat node
```
In another Terminal -to deploy
```
cd Hardhat
```
```
npx hardhat ignition deploy ignition/modules/RWAAssetModule.js --network sepolia
```
## UI
```
cd UI
```
```
npm run dev
````

