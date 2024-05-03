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
  contracts: [],
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
