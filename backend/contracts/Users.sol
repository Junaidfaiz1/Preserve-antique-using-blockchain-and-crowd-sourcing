// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    address public admin;
    uint256 public totalUsers;
    
    struct User {
        string userName;
        string email;
        uint256 phoneNumber;
        string password;  // For simplicity, storing passwords as plain text (not recommended in a real-world scenario)
        bool exists;
    }

    mapping(uint256 => User) public usersById;
    mapping(string => uint256) private userIdByEmail; // Mapping to get user ID by email

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized. Only admin can call this function.");
        _;
    }

    event UserRegistered(uint256 userId, string userName, string email, uint256 phoneNumber);

    constructor(string memory adminName, string memory adminEmail, string memory adminPassword) {
        admin = msg.sender;
        usersById[totalUsers] = User({
            userName: adminName,
            email: adminEmail,
            phoneNumber: 0,  // Admin doesn't have a phone number in this example
            password: adminPassword,
            exists: true
        });
        userIdByEmail[adminEmail] = totalUsers;
        totalUsers++;

        emit UserRegistered(totalUsers - 1, adminName, adminEmail, 0);
    }

    function registerUser(string memory userName, string memory email, uint256 phoneNumber, string memory password) external {
        require(!usersById[totalUsers].exists, "User already registered.");
        require(userIdByEmail[email] == 0, "Email already registered.");
        
        usersById[totalUsers] = User({
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            exists: true
        });
        userIdByEmail[email] = totalUsers;
        totalUsers++;

        emit UserRegistered(totalUsers - 1, userName, email, phoneNumber);
    }

    function login(string memory email, string memory password) external view returns (bool) {
        uint256 userId = userIdByEmail[email];
        if (userId == 0) {
            return false; // User not found
        }
        User storage user = usersById[userId];
        return user.exists && keccak256(abi.encodePacked(user.password)) == keccak256(abi.encodePacked(password));
    }

    function getTotalUsers() external view returns (uint256) {
        return totalUsers;
    }

    function getUserByEmail(string memory email) external view returns (string memory, uint256, bool) {
        uint256 userId = userIdByEmail[email];
        require(userId != 0, "User does not exist.");
        User storage user = usersById[userId];
        return (user.userName, user.phoneNumber, user.exists);
    }

    function viewAllUsers() external view returns (User[] memory) {
    User[] memory allUsers = new User[](totalUsers);
    for (uint256 i = 0; i < totalUsers; i++) {
        allUsers[i] = usersById[i];
    }
    return allUsers;
}


    function getUserById(uint256 userId) external view returns (string memory, string memory, uint256, bool) {
        User storage user = usersById[userId];
        require(user.exists, "User does not exist.");
        return (user.userName, user.email, user.phoneNumber, user.exists);
    }
}
