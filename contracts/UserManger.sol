// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract UserManager {
    
    struct User {
        string name;
        string title; 
        string[] involvedProjects;
    }

    // Mapping to store user information
    mapping(address => User) public users;

    // Events
    event UserRegistered(address indexed wallet, string name, string title);
    event UserJoinedProject(address indexed wallet, string projectId);

    // Function to register a new user
    function registerUser(string memory _name, string memory _title) public {
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_title).length > 0, "Title is required");
        
        User storage user = users[msg.sender];
        require(bytes(user.name).length == 0, "User already registered");
        
        user.name = _name;
        user.title = _title;
        
        emit UserRegistered(msg.sender, _name, _title);
    } 
 
    // Function to join project
    function joinProject(string memory projectId, address userId) public {
        require(bytes(projectId).length > 0, "Project ID is required");
        require(userId != address(0), "Invalid user address");

        User storage user = users[userId];
        require(bytes(user.name).length > 0, "User is not registered");

        // Check if the user is already involved in the project
        for (uint256 i = 0; i < user.involvedProjects.length; i++) {
            require(keccak256(bytes(user.involvedProjects[i])) != keccak256(bytes(projectId)), "User is already involved in this project");
        }

        // Add the project ID to the user's involvedProjects array
        user.involvedProjects.push(projectId);

        emit UserJoinedProject(userId, projectId);
    }

    // Function to retrieve project IDs for a user
    function getProjectsForUser(address userId) public view returns (string[] memory) {
        require(userId != address(0), "Invalid user address");
        
        User storage user = users[userId];
        require(bytes(user.name).length > 0, "User is not registered");
        
        return user.involvedProjects;
    }
}