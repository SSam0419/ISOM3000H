import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaArrowAltCircleRight } from "react-icons/fa";

const ToolBar = () => {
  return (
    <div className="flex items-center gap-4 w-full">
      <Input
        startContent={<AiOutlineFileSearch />}
        variant="bordered"
        placeholder="search by title...."
        classNames={{
          input: ["bg-background", "hover:bg-default-50"],
          inputWrapper: ["bg-background", "hover:bg-default-50"],
          innerWrapper: ["bg-background", "hover:bg-default-50"],
        }}
      />
      <Button
        color="primary"
        href="/create-contract"
        endContent={<FaArrowAltCircleRight />}
        className="w-[200px]"
      >
        <Link href="/create-contract">Create Contract</Link>
      </Button>
    </div>
  );
};

export default ToolBar;
