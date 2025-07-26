import React, { useState } from "react";
import { ethers } from "ethers";

function MintAndCheck({ rwaAssetToken, identityRegistry }) {
  const [mintTo, setMintTo] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [checkUser, setCheckUser] = useState("");
  const [checkResult, setCheckResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (!rwaAssetToken) {
      alert("Contract not loaded. Please connect wallet.");
      return;
    }

    if (!mintTo || !mintAmount) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const tx = await rwaAssetToken.mint(mintTo, ethers.parseUnits(mintAmount, 18));
      await tx.wait();
      alert("Tokens minted successfully!");
      setMintTo("");
      setMintAmount("");
    } catch (e) {
      if (e.code === 4001) {
        alert("Transaction rejected by user");
      } else {
        alert("Error: " + e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = async () => {
    if (!identityRegistry) {
      alert("Contract not loaded. Please connect wallet.");
      return;
    }

    if (!checkUser) {
      alert("Please enter user address");
      return;
    }

    try {
      setLoading(true);
      const isVerified = await identityRegistry.isVerified(checkUser);
      const country = await identityRegistry.getCountry(checkUser);
      setCheckResult(`Verified: ${isVerified}, Country: ${country}`);
    } catch (e) {
      setCheckResult("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Mint Tokens (Issuer)</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        className="border p-2 rounded w-full"
        value={mintTo}
        onChange={e => setMintTo(e.target.value)}
        disabled={loading}
      />
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 rounded w-full"
        value={mintAmount}
        onChange={e => setMintAmount(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={handleMint}
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 w-full disabled:opacity-50"
        disabled={!rwaAssetToken || loading}
      >
        {loading ? "Minting..." : "Mint Tokens"}
      </button>

      <h2 className="text-xl font-bold mt-6 mb-2">Check User Identity</h2>
      <input
        type="text"
        placeholder="User Address"
        className="border p-2 rounded w-full"
        value={checkUser}
        onChange={e => setCheckUser(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={handleCheck}
        className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 w-full disabled:opacity-50"
        disabled={!identityRegistry || loading}
      >
        {loading ? "Checking..." : "Check User"}
      </button>
      <div className="mt-2 text-sm p-2 rounded bg-gray-100">
        {checkResult}
      </div>
    </div>
  );
}

export default MintAndCheck;