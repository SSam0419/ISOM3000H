export interface Project {
  id: string;
  name: string;
  employerAddress: string;
  employeeAddress: string;
  milestones: Milestone[];
}

export interface Milestone {
  description: string;
  status: MilestoneStatus;
  reward: number;
}

export enum MilestoneStatus {
  Pending,
  Processing,
  Finished,
  Settled,
}
