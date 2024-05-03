import { Project } from "@/lib/models/projects";
import { ethers } from "ethers";

//my address : 0x931E87F00e430E8abb561c5facFCe01E9bd53321
const CONTRACT_GUARD_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_client",
        type: "address",
      },
      {
        internalType: "address",
        name: "_freelancer",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "_descriptions",
        type: "string[]",
      },
      {
        internalType: "enum ContractGuard.MilestoneStatus[]",
        name: "_statuses",
        type: "uint8[]",
      },
      {
        internalType: "uint256[]",
        name: "_rewards",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "userManagerAddress",
        type: "address",
      },
    ],
    name: "addProject",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "rating",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    name: "addReview",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "milestoneIndex",
        type: "uint256",
      },
      {
        internalType: "enum ContractGuard.MilestoneStatus",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "changeMilestoneStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "milestoneIndex",
        type: "uint256",
      },
    ],
    name: "payForFinishedMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_userManager",
        type: "address",
      },
    ],
    name: "getProjectsByUser",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "client",
            type: "address",
          },
          {
            internalType: "address",
            name: "freelancer",
            type: "address",
          },
          {
            components: [
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "enum ContractGuard.MilestoneStatus",
                name: "status",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "reward",
                type: "uint256",
              },
            ],
            internalType: "struct ContractGuard.Milestone[]",
            name: "milestones",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "comment",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "rating",
                type: "uint256",
              },
            ],
            internalType: "struct ContractGuard.Review",
            name: "clientReview",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "comment",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "rating",
                type: "uint256",
              },
            ],
            internalType: "struct ContractGuard.Review",
            name: "freelancerReview",
            type: "tuple",
          },
        ],
        internalType: "struct ContractGuard.Project[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        internalType: "address",
        name: "freelancer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "rating",
            type: "uint256",
          },
        ],
        internalType: "struct ContractGuard.Review",
        name: "clientReview",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "rating",
            type: "uint256",
          },
        ],
        internalType: "struct ContractGuard.Review",
        name: "freelancerReview",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const CONTRACT_GUARD_ADDRESS = "0xD9B69A110cBA0915c716550baF10E7d91b2f9408";

const USER_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        internalType: "address",
        name: "userId",
        type: "address",
      },
    ],
    name: "joinProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectId",
        type: "string",
      },
    ],
    name: "UserJoinedProject",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    name: "UserRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userId",
        type: "address",
      },
    ],
    name: "getProjectsForUser",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const USER_MANAGER_ADDRESS = "0xe27F86A3F1914dD87Ef8e35e17264ed4aB5D7AD9";

export const connectEthersContract = async () => {
  const signer = await new ethers.BrowserProvider(
    (window as any).ethereum
  ).getSigner();

  if (!signer) return null;

  const contract = await new ethers.Contract(
    CONTRACT_GUARD_ADDRESS,
    CONTRACT_GUARD_ABI,
    await signer
  );
  console.log(contract);
  return contract;
};

export const ContractActions = {
  addProject: async ({
    projectId,
    projectName,
    client,
    freelancer,
    descriptions,
    statuses,
    rewards,
  }: {
    projectId: string;
    projectName: string;
    client: string;
    freelancer: string;
    descriptions: string[];
    statuses: number[];
    rewards: number[];
  }): Promise<void> => {
    const contract = await connectEthersContract();
    if (!contract) return;

    const totalReward = rewards.reduce((sum, reward) => sum + reward, 0);

    try {
      // Call the addProject function
      const tx = await contract.addProject(
        projectId,
        projectName,
        ethers.getAddress(client),
        ethers.getAddress(freelancer),
        descriptions,
        statuses,
        rewards,
        USER_MANAGER_ADDRESS,
        {
          value: ethers.parseEther(totalReward.toString()),
        }
      );
      // const receipt = await tx.wait();
      // console.log(receipt);
      console.log(tx);
      return tx;
    } catch (error) {
      console.error("Error creating project:", error);
      // Handle the error, e.g., display an error message to the user
      throw error;
    }
  },

  changeMilestoneStatus: async (
    projectId: number,
    milestoneIndex: number,
    newStatus: number
  ): Promise<void> => {
    const contract = await connectEthersContract();
    if (!contract) return;

    await contract.changeMilestoneStatus(projectId, milestoneIndex, newStatus);
  },

  payForFinishedMilestone: async (
    projectId: number,
    milestoneIndex: number
  ): Promise<void> => {
    const contract = await connectEthersContract();
    if (!contract) return;

    await contract.payForFinishedMilestone(projectId, milestoneIndex);
  },

  getProjectsByUser: async (userAddress: string): Promise<Project[]> => {
    const contract = await connectEthersContract();
    if (!contract) throw new Error("Contract not connected");

    const projects = await contract.getProjectsByUser(
      userAddress,
      USER_MANAGER_ADDRESS
    );

    const result: Project[] = projects.map(
      ([name, client, freelancer, milestones]: [
        string,
        string,
        string,
        [string, number, number][]
      ]) =>
        // map into Project type
        ({
          name,
          employerAddress: client,
          employeeAddress: freelancer,
          // map milestones
          milestones: milestones.map(([description, status, reward]) => {
            return {
              description,
              status: parseInt(status.toString()),
              reward: parseFloat(reward.toString()),
            };
          }),
        })
    );
    console.log(result);
    return result;
  },
};
