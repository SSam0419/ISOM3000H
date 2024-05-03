"use client";
import { MilestoneStatus, Project } from "@/lib/models/projects";
import { useContractStore } from "@/lib/states/contractStore";
import { useUserStore } from "@/lib/states/userStore";
import { ContractActions } from "@/utils/connectEthersContract";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiBullhorn } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { LuAward } from "react-icons/lu";
import { MdPendingActions } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

const ContractCard = ({
  project,
  projectIdx,
}: {
  projectIdx: number;
  project: Project;
}) => {
  const updateContractStatus = useContractStore(
    (state) => state.updateContractStatus
  );

  const userAddress = useUserStore((state) => state.address);

  let totalReward = 0;

  for (const milestone of project.milestones) {
    totalReward += milestone.reward;
  }

  // for opening confirmation modal for settling reward
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isEmployer =
    project.employerAddress.toLowerCase() === userAddress?.toLowerCase(); // check if user is employer

  return (
    <div className="w-full bg-background border border-default shadow p-5 rounded-xl">
      <div className="text-3xl font-bold">{project.name}</div>
      <div className="text-foreground-400 flex items-center gap-2">
        <IoPeopleSharp />
        My Role: {isEmployer ? "Employer" : "Employee"}
      </div>
      <Spacer y={5} />
      <div className="">
        <span className="font-semibold">Employer </span>
        <span className="text-default-800 font-light text-small">
          {project.employerAddress}
        </span>
      </div>
      <div className="">
        <span className="font-semibold">Employee </span>
        <span className="text-default-800 font-light text-small">
          {project.employeeAddress}
        </span>
      </div>

      <Spacer y={1} />

      <div className="">
        <span className="font-semibold">Total Milestones Reward </span>
        <span className="text-success-600 font-light">${totalReward}</span>
      </div>

      <Spacer y={5} />

      <div className="p-5">
        <ol className="relative border-s border-foreground-400">
          {project.milestones.map((milestone, milestoneIndex) => {
            const isFirstMilestone = milestoneIndex === 0;
            const isSettled = milestone.status === MilestoneStatus.Settled;
            const isPreviousMilestoneSettled =
              project.milestones[milestoneIndex - 1]?.status ===
              MilestoneStatus.Settled;

            const showButton =
              !isSettled && (isFirstMilestone || isPreviousMilestoneSettled);

            return (
              <li
                key={milestoneIndex}
                className={`mb-10 ms-6 ${
                  showButton ||
                  milestone.status == MilestoneStatus.Finished ||
                  milestone.status == MilestoneStatus.Processing
                    ? "px-1 py-1 rounded border border-success shadow bg-success-50"
                    : ""
                }`}
              >
                <Tooltip
                  content={
                    milestone.status == MilestoneStatus.Pending
                      ? "Pending"
                      : milestone.status == MilestoneStatus.Finished
                      ? "Finished"
                      : milestone.status == MilestoneStatus.Processing
                      ? "Processing"
                      : milestone.status == MilestoneStatus.Settled
                      ? "Settled"
                      : ""
                  }
                >
                  <div className="absolute flex items-center justify-center w-8 h-8 bg-default-100 border border-foreground-400 rounded-full -start-4 ">
                    {milestone.status == MilestoneStatus.Pending && (
                      <MdPendingActions size={22} />
                    )}
                    {milestone.status == MilestoneStatus.Finished && (
                      <FaCircleCheck color="green" />
                    )}
                    {milestone.status == MilestoneStatus.Processing && (
                      <Spinner color="success" size="sm" className=""></Spinner>
                    )}
                    {milestone.status == MilestoneStatus.Settled && (
                      <BiMoneyWithdraw />
                    )}
                  </div>
                </Tooltip>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Milestone {milestoneIndex + 1}{" "}
                  <Chip>
                    <div className="flex items-center gap-2">
                      <TbMoneybag />
                      {milestone.reward}
                    </div>
                  </Chip>
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {milestone.description}
                </p>
                {milestone.status === MilestoneStatus.Finished && (
                  <>
                    <Button
                      isDisabled={!isEmployer}
                      color="danger"
                      onPress={onOpen}
                    >
                      <LuAward />
                      Settle Reward
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader>Settle Reward</ModalHeader>
                            <ModalBody>
                              <p>
                                Are you sure you want to settle the reward for
                                this milestone?
                              </p>
                            </ModalBody>
                            <ModalFooter>
                              <Button onClick={() => onClose()}>Cancel</Button>

                              <Button
                                color="success"
                                onClick={() =>
                                  updateContractStatus({
                                    contractIdx: projectIdx,
                                    milestoneIdx: milestoneIndex,
                                    status: MilestoneStatus.Settled,
                                  })
                                }
                              >
                                Confirm
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </>
                )}
                {milestone.status === MilestoneStatus.Processing && (
                  <Button
                    isDisabled={isEmployer}
                    color="success"
                    onClick={() =>
                      updateContractStatus({
                        contractIdx: projectIdx,
                        milestoneIdx: milestoneIndex,
                        status: MilestoneStatus.Finished,
                      })
                    }
                  >
                    <FaCheckCircle />
                    Finished
                  </Button>
                )}
                {milestone.status === MilestoneStatus.Pending && showButton && (
                  <Button
                    isDisabled={isEmployer}
                    color="primary"
                    onClick={() =>
                      updateContractStatus({
                        contractIdx: projectIdx,
                        milestoneIdx: milestoneIndex,
                        status: MilestoneStatus.Processing,
                      })
                    }
                  >
                    <CiBullhorn />
                    Start
                  </Button>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <Spacer y={5} />

      {/* <Button onPress={async () => await ContractActions.addReview()}>
        Add Review
      </Button> */}
    </div>
  );
};

export default ContractCard;
