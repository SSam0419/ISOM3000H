import Image from "next/image";
import React from "react";
import blockchainImg from "./blockchain.svg";
import { Spacer } from "@nextui-org/react";

const Instruction = () => {
  return (
    <div>
      <div className="flex gap-10 min-h-[500px] items-center justify-center">
        <div className="max-w-[800px]">
          <h1 className="text-5xl font-bold">
            <p className="font-normal">Protect your contract with</p>
            <Spacer y={2} />
            <p className="leading-tight"> ContractGuard</p>
          </h1>
          <Spacer y={4} />
          <p className="text-2xl ">
            A decentralised application that protects contractors, vendors, and
            freelancers.
          </p>
        </div>

        <Image
          src={blockchainImg}
          alt="Image of blockchain"
          width={410}
          height={410}
        />
      </div>
    </div>
  );
};

export default Instruction;
