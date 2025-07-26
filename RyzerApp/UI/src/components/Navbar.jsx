import React from "react";
import { Link } from "react-router-dom";

function Navbar({ walletAddress, connectWallet }) {
  return (
    <nav className="flex justify-between items-center bg-black shadow p-4 mb-6">
      <div className="flex">
        <Link to="/" className="text-gray-300 font-semibold hover:underline ml-4">Set Identity</Link>
        <Link to="/whitelist" className="text-gray-300 font-semibold hover:underline ml-6">Whitelist Country</Link>
        <Link to="/mint" className="text-gray-300 font-semibold hover:underline ml-6">Mint & Check</Link>
        <Link to="/transfer" className="text-gray-300 font-semibold hover:underline ml-6">Transfer</Link>
        <Link to="/onboard" className="text-gray-300 font-semibold hover:underline ml-6">Onboard Investor</Link>
      </div>
      <div>
        {walletAddress ? (
          <span className="text-sm text-gray-600">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        ) : (
          <button onClick={connectWallet} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;