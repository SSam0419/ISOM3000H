"use client";

import { useUserStore } from "@/lib/states/userStore";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const setAddress = useUserStore((state) => state.setAddress);
  const address = useUserStore((state) => state.address);

  return (
    <NextNavbar className="bg-foreground text-background">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">ContractGuard</p>
        </NavbarBrand>
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contract-list">Contracts</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/create-contract">Create</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onClick={async () => {
              if (!(window as any).ethereum) {
                alert("Please install MetaMask first.");
                return;
              }
              // get the user's account address
              const accounts = await (window as any).ethereum.request({
                method: "eth_requestAccounts",
              });
              setAddress(accounts[0]);
            }}
          >
            {address ? address : "Connect Wallet"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
