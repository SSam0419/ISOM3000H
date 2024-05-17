"use client";

import { Button, Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";

import { RiUserSearchLine } from "react-icons/ri";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <div className="flex items-center gap-4 w-full">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="bordered"
        classNames={{
          input: ["bg-background", "hover:bg-default-50"],
          inputWrapper: ["bg-background", "hover:bg-default-50"],
          innerWrapper: ["bg-background", "hover:bg-default-50"],
        }}
        startContent={<RiUserSearchLine />}
        placeholder="e.g. 0x123awfqfq...."
      />
      <Button
        color="primary"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("search", query);
          replace(`${pathname}?${params.toString()}`);
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
