"use client";

import { useUserStore } from "@/lib/states/userStore";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiSamuraiHelmet } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

const Navbar = () => {
  const setAddress = useUserStore((state) => state.setAddress);
  const address = useUserStore((state) => state.address);
  const [accounts, setAccounts] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserAddress = useCallback(async () => {
    setIsLoading(true);
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccounts([]);
    if (accounts.length > 1) {
      onOpen();
      setAccounts(accounts);
    } else {
      setAddress(accounts[0]);
    }
    setIsLoading(false);
  }, [onOpen, setAddress]);

  useEffect(() => {
    if (!(window as any).ethereum) {
      alert("Please install MetaMask first.");
      return;
    }
    fetchUserAddress();
  }, [fetchUserAddress]);

  return (
    <NextNavbar className="backdrop-blur border-b">
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link
            href={"/"}
            className="font-bold text-inherit flex items-center gap-1"
          >
            <GiSamuraiHelmet size={36} />
            ContractGuard
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <Link
            href="/contract-list"
            className="w-[110px] flex items-center gap-1"
          >
            <MdDashboard />
            Contracts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/create-contract"
            className="w-[110px] flex items-center gap-1"
          >
            <FaSearch />
            Search
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onClick={async () => {
                  if (address) {
                    setAddress(null);
                    return;
                  }
                }}
              >
                {address ? "Log Out" : "Sign Up"}
              </Button>
            </NavbarItem>
            <NavbarItem>
              {" "}
              <Button
                as={Link}
                color="primary"
                href="#"
                onClick={async () => {
                  if (!(window as any).ethereum) {
                    alert("Please install MetaMask first.");
                    return;
                  }

                  await fetchUserAddress();
                }}
              >
                {address ? address : "Sign In"}
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  <ModalHeader>Choose an account</ModalHeader>
                  <ModalBody>
                    {
                      <div className="flex flex-col gap-2">
                        {accounts &&
                          accounts.map((acc: string, index: number) => {
                            return (
                              <Button
                                key={index}
                                onClick={() => {
                                  setAddress(acc);
                                  onOpenChange();
                                }}
                              >
                                {acc}
                              </Button>
                            );
                          })}
                      </div>
                    }
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
