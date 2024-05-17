// SPDX-License-Identifier: GPL-3.0
 
pragma solidity >=0.8.2 <0.9.0;

import "./UserManger.sol";

contract ContractGuard {
    enum MilestoneStatus {Pending,Processing,Finished,Settled}

    struct Milestone {
        string description;
        MilestoneStatus status;
        uint256 reward;
    }

     struct Review {
        string comment;
        uint256 rating; // 1-5
    }

    struct Project {
            string name;
            address client;
            address freelancer;
            Milestone[] milestones;
            Review clientReview;
            Review freelancerReview;
    }

    // uuid => project
    mapping(string => Project) public projects;

    receive() external payable {}

    function addProject(
        string memory _id,
        string memory _name,
        address _client,
        address _freelancer,
        string[] memory _descriptions,
        MilestoneStatus[] memory _statuses,
        uint256[] memory _rewards,
        address userManagerAddress
    ) public payable {
        require(bytes(_id).length > 0, "Project ID is required");
        require(bytes(_name).length > 0, "Project name is required");
        require(_descriptions.length == _statuses.length && _descriptions.length == _rewards.length, "Arrays must have the same length");

        Project storage p = projects[_id];
        p.name = _name;
        p.client = _client;
        p.freelancer = _freelancer;

        uint256 totalReward = 0;
        for (uint256 i = 0; i < _descriptions.length; i++) {
            Milestone memory newMilestone = Milestone({
                description: _descriptions[i],
                status: _statuses[i],
                reward: _rewards[i]
            });
            p.milestones.push(newMilestone);
            totalReward += _rewards[i];
        }
        
        require(msg.value >= totalReward, "Insufficient funds provided");

        // Transfer the total reward amount to the contract
        // payable(address(this)).transfer(totalReward);

        // Update the UserManager contract
        UserManager userManager = UserManager(userManagerAddress);
        userManager.joinProject(_id,_client);
        userManager.joinProject(_id,_freelancer);
    }

    function changeMilestoneStatus(string memory projectId, uint256 milestoneIndex, MilestoneStatus newStatus) public {
        require(bytes(projectId).length > 0, "Project ID is required");
        Project storage p = projects[projectId];
        require(bytes(p.name).length > 0, "Project does not exist");
        require(milestoneIndex < p.milestones.length, "Invalid milestone index");
        p.milestones[milestoneIndex].status = newStatus;
    }

    function payForFinishedMilestone(string memory projectId, uint256 milestoneIndex) public {
        require(bytes(projectId).length > 0, "Project ID is required");
        Project storage p = projects[projectId];
        require(bytes(p.name).length > 0, "Project does not exist");
        require(milestoneIndex < p.milestones.length, "Invalid milestone index");
        
        Milestone storage milestone = p.milestones[milestoneIndex];
        require(milestone.status == MilestoneStatus.Finished, "Milestone must be in Finished state");
        
        // Add your payment logic here
        // Example: transfer funds to the freelancer's address
        address payable freelancer = payable(p.freelancer);
        freelancer.transfer(milestone.reward);
        milestone.status = MilestoneStatus.Settled;
    }
 
 
    function getProjectsByUser(address userAddress, address _userManager) public view returns (Project[] memory) {
        UserManager userManager = UserManager(_userManager);
        string[] memory userProjectIds = userManager.getProjectsForUser(userAddress);
        uint256 count = 0;

        for (uint256 i = 0; i < userProjectIds.length; i++) {
            string memory projectId = userProjectIds[i];
            Project storage p = projects[projectId];
            if (p.client == userAddress || p.freelancer == userAddress) {
                count++;
            }
        }

        Project[] memory resultProjects = new Project[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < userProjectIds.length; i++) {
            string memory projectId = userProjectIds[i];
            Project storage p = projects[projectId];
            if (p.client == userAddress || p.freelancer == userAddress) {
                resultProjects[index++] = projects[projectId];
            }
        }

        return resultProjects;
    }

    function addReview(
        string memory projectId,
        uint256 rating,
        string memory comment
    ) public {

        Project storage p = projects[projectId];

        if (msg.sender == p.client) {
            p.clientReview = Review({
                comment: comment,
                rating: rating
            });
        } else if (msg.sender == p.freelancer) {
            p.freelancerReview = Review({
                comment: comment,
                rating: rating
            });
        } else {
            revert("Only the client or freelancer can add a review");
        }   
        
    }
  
}
