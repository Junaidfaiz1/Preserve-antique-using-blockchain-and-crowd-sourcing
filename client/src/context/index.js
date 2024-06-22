import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";
const metmaskContext = createContext();

export const MetmaskContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState("");
  

  const connectAccount = async () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
      try {
        console.log("Ethereum successfully detected!");
        await provider.request({ method: "eth_requestAccounts" });
        const accounts = await provider.request({ method: "eth_accounts" });
        console.log("Connected account:", accounts[0]);
      } catch {
        console.error("User is not allowed");
      }
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else if (!process.env.production) {
      provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    console.log("provider", provider);

    if (provider) {
      const accounts = await provider.request({ method: "eth_accounts" });
      setAccounts(accounts[0]);
    }
    return provider;
  };

  useEffect(() => {
    if (window.ethereum) {
      connectAccount();
    }
    // eslint-disable-next-line
  }, [window.ethereum]);
  window.ethereum.on("accountsChanged", (accounts) => {
    setAccounts(accounts[0] ? accounts[0] : "");
  });

  return (
    <metmaskContext.Provider value={{ connectAccount, accounts }}>
      {children}
    </metmaskContext.Provider>
  );
};

export default metmaskContext;
