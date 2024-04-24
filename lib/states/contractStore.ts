import { create } from "zustand";
import { MilestoneStatus, Project } from "../models/projects";

interface ContractState {
  contracts: Project[];
  setContract: (contracts: Project[]) => void;
  updateContractStatus: ({
    contractIdx,
    milestoneIdx,
    status,
  }: {
    contractIdx: number;
    milestoneIdx: number;
    status: MilestoneStatus;
  }) => void;
}

export const useContractStore = create<ContractState>((set) => ({
  contracts: [
    {
      name: "Build E-commerce Website",
      employerAddress: "0x931e87f00e430e8abb561c5facfce01e9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Design homepage layout",
          status: MilestoneStatus.Pending,
          reward: 100,
        },
        {
          description: "Design table layout",
          status: MilestoneStatus.Pending,
          reward: 100,
        },
        {
          description: "Implement product filter feature",
          status: MilestoneStatus.Pending,
          reward: 200,
        },
        {
          description: "Implement product search feature",
          status: MilestoneStatus.Pending,
          reward: 200,
        },
      ],
    },
    {
      name: "Develop Mobile App",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x931e87f00e430e8abb561c5facfce01e9bd53321",
      milestones: [
        {
          description: "Create login screen",
          status: MilestoneStatus.Pending,
          reward: 100,
        },
        {
          description: "Integrate push notifications",
          status: MilestoneStatus.Pending,
          reward: 200,
        },
        {
          description: "Integrate push email notifications",
          status: MilestoneStatus.Pending,
          reward: 100,
        },
      ],
    },
    {
      name: "Write Blog Posts",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Research topics and keywords",
          status: MilestoneStatus.Pending,
          reward: 100,
        },
        {
          description: "Write and edit first draft",
          status: MilestoneStatus.Pending,
          reward: 200,
        },
      ],
    },
    {
      name: "Design Company Logo",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Brainstorm logo concepts",
          status: MilestoneStatus.Settled,
          reward: 100,
        },
        {
          description: "Refine and finalize chosen design",
          status: MilestoneStatus.Processing,
          reward: 200,
        },
      ],
    },
    {
      name: "Create Social Media Campaign",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Research target audience and platforms",
          status: MilestoneStatus.Settled,
          reward: 100,
        },
        {
          description: "Create and schedule content",
          status: MilestoneStatus.Processing,
          reward: 200,
        },
      ],
    },
    {
      name: "Build Custom CRM System",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Gather requirements and create specifications",
          status: MilestoneStatus.Settled,
          reward: 100,
        },
        {
          description: "Develop and test core functionality",
          status: MilestoneStatus.Processing,
          reward: 200,
        },
      ],
    },
    {
      name: "Translate Website Content",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Receive content and confirm scope",
          status: MilestoneStatus.Settled,
          reward: 100,
        },
        {
          description: "Translate and proofread all pages",
          status: MilestoneStatus.Processing,
          reward: 200,
        },
      ],
    },
    {
      name: "Develop Online Course",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Create course outline and lesson plans",
          status: MilestoneStatus.Settled,
          reward: 100,
        },
        {
          description: "Record and edit all video lectures",
          status: MilestoneStatus.Processing,
          reward: 200,
        },
      ],
    },
    {
      name: "Design Infographic",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Research and gather data",
          status: MilestoneStatus.Settled,
          reward: 100,
        },
        {
          description: "Create and refine infographic design",
          status: MilestoneStatus.Processing,
          reward: 200,
        },
      ],
    },
    {
      name: "Develop Custom WordPress Theme",
      employerAddress: "0x911E87F00e430E8abb561c5facFCe01E9bd53321",
      employeeAddress: "0x923E87F00e430E8abb561c5facFCe01E9bd53321",
      milestones: [
        {
          description: "Gather requirements and create design mockups",
          status: MilestoneStatus.Settled,
          reward: 100,
        },
        {
          description: "Code and test all theme features",
          status: MilestoneStatus.Processing,
          reward: 200,
        },
      ],
    },
  ],
  setContract: (contracts) => {
    set((state) => ({ contracts: contracts }));
  },
  updateContractStatus: ({ contractIdx, milestoneIdx, status }) => {
    set((state) => ({
      contracts: state.contracts.map((contract, idx) => {
        if (idx === contractIdx) {
          contract.milestones[milestoneIdx].status = status;
        }

        return contract;
      }),
    }));
  },
}));
