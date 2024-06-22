import React, { useEffect, useState } from "react";
import {
  viewAllCampaigns,
  removeCampaign,
} from "../../../utilities/interact.js";
import './ShowCompaign.css'


const ShowCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const campaignsData = await viewAllCampaigns();
        setCampaigns(campaignsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  const handleRemoveCampaign = async (campaignId) => {
    try {
      await removeCampaign(campaignId);
      const updatedCampaigns = campaigns.filter(
        (campaign) => campaign.campaignId !== campaignId
      );
      setCampaigns(updatedCampaigns);
    } catch (error) {
      console.error("Error removing campaign:", error);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000); // Convert BigInt to number
    return date.toLocaleString();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="ShowCompaign">
          <h2 className="text-center mt-5 mb-3">Campaigns</h2>
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Campaign Name</th>
                  <th scope="col">Start Date & Time</th>
                  <th scope="col">End Date & Time</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.campaignId}>
                    <td>{campaign.campaignId}</td>
                    <td>{campaign.campaign.campaignName}</td>
                    <td>{formatDateTime(campaign.campaign.startDate)}</td>
                    <td>{formatDateTime(campaign.campaign.endDate)}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleRemoveCampaign(campaign.campaignId)
                        }
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCampaign;
