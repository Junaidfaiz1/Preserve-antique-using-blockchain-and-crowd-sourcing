import React, { useState, useEffect } from "react";
import { viewAllCampaigns } from "../../utilities/interact";
import Poster from "../Poster/Poster";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const fetchedCampaigns = await viewAllCampaigns();
        setCampaigns(fetchedCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    }

    fetchCampaigns();

    const timer = setInterval(fetchCampaigns, 60000); // Fetch campaigns every minute
    return () => clearInterval(timer);
  }, []);

  const currentDate = new Date();

  const handleClick = (campaignId, startDate, endDate) => {
    const startTime = new Date(Number(startDate) * 1000);
    const endTime = new Date(Number(endDate) * 1000);

    if (currentDate < startTime) {
      const timeToStart = startTime - currentDate;
      const days = Math.floor(timeToStart / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeToStart % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeToStart % (1000 * 60)) / 1000);

      alert(
        `Campaign has not started yet. Starts in: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );
    } else if (currentDate > endTime) {
      alert("Campaign has already ended.");
    } else {
      // Redirect to campaign page
      // You can use window.location.href or react-router-dom's history.push method here
      // Example:
      // window.location.href = `/VideoPage/${campaignId}`;
      // or
      // history.push(`/VideoPage/${campaignId}`);
    }
  };

  return (
    <>
      <Poster />
      <div className="container">
        <h1
          className="mt-5 mb-4 text-center"
          style={{
            fontFamily: "cursive",
            width: "100%",
            textDecoration: "underline",
          }}
        >
          Journey Through Times
        </h1>
        <div className="row">
          {campaigns.map(({ campaignId, campaign }) => {
            const startDate = new Date(Number(campaign.startDate) * 1000);
            const endDate = new Date(Number(campaign.endDate) * 1000);

            return (
              <div className="col-lg-4 mb-4" key={campaignId}>
                <div className="card">
                  {currentDate < startDate || currentDate > endDate ? (
                    <div
                      className="card-img-top"
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleClick(
                          campaignId,
                          campaign.startDate,
                          campaign.endDate
                        )
                      }
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/" +
                          campaign.imageName
                        }
                        alt={campaign.campaignName}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  ) : (
                    <Link
                      to={`/VideoPage/${campaignId}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/" +
                          campaign.imageName
                        }
                        className="card-img-top"
                        alt={campaign.campaignName}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  )}
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {campaign.campaignName}
                    </h5>
                    {currentDate <= endDate ? (
                      <p className="card-text text-center">
                        Ended in:{" "}
                        {Math.floor(
                          (endDate - currentDate) / (1000 * 60 * 60 * 24)
                        )}{" "}
                        days,{" "}
                        {Math.floor(
                          ((endDate - currentDate) % (1000 * 60 * 60 * 24)) /
                            (1000 * 60 * 60)
                        )}{" "}
                        hours,{" "}
                        {Math.floor(
                          ((endDate - currentDate) % (1000 * 60 * 60)) /
                            (1000 * 60)
                        )}{" "}
                        minutes,{" "}
                        {Math.floor(
                          ((endDate - currentDate) % (1000 * 60)) / 1000
                        )}{" "}
                        seconds
                      </p>
                    ) : (
                      <p className="card-text text-center">
                        Campaign has ended
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Campaigns;
