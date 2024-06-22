const UserManagement = artifacts.require("UserManagement");

module.exports = function (deployer) {
  
  deployer.deploy(UserManagement, "Junaid", "Junaid@gmail.com", "admin");
};
