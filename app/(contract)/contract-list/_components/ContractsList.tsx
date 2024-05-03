"use client";

import ContractCard from "./ContractCard";
import { useContractStore } from "@/lib/states/contractStore";
import { useEffect } from "react";
import { useUserStore } from "@/lib/states/userStore";
import { ethers } from "ethers";
import { connect } from "http2";
import { ContractActions } from "@/utils/connectEthersContract";
import ToolBar from "./ToolBar";

const ContractsList = () => {
  const contracts = useContractStore((state) => state.contracts);
  const setContract = useContractStore((state) => state.setContract);
  const address = useUserStore((state) => state.address);

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return null;

      try {
        const projects = await ContractActions.getProjectsByUser(address);
        await ContractActions.getUser(address);
        setContract(projects);
      } catch (e) {
        // show any error using the alert box
        alert(`Error: ${e}`);
      }
    };
    fetchData();
  }, [address, setContract]);

  return (
    <div className="p-5 flex flex-col items-center justify-start gap-5 md:min-w-[850px] max-w-[1000px]">
      <ToolBar />
      {address &&
        contracts.map((project, index) => {
          return (
            <div key={index} className="w-full">
              <ContractCard project={project} projectIdx={index} />
            </div>
          );
        })}
      {!address && (
        <div className="text-foreground-400 text-2xl">
          Please connect your wallet to view your contracts
        </div>
      )}
    </div>
  );
};

export default ContractsList;
