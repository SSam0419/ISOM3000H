"use client";

import ContractCard from "./ContractCard";
import { useContractStore } from "@/lib/states/contractStore";

const ContractsList = () => {
  const contracts = useContractStore((state) => state.contracts);
  return (
    <div className="p-5 flex flex-col items-center justify-center gap-5 md:min-w-[850px] max-w-[1000px]">
      {contracts.map((project, index) => {
        return (
          <div key={index} className="w-full">
            <ContractCard project={project} projectIdx={index} />
          </div>
        );
      })}
    </div>
  );
};

export default ContractsList;
