import React, { useState } from "react";

function InvestorOnboarding({ identityRegistry, complianceModule }) {
  const [user, setUser] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnboard = async () => {
    if (!identityRegistry || !complianceModule) {
      alert("Contracts not loaded. Please connect wallet.");
      return;
    }

    if (!user || !country) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      // Set identity as verified
      const tx1 = await identityRegistry.setIdentity(user, true, country);
      await tx1.wait();
      
      alert("Investor successfully onboarded!");
      setUser("");
      setCountry("");
    } catch (e) {
      if (e.code === 4001) {
        alert("Transaction rejected by user");
      } else {
        alert("Error onboarding investor: " + e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Onboard New Investor</h2>
      <input
        type="text"
        placeholder="Investor Address"
        className="border p-2 rounded w-full"
        value={user}
        onChange={e => setUser(e.target.value)}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Country"
        className="border p-2 rounded w-full"
        value={country}
        onChange={e => setCountry(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={handleOnboard}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full disabled:opacity-50"
        disabled={!identityRegistry || !complianceModule || loading}
      >
        {loading ? "Onboarding..." : "Onboard Investor"}
      </button>
    </div>
  );
}

export default InvestorOnboarding;