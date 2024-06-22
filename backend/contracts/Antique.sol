// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AntiqueDegitize {
    address public owner;
    uint256 public nextAntiqueId;

     struct Antique {
        uint256 id;
        string name;
        string category;
        string description;
        string imageName; 
    }
    mapping(uint256 => Antique) public antiques;
    mapping(string => bool) public uniqueCategories;

    event AntiqueUploaded(uint256 id, string name, string category, string description, string imageName); // Updated event
    event AntiqueUpdated(uint256 id, string name, string category, string description, string imageName); // Updated event
    event AntiqueRemoved(uint256 id);


    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized. Only the owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
        nextAntiqueId = 1;
    }

    function uploadAntique(string memory name, string memory category, string memory description, string memory imageName) external onlyOwner { // Updated function
        uint256 antiqueId = nextAntiqueId;
        nextAntiqueId++;

        antiques[antiqueId] = Antique({
            id: antiqueId,
            name: name,
            category: category,
            description: description,
            imageName: imageName
        });

        // Update uniqueCategories mapping
        uniqueCategories[category] = true;

        emit AntiqueUploaded(antiqueId, name, category, description, imageName);
    }

    function updateAntique(uint256 antiqueId, string memory name, string memory category, string memory description, string memory imageName) external onlyOwner { // Updated function
        require(antiqueId < nextAntiqueId, "Antique does not exist.");

        // Update uniqueCategories mapping
        uniqueCategories[antiques[antiqueId].category] = false;
        uniqueCategories[category] = true;

        Antique storage antique = antiques[antiqueId];
        antique.name = name;
        antique.category = category;
        antique.description = description;
        antique.imageName = imageName;

        emit AntiqueUpdated(antiqueId, name, category, description, imageName); // Updated event
    }

   function searchAntique(string memory searchTerm) external view returns (Antique[] memory) {
    // Count the number of antiques matching the search term
    uint256 matchingCount = 0;

    // Loop through antiques to count matching antiques
    for (uint256 i = 1; i < nextAntiqueId; i++) {
        if (compareStrings(antiques[i].name, searchTerm) || compareStrings(antiques[i].category, searchTerm)) {
            matchingCount++;
        }
    }

    // Create an array to store matching antiques
    Antique[] memory matchingAntiques = new Antique[](matchingCount);
    uint256 index = 0;

    // Populate the array with matching antiques
    for (uint256 i = 1; i < nextAntiqueId; i++) {
        if (compareStrings(antiques[i].name, searchTerm) || compareStrings(antiques[i].category, searchTerm)) {
            matchingAntiques[index] = antiques[i];
            index++;
        }
    }

    return matchingAntiques;
}


   function removeAntique(uint256 antiqueId) external onlyOwner {
    require(antiqueId < nextAntiqueId, "Antique does not exist.");

    // Delete the antique
    delete antiques[antiqueId];

    // Shift the antiques after the removed antique one position backward
    for (uint256 i = antiqueId; i < nextAntiqueId - 1; i++) {
        antiques[i] = antiques[i + 1];
        antiques[i].id = i; // Update the ID of the shifted antique
    }

    // Delete the last antique (since it has been shifted)
    delete antiques[nextAntiqueId - 1];

    // Decrement nextAntiqueId
    nextAntiqueId--;

    // Emit event for the removal of the antique
    emit AntiqueRemoved(antiqueId);
}


    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function getAntiques() external view returns (Antique[] memory) {
        Antique[] memory antiqueList = new Antique[](nextAntiqueId - 1);

        for (uint256 i = 1; i < nextAntiqueId; i++) {
            antiqueList[i - 1] = antiques[i];
        }

        return antiqueList;
    }

    function getAntiqueCategories() external view returns (string[] memory) {
        string[] memory categories = new string[](nextAntiqueId - 1);
        uint256 index = 0;

        // Loop through uniqueCategories mapping to collect unique categories
        for (uint256 i = 1; i < nextAntiqueId; i++) {
            if (uniqueCategories[antiques[i].category]) {
                categories[index] = antiques[i].category;
                index++;
            }
        }

        return categories;
    }

    function getAntiquesByCategory(string memory category) external view returns (Antique[] memory) {
        uint256 categoryCount = 0;

        // Count the number of antiques in the specified category
        for (uint256 i = 1; i < nextAntiqueId; i++) {
            if (compareStrings(antiques[i].category, category)) {
                categoryCount++;
            }
        }

        // Create an array to store antiques in the specified category
        Antique[] memory categoryAntiques = new Antique[](categoryCount);
        uint256 index = 0;

        // Populate the array with antiques in the specified category
        for (uint256 i = 1; i < nextAntiqueId; i++) {
            if (compareStrings(antiques[i].category, category)) {
                categoryAntiques[index] = antiques[i];
                index++;
            }
        }

        return categoryAntiques;
    }
       function getAntiqueById(uint256 antiqueId) external view returns (Antique memory) {
        require(antiqueId < nextAntiqueId, "Antique does not exist.");
        return antiques[antiqueId];
    }
    
    function getTotalAntiques() external view returns (uint256) {
        return nextAntiqueId - 1;
    }
}