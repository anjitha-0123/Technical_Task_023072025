import React, { useState } from "react";

function WhitelistCountry({ complianceModule }) {
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("true");

  const handleWhitelist = async () => {
    try {
      const tx = await complianceModule.setWhitelistedCountry(country, status === "true");
      await tx.wait();
      alert("Whitelist updated!");
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Whitelist Country</h2>
      <input
        type="text"
        placeholder="Country"
        className="border p-2 rounded w-full"
        value={country}
        onChange={e => setCountry(e.target.value)}
      />
      <select
        className="border p-2 rounded w-full"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="true">Whitelist</option>
        <option value="false">Remove</option>
      </select>
      <button
        onClick={handleWhitelist}
        className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 w-full"
        disabled={!complianceModule}
      >
        Set Whitelist
      </button>
    </div>
  );
}

export default WhitelistCountry;