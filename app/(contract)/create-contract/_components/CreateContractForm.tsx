"use client";

import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

const CreateContractForm = () => {
  const [projectName, setProjectName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employerAddress, setEmployerAddress] = useState("");
  const [milestones, setMilestones] = useState([
    { description: "", reward: 0 },
  ]);

  const handleAddMilestone = () => {
    setMilestones([...milestones, { description: "", reward: 0 }]);
  };

  const handleMilestoneChange = (index: number, key: string, value: string) => {
    setMilestones((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [key]: value,
      };
      return updatedMilestones;
    });
  };

  const renderMilestoneInputs = () => {
    return milestones.map((milestone, index) => (
      <div
        key={index}
        className="flex flex-col gap-5 items-center justify-center"
      >
        <p className="text-xl">Milestone {index + 1}</p>
        <Textarea
          label={`Milestone ${index + 1} Description`}
          placeholder="e.g. finish system design"
          value={milestone.description}
          onChange={(e) =>
            handleMilestoneChange(index, "description", e.target.value)
          }
        />
        <Input
          label={`Milestone ${index + 1} Reward`}
          type="number"
          value={milestone.reward.toString()}
          onChange={(e) =>
            handleMilestoneChange(index, "reward", e.target.value)
          }
        />
      </div>
    ));
  };

  return (
    <div className="border rounded m-5 shadow p-5 flex flex-col justify-center gap-5 ">
      <p className="text-2xl font-semibold">Create Contract</p>

      <Input
        name="projectName"
        label="Project Name"
        placeholder="e.g. Software Development"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Input
        label="Employee Address"
        placeholder="e.g. 0x123..."
        value={employeeAddress}
        onChange={(e) => setEmployeeAddress(e.target.value)}
      />
      <Input
        label="Employers Address"
        placeholder="e.g. 0x456..."
        value={employerAddress}
        onChange={(e) => setEmployerAddress(e.target.value)}
      />
      {/* render input fields for each milestone */}
      <div className="border rounded-large p-5 flex flex-col gap-5 shadow">
        {renderMilestoneInputs()}
        <Button
          color="secondary"
          variant="bordered"
          onClick={handleAddMilestone}
        >
          Add Milestone
        </Button>
      </div>
      <Divider />
      <Button color="primary">Create Contract</Button>
    </div>
  );
};
export default CreateContractForm;
