import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import Navbar from "./components/Navbar";
import SetIdentity from "./pages/SetIdentity";
import WhitelistCountry from "./pages/WhitelistCountry";
import MintAndCheck from "./pages/MintAndCheck";
import TransferTokens from "./pages/TransferTokens"; 
import InvestorOnboarding from "./pages/InvestorOnboarding"; 

// Deployed contract addresses 
const identityRegistryAddress = "0x84D9407f7D6fed4D6498CFC8eCB03f82Eb680b03"; 
const complianceModuleAddress = "0x2649efDb7cF8F08Aeb48515fA12AEb6d7017B896"; 
const rwaAssetTokenAddress = "0x30A09DA66953E69dbEB6aA06CA52BcD017f66632"; 

// Contract ABIs 
import identityRegistryAbi from "./assets/IdentityRegistry.json";
import complianceModuleAbi from "./assets/ComplianceModule.json";
import rwaAssetTokenAbi from "./assets/RWAAssetToken.json";

function App() {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [identityRegistry, setIdentityRegistry] = useState();
  const [complianceModule, setComplianceModule] = useState();
  const [rwaAssetToken, setRwaAssetToken] = useState();

  // Wallet Connection and set contracts
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const _provider = new BrowserProvider(window.ethereum);
        await _provider.send("eth_requestAccounts", []);
        const _signer = await _provider.getSigner();
        
        setProvider(_provider);
        setSigner(_signer);
        setWalletAddress(_signer.address);

        const identityRegistryContract = new Contract(
          identityRegistryAddress, 
          identityRegistryAbi.abi, 
          _signer
        );
        const complianceModuleContract = new Contract(
          complianceModuleAddress, 
          complianceModuleAbi.abi, 
          _signer
        );
        const rwaAssetTokenContract = new Contract(
          rwaAssetTokenAddress, 
          rwaAssetTokenAbi.abi, 
          _signer
        );

        setIdentityRegistry(identityRegistryContract);
        setComplianceModule(complianceModuleContract);
        setRwaAssetToken(rwaAssetTokenContract);

      } catch (error) {
        console.error("Connection failed:", error);
        alert("Failed to connect wallet: " + error.message);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Pass contracts and wallet info as props to pages
  const contractProps = {
    walletAddress, 
    connectWallet,
    identityRegistry, 
    complianceModule, 
    rwaAssetToken,
  };

  return (
    <Router>
      <div className="bg-purple-800 min-h-screen">
        <Navbar walletAddress={walletAddress} connectWallet={connectWallet} />
        <div className="max-w-lg mx-auto p-4">
          <Routes>
            <Route path="/" element={<SetIdentity {...contractProps} />} />
            <Route path="/whitelist" element={<WhitelistCountry {...contractProps} />} />
            <Route path="/mint" element={<MintAndCheck {...contractProps} />} />
            <Route path="/transfer" element={<TransferTokens {...contractProps} />} />
            <Route path="/onboard" element={<InvestorOnboarding {...contractProps} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;