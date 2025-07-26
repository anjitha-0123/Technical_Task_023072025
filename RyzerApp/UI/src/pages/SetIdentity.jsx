import React, { useState } from "react";

function SetIdentity({ identityRegistry }) {
  const [user, setUser] = useState("");
  const [country, setCountry] = useState("");
  const [verified, setVerified] = useState("true");

  const handleSetIdentity = async () => {
    try {
      const tx = await identityRegistry.setIdentity(user, verified === "true", country);
      await tx.wait();
      alert("Identity set!");
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Set Identity (Admin)</h2>
      <input
        type="text"
        placeholder="User Address"
        className="border p-2 rounded w-full"
        value={user}
        onChange={e => setUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country"
        className="border p-2 rounded w-full"
        value={country}
        onChange={e => setCountry(e.target.value)}
      />
      <select
        className="border p-2 rounded w-full"
        value={verified}
        onChange={e => setVerified(e.target.value)}
      >
        <option value="true">Verified</option>
        <option value="false">Not Verified</option>
      </select>
      <button
        onClick={handleSetIdentity}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
        disabled={!identityRegistry}
      >
        Set Identity
      </button>
    </div>
  );
}

export default SetIdentity;