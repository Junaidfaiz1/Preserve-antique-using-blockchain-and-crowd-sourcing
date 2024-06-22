import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCampaignById } from "../../utilities/interact.js";

function VideoPage() {
  const { id } = useParams();
  const [campaignDetails, setCampaignDetails] = useState(null);

  useEffect(() => {
    async function fetchCampaignDetails() {
      try {
        const campaign = await getCampaignById(id);
        setCampaignDetails(campaign);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    }

    fetchCampaignDetails();
  }, [id]);

  return (
    <div className="container-fluid">
      {campaignDetails && (
        <>
          <div className="row">
            <div className="col-12 text-center mt-5 mb-4">
              <h1>{campaignDetails.campaignName}</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10 col-md-8 col-lg-6">
              <video className="w-100" controls>
                <source
                  src={
                    process.env.PUBLIC_URL +
                    "/videos/" +
                    campaignDetails.videoName
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoPage;
