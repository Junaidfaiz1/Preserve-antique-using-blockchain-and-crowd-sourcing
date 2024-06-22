// Import Web3
import Web3 from "web3";
// Import Contract Artifacts
import UserManagementArtifact from "../Contracts/UserManagement.json";
import AntiqueDegitizeArtifact from "../Contracts/AntiqueDegitize.json";
import CrowdCampaign from "../Contracts/CrowdCampaign.json";

// const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the default provider or a local one
const web3 = new Web3(window.ethereum);
const accounts = await web3.eth.getAccounts(); // Get a list of accounts on the network

// Configuration object
const config = {
  web3Provider: "http://127.0.0.1:7545",
  userManagementContractAddress: "0xb30e5a0Dd42D1Aed4C569D7A92Ae312002e1D50F",
  antiqueDegitizeContractAddress: "0xe830CBB2c0799dF7cBA3DD2656Ea2a14B0B6f050",
  crowdCompaignContractAddress: "0x498EEFf1A1fd41289f30Aaa89517A96Cc3d72d53",
};

// Initialize contract instances
const userManagementContract = new web3.eth.Contract(
  UserManagementArtifact.abi,
  config.userManagementContractAddress
);

const CrowdCampaignContract = new web3.eth.Contract(
  CrowdCampaign.abi,
  config.crowdCompaignContractAddress
);

const antiqueDegitizeContract = new web3.eth.Contract(
  AntiqueDegitizeArtifact.abi,
  config.antiqueDegitizeContractAddress
);

// Function to connect wallet
export const connectWallet = async () => {
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

  return provider;
};

// User Management Contract Interactions
export async function registerUser(userName, email, phoneNumber, password) {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const userAddress = accounts[0];

    // Disconnect current account
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [{ eth_accounts: [] }],
    });

    // Request new account selection
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const gasEstimate = await userManagementContract.methods
      .registerUser(userName, email, phoneNumber, password)
      .estimateGas({ from: userAddress });

    await userManagementContract.methods
      .registerUser(userName, email, phoneNumber, password)
      .send({ from: userAddress, gas: gasEstimate });
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  return userManagementContract.methods
    .login(email, password)
    .call({ from: accounts[0] });
}

// Antique Degitize Contract Interactions
export async function uploadAntique({
  antiqueName,
  category,
  description,
  imageName,
}) {
  try {
    const contract = new web3.eth.Contract(
      AntiqueDegitizeArtifact.abi,
      config.antiqueDegitizeContractAddress
    );
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await contract.methods
      .uploadAntique(antiqueName, category, description, imageName)
      .estimateGas({ from: accounts[0] });

    await contract.methods
      .uploadAntique(antiqueName, category, description, imageName)
      .send({ from: accounts[0], gas: gasEstimate });
  } catch (error) {
    console.error("Error uploading antique:", error);
    throw error;
  }
}

export async function updateAntique(
  id,
  name,
  category,
  description,
  imageName
) {
  try {
    const contract = new web3.eth.Contract(
      AntiqueDegitizeArtifact.abi,
      config.antiqueDegitizeContractAddress
    );
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await contract.methods
      .updateAntique(id, name, category, description, imageName)
      .estimateGas({ from: accounts[0] });

    await contract.methods
      .updateAntique(id, name, category, description, imageName)
      .send({ from: accounts[0], gas: gasEstimate });
  } catch (error) {
    console.error("Error updating antique:", error);
    throw error;
  }
}

export async function removeAntique(antiqueId) {
  const accounts = await web3.eth.getAccounts();
  await antiqueDegitizeContract.methods
    .removeAntique(antiqueId)
    .send({ from: accounts[0] });
}

export const getAntiques = async () => {
  try {
    return await antiqueDegitizeContract.methods
      .getAntiques()
      .call()
      .then((result) => {
        return result;
      });
  } catch (error) {
    console.error("Error fetching total antiques:", error);
    throw error; // Re-throw the error to handle it appropriately in the component or wherever it's called
  }
};

export async function getAntiquesByCategory(category) {
  return antiqueDegitizeContract.methods.getAntiquesByCategory(category).call();
}

export const getAntiqueCategories = async () => {
  const contract = new web3.eth.Contract(
    AntiqueDegitizeArtifact.abi,
    config.antiqueDegitizeContractAddress
  );
  return await contract.methods
    .getAntiqueCategories()
    .call()
    .then((result) => {
      return result;
    });
};

export const getTotalAntiques = async () => {
  try {
    return await antiqueDegitizeContract.methods
      .getTotalAntiques()
      .call()
      .then((result) => {
        return result;
      });
  } catch (error) {
    console.error("Error fetching total antiques:", error);
    throw error;
  }
};

export async function getAntiqueById(id) {
  try {
    const antique = await antiqueDegitizeContract.methods
      .getAntiqueById(id)
      .call();
    return antique; // Ensure that antique is returned directly without wrapping in an array
  } catch (error) {
    console.error("Error fetching antique by ID:", error);
    throw error;
  }
}

export async function searchAntique(searchTerm) {
  try {
    return await antiqueDegitizeContract.methods
      .searchAntique(searchTerm)
      .call()
      .then((result) => {
        return result;
      });
  } catch (error) {
    console.error("Error searching for antique:", error);
    throw error;
  }
}

// for search function
// const searchTerm = "vase"; // or any other search term
// const matchingAntiques = await searchAntique(searchTerm);
// console.log("Matching antiques:", matchingAntiques);

// User Management Contract Interactions

export async function getUserByEmail(email) {
  try {
    return await userManagementContract.methods
      .getUserByEmail(email)
      .call({ from: accounts[0] });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

// Interaction file

export async function getUserById(userId) {
  try {
    return await userManagementContract.methods
      .getUserById(userId)
      .call({ from: accounts[0] });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}
export async function viewAllUsers() {
  try {
    return await userManagementContract.methods
      .viewAllUsers()
      .call({ from: accounts[0] });
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export async function addCampaign(campaignDetails) {
  try {
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await CrowdCampaignContract.methods
      .addCampaign(
        campaignDetails.campaignName,
        campaignDetails.imageName,
        campaignDetails.videoName,
        campaignDetails.startDate,
        campaignDetails.startTime,
        campaignDetails.endDate,
        campaignDetails.endTime
      )
      .estimateGas({ from: accounts[0] });

    await CrowdCampaignContract.methods
      .addCampaign(
        campaignDetails.campaignName,
        campaignDetails.imageName,
        campaignDetails.videoName,
        campaignDetails.startDate,
        campaignDetails.startTime,
        campaignDetails.endDate,
        campaignDetails.endTime
      )
      .send({ from: accounts[0], gas: gasEstimate });
  } catch (error) {
    console.error("Error adding campaign:", error);
    throw error;
  }
}

export async function removeCampaign(campaignId) {
  try {
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await CrowdCampaignContract.methods
      .removeCampaign(campaignId)
      .estimateGas({ from: accounts[0] });

    await CrowdCampaignContract.methods
      .removeCampaign(campaignId)
      .send({ from: accounts[0], gas: gasEstimate });
  } catch (error) {
    console.error("Error removing campaign:", error);
    throw error;
  }
}

export async function viewAllCampaigns() {
  try {
    const totalCampaigns = await CrowdCampaignContract.methods
      .totalCampaigns()
      .call({ from: accounts[0] });

    const campaignList = [];

    for (let i = 0; i < totalCampaigns; i++) {
      const campaignId = i;
      const campaign = await CrowdCampaignContract.methods
        .getCampaignById(i)
        .call({ from: accounts[0] });

      campaignList.push({ campaignId, campaign });
    }

    return campaignList;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
}

export async function getCampaignById(campaignId) {
  return CrowdCampaignContract.methods
    .getCampaignById(campaignId)
    .call({ from: accounts[0] });
}

export async function getVideoNameIfCampaignStarted(campaignId) {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    const campaign = await getCampaignById(campaignId);

    if (currentTime < campaign.startDate + campaign.startTime) {
      throw new Error("Campaign has not started yet.");
    }

    if (currentTime > campaign.endDate + campaign.endTime) {
      throw new Error("Campaign has ended.");
    }

    return campaign.videoName;
  } catch (error) {
    console.error("Error fetching video name for campaign:", error);
    throw error;
  }
}
