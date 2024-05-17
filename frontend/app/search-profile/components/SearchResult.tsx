"use client";

import { Milestone, MilestoneStatus } from "@/lib/models/projects";
import { ContractActions } from "@/utils/contractActions";
import { Chip, Divider, Spacer } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BiCoinStack } from "react-icons/bi";
import { FaEthereum, FaStar } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import { MdOutlinePersonPin } from "react-icons/md";

const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; title: string } | null>(
    null
  );
  const [projects, setProjects] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const findUser = useCallback(async () => {
    if (search === null) return;

    setIsLoading(true);
    try {
      const user = await ContractActions.getUser(search);
      console.log("user", user);
      setUser(user);
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  }, [search]);
  const findUserProjects = useCallback(async () => {
    if (search === null) return;

    setIsLoading(true);
    try {
      const projects = await ContractActions.getProjectsByUser(search);
      setProjects(projects);
      console.log("projects", projects);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [search]);

  useEffect(() => {
    findUser();
    findUserProjects();
  }, [findUser, findUserProjects]);

  return (
    <div className="flex items-center justify-center py-5">
      {isLoading && <div>Loading...</div>}
      {!isLoading && !search && <div>Search for a user</div>}
      {!isLoading && search && projects.length === 0 && <div>No Results</div>}
      {!isLoading && search && user && projects && (
        <div className="bg-white w-full px-10 py-5 rounded">
          <div className="">
            <div className="text-3xl font-extralight text-muted">
              {user.title}
            </div>
            <Spacer y={1} />
            <div>
              <span className="text-5xl font-semibold"> {user.name}</span>
              <span className="text-sm text-muted">{search}</span>
            </div>
          </div>
          <Divider className="my-5" />
          <div className="">
            <div>
              {projects.map((project, index) => {
                const totalMilestoneDone = project.milestones.filter(
                  (milestone: any) =>
                    milestone.status === MilestoneStatus.Settled ||
                    milestone.status === MilestoneStatus.Finished
                ).length;

                const totalReward = project.milestones.reduce(
                  (sum: number, milestone: Milestone) => {
                    sum += milestone.reward;
                    return sum;
                  },
                  0
                );

                const totalRewardClaimed = project.milestones.reduce(
                  (sum: number, milestone: Milestone) => {
                    if (milestone.status === MilestoneStatus.Settled) {
                      sum += milestone.reward;
                    }
                    return sum;
                  },
                  0
                );

                const isEmployer =
                  project.employeeAddress.toLowerCase() ===
                  search.toLowerCase();

                const isProjectDone = project.milestones.every(
                  (milestone: Milestone) =>
                    milestone.status === MilestoneStatus.Settled
                );

                return (
                  <div
                    key={index}
                    className="py-5 border-2 shadow rounded px-3 my-2"
                  >
                    <div className="">
                      <span className="font-semibold text-lg mr-2">
                        {project.name}
                      </span>
                      {isProjectDone ? (
                        <Chip color="success">Settled</Chip>
                      ) : (
                        <Chip color="primary">In Progress</Chip>
                      )}
                    </div>
                    <Spacer y={4} />
                    <div className="flex gap-1 items-center">
                      <MdOutlinePersonPin size={26} />
                      <span className="text-muted">
                        {isEmployer ? "Employer" : "Employee"}
                      </span>
                    </div>
                    <Spacer y={4} />
                    <div>
                      <div className="flex gap-1 items-center">
                        <FaMountainSun />
                        Milestones Done : {totalMilestoneDone}
                      </div>
                      <div className="flex gap-1 items-center">
                        <FaEthereum />
                        <div className="flex items-end">
                          <span>Reward Claimed : {totalRewardClaimed} </span>
                          <span className="font-light text-sm text-muted">
                            /{totalReward}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <FaStar />
                        Rating :{" "}
                        {isEmployer
                          ? project.employeeReview.rating || "no raiting yet"
                          : project.employerReview.rating || "no raiting yet"}
                      </div>
                    </div>
                    <Spacer y={4} />
                    <div className="">
                      <p className="text-lg font-medium">Review</p>
                      <p>
                        {isEmployer
                          ? project.employeeReview.comment || "no comment yet"
                          : project.employerReview.comment || "no comment yet"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
