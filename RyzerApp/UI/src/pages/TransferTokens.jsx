import React, { useState } from "react";
import { ethers } from "ethers";

function TransferTokens({ rwaAssetToken, identityRegistry }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transferResult, setTransferResult] = useState("");

  const handleTransfer = async () => {
    if (!rwaAssetToken || !identityRegistry) {
      alert("Contracts not loaded. Please connect wallet.");
      return;
    }

    if (!recipient || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      
      // Check if recipient is verified (compliance check)
      const isVerified = await identityRegistry.isVerified(recipient);
      if (!isVerified) {
        throw new Error("Recipient is not verified");
      }

      // Perform transfer
      const tx = await rwaAssetToken.transfer(recipient, ethers.parseUnits(amount, 18));
      await tx.wait();
      
      alert("Tokens transferred successfully!");
      setRecipient("");
      setAmount("");
      setTransferResult("Transfer successful!");
    } catch (e) {
      if (e.code === 4001) {
        setTransferResult("Transaction rejected by user");
      } else {
        setTransferResult("Transfer failed: " + e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Transfer Tokens</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        className="border p-2 rounded w-full"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        disabled={loading}
      />
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 rounded w-full"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={handleTransfer}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full disabled:opacity-50"
        disabled={!rwaAssetToken || !identityRegistry || loading}
      >
        {loading ? "Transferring..." : "Transfer Tokens"}
      </button>
      {transferResult && (
        <div className="mt-2 text-sm p-2 rounded bg-gray-100">
          {transferResult}
        </div>
      )}
    </div>
  );
}

export default TransferTokens;