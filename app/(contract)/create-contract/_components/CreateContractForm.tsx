"use client";

import { useUserStore } from "@/lib/states/userStore";
import { ContractActions } from "@/utils/connectEthersContract";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { isError } from "ethers";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MilestoneInputs from "./MilestoneInputs";

const CreateContractForm = () => {
  const userAddress = useUserStore((state) => state.address);
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [milestones, setMilestones] = useState([
    { description: "", reward: 1 },
  ]);
  const [hint, setHint] = useState({ message: "", isError: false });

  const handleAddMilestone = () => {
    setMilestones([...milestones, { description: "", reward: 1 }]);
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

  const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAddress) {
      return;
    }

    setIsLoading(true);

    //generate random id for the project
    const projectId = uuidv4();
    console.log(projectId);

    //create a dummy project
    try {
      const result = await ContractActions.addProject({
        projectId,
        projectName,
        client: userAddress,
        freelancer: employeeAddress,
        descriptions: milestones.map((milestone) => milestone.description),
        statuses: milestones.map(() => 0),
        rewards: milestones.map((milestone) => milestone.reward),
      });
      console.log(result);
      setHint({ message: "Contract created successfully", isError: false });
      // reset form
      setProjectName("");
      setEmployeeAddress("");
      setMilestones([{ description: "", reward: 1 }]);
    } catch (e) {
      console.error(e);
      setHint({
        message: (e as any).shortMessage || "Error creating contract",
        isError: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <form
      className="border rounded m-5 shadow p-5 flex flex-col justify-center gap-5 "
      onSubmit={(e) => handleCreateProject(e)}
    >
      <div className="text-2xl font-semibold">
        Create Contract
        <p className="text-default-500 text-sm font-light">
          only employer can create contract
        </p>
      </div>
      {userAddress == null && (
        <p className="text-danger">You must connect to your wallet first</p>
      )}
      <Input
        isRequired
        isDisabled={isLoading || userAddress == null}
        name="projectName"
        label="Project Name"
        placeholder="e.g. Software Development"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Input
        isReadOnly
        isDisabled={isLoading || userAddress == null}
        label="Employer Address (My Address)"
        value={userAddress || ""}
      />
      <Input
        isRequired
        isDisabled={isLoading || userAddress == null}
        label="Employee Address"
        placeholder="e.g. 0x123..."
        value={employeeAddress}
        onChange={(e) => setEmployeeAddress(e.target.value)}
      />
      {/* render input fields for each milestone */}
      <div className="flex flex-col gap-5">
        <MilestoneInputs
          handleMilestoneChange={handleMilestoneChange}
          isLoading={isLoading}
          milestones={milestones}
          userAddress={userAddress}
        />
        <Button
          type="button"
          isDisabled={isLoading || userAddress == null}
          color="secondary"
          variant="bordered"
          onClick={handleAddMilestone}
        >
          Add Milestone
        </Button>
      </div>
      <Divider />
      {hint.message && (
        <p className={`${hint.isError ? "text-danger" : "text-success"}`}>
          {hint.message}
        </p>
      )}
      <Button color="primary" type="submit" isLoading={isLoading}>
        Create Contract
      </Button>
    </form>
  );
};
export default CreateContractForm;
