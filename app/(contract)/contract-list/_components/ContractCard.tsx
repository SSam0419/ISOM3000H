"use client";
import { MilestoneStatus, Project } from "@/lib/models/projects";
import { useContractStore } from "@/lib/states/contractStore";
import { useUserStore } from "@/lib/states/userStore";
import { Button, Chip, Spacer, Spinner, Tooltip } from "@nextui-org/react";
import React from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiBullhorn } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
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

  return (
    <div className="w-full bg-background border border-default shadow p-5 rounded-xl">
      <div className="text-3xl font-bold">{project.name}</div>
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
                    ? "px-1 py-1 rounded border border-success shadow"
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
                  <Button
                    isDisabled={project.employeeAddress == userAddress}
                    color="danger"
                    onClick={() =>
                      updateContractStatus({
                        contractIdx: projectIdx,
                        milestoneIdx: milestoneIndex,
                        status: MilestoneStatus.Settled,
                      })
                    }
                  >
                    <LuAward />
                    Settle Reward
                  </Button>
                )}
                {milestone.status === MilestoneStatus.Processing && (
                  <Button
                    isDisabled={project.employeeAddress !== userAddress}
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
                    isDisabled={project.employeeAddress !== userAddress}
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
    </div>
  );
};

export default ContractCard;
