var CrowdCampaign = artifacts.require("CrowdCampaign");

module.exports = function (deployer) {
  deployer.deploy(CrowdCampaign);
};
