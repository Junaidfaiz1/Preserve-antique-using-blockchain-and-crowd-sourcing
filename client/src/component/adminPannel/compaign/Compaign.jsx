import React, { useState } from "react";
import { addCampaign } from "../../../utilities/interact";
import "./Compaign.css";

const AddCampaignForm = () => {
  const [campaign, setCampaign] = useState({
    campaignName: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    image: "",
    video: "",
  });

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCampaign({ ...campaign, image: e.target.files[0] });
  };

  const handleVideoChange = (e) => {
    setCampaign({ ...campaign, video: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the following campaign details:", campaign);

    try {
      const startDateTime = new Date(
        `${campaign.startDate}T${campaign.startTime}`
      ).getTime();
      const endDateTime = new Date(
        `${campaign.endDate}T${campaign.endTime}`
      ).getTime();

      // Extract file names from the paths
      const imageName = campaign.image.name;
      const videoName = campaign.video.name;

      await addCampaign({
        campaignName: campaign.campaignName,
        imageName: imageName,
        videoName: videoName,
        startDate: Math.floor(startDateTime / 1000),
        startTime: Math.floor(startDateTime / 1000),
        endDate: Math.floor(endDateTime / 1000),
        endTime: Math.floor(endDateTime / 1000),
      });
      alert("Campaign added successfully!");
    } catch (error) {
      console.error("Error adding campaign:", error);
      alert("Failed to add campaign.");
    }
  };

  return (
    <div className="container">
      <div className="compaign">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h3 className="text-center">Add Campaign</h3>
            <div className="col-md-12">
              <label htmlFor="campaign-name" style={{ marginLeft: "45px" }}>
                Campaign Name
              </label>
              <input
                style={{ width: "890px", marginLeft: "44px" }}
                type="text"
                placeholder="Enter Campaign Name"
                id="campaign-name"
                name="campaignName"
                value={campaign.campaignName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row" style={{ margin: "20px", padding: "10px" }}>
            <div className="col-md-6">
              <label htmlFor="start-date">Start Date</label>
              <input
                type="date"
                id="start-date"
                name="startDate"
                value={campaign.startDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="start-time">Start Time</label>
              <input
                type="time"
                id="start-time"
                name="startTime"
                value={campaign.startTime}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row" style={{ margin: "20px", padding: "10px" }}>
            <div className="col-md-6">
              <label htmlFor="end-date">End Date</label>
              <input
                type="date"
                id="end-date"
                name="endDate"
                value={campaign.endDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="end-time">End Time</label>
              <input
                type="time"
                id="end-time"
                name="endTime"
                value={campaign.endTime}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row" style={{ margin: "20px", padding: "10px" }}>
            <div className="col-md-6">
              <label htmlFor="campaign-image">Campaign Image</label>
              <input
                type="file"
                id="campaign-image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="campaign-video">Video</label>
              <input
                type="file"
                id="campaign-video"
                accept="video/*"
                onChange={handleVideoChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-dark"
            style={{ marginLeft: "345px", width: "300px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaignForm;
