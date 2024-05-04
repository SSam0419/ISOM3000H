import Image from "next/image";
import React from "react";
import blockchainImg from "./blockchain.svg";
import { Button, Spacer } from "@nextui-org/react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="">
      <div className="flex gap-10 min-h-[500px] items-center justify-center">
        <div className="max-w-[800px]">
          <h1 className="text-5xl font-bold">
            <p className="leading-tight">
              Protect your contract with ContractGuard
            </p>
          </h1>
          <Spacer y={4} />
          <p className="text-xl ">
            A decentralised application that protects contractors, vendors, and
            freelancers.
          </p>
          <Spacer y={4} />
          <Button color="primary" href="/create-contract" className="">
            <Link
              href="/create-contract"
              className="w-full flex items-center gap-1"
            >
              Create Contract
              <FaArrowAltCircleRight />
            </Link>
          </Button>
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

export default LandingPage;
