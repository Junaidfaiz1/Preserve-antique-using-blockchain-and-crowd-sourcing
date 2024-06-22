// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdCampaign {
    struct Campaign {
        string campaignName;
        string imageName;
        string videoName;
        uint256 startDate;
        uint256 startTime;
        uint256 endDate;
        uint256 endTime;
        bool isActive;
    }

    address public admin;
    uint256 public totalCampaigns;
    mapping(uint256 => Campaign) public campaignsById;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action.");
        _;
    }

    event CampaignAdded(uint256 campaignId);
    event CampaignRemoved(uint256 campaignId);

    constructor() {
        admin = msg.sender;
    }

    function addCampaign(
        string memory _campaignName,
        string memory _imageName,
        string memory _videoName,
        uint256 _startDate,
        uint256 _startTime,
        uint256 _endDate,
        uint256 _endTime
    ) public onlyAdmin {
        require(_startDate + _startTime < _endDate + _endTime, "The end date and time must be after the start date and time.");

        campaignsById[totalCampaigns] = Campaign({
            campaignName: _campaignName,
            imageName: _imageName,
            videoName: _videoName,
            startDate: _startDate,
            startTime: _startTime,
            endDate: _endDate,
            endTime: _endTime,
            isActive: true
        });

        emit CampaignAdded(totalCampaigns);
        totalCampaigns++;
    }

    function removeCampaign(uint256 _campaignId) public onlyAdmin {
        require(_campaignId < totalCampaigns, "Campaign does not exist.");

        // Shift the campaigns after the removed campaign one position backward
        for (uint256 i = _campaignId; i < totalCampaigns - 1; i++) {
            campaignsById[i] = campaignsById[i + 1];
        }

        // Delete the last campaign (since it has been shifted)
        delete campaignsById[totalCampaigns - 1];

        // Decrement totalCampaigns
        totalCampaigns--;

        emit CampaignRemoved(_campaignId);
    }

    function getCampaignById(uint256 _campaignId) public view returns (Campaign memory) {
        require(_campaignId < totalCampaigns, "Campaign does not exist.");
        return campaignsById[_campaignId];
    }

    function viewCampaigns() external view returns (CampaignWithId[] memory) {
        CampaignWithId[] memory campaignList = new CampaignWithId[](totalCampaigns);

        for (uint256 i = 0; i < totalCampaigns; i++) {
            campaignList[i].campaignId = i;
            campaignList[i].campaign = campaignsById[i];
        }

        return campaignList;
    }

    struct CampaignWithId {
        uint256 campaignId;
        Campaign campaign;
    }
}
