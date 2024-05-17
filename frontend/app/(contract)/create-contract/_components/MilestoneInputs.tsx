import { Chip, Input, Textarea } from "@nextui-org/react";
import React from "react";

const MilestoneInputs = ({
  milestones,
  isLoading,
  userAddress,
  handleMilestoneChange,
}: {
  milestones: { description: string; reward: number }[];
  isLoading: boolean;
  userAddress: string | null;
  handleMilestoneChange: (index: number, key: string, value: string) => void;
}) => {
  return milestones.map((milestone, index) => (
    <div key={index} className="flex flex-col gap-5 justify-center">
      <Chip>
        <p className="">Milestone {index + 1}</p>
      </Chip>
      <Textarea
        isRequired
        isDisabled={isLoading || userAddress == null}
        label={`Milestone ${index + 1} Description`}
        placeholder="e.g. finish system design"
        value={milestone.description}
        onChange={(e) =>
          handleMilestoneChange(index, "description", e.target.value)
        }
      />
      <Input
        isRequired
        isDisabled={isLoading || userAddress == null}
        label={`Milestone ${index + 1} Reward`}
        type="number"
        value={milestone.reward.toString()}
        onChange={(e) => handleMilestoneChange(index, "reward", e.target.value)}
      />
    </div>
  ));
};

export default MilestoneInputs;
