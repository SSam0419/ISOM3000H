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
import SignUpButton from "./SignUpButton";
import { usePathname } from "next/navigation";
import { ContractActions } from "@/utils/contractActions";

const Navbar = () => {
  const path = usePathname();
  const setAddress = useUserStore((state) => state.setAddress);
  const address = useUserStore((state) => state.address);
  const [accounts, setAccounts] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const fetchUserAddress = useCallback(async () => {
    setIsLoading(true);
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccounts([]);
    if (accounts.length > 1) {
      const accountIndex = localStorage.getItem("selectedAccountIndex");
      if (accountIndex) {
        setAddress(accounts[parseInt(accountIndex)]);
        const user = await ContractActions.getUser(
          accounts[parseInt(accountIndex)]
        );
        setUsername(user.name || "");
      } else {
        onOpen();
        setAccounts(accounts);
      }
    } else {
      setAddress(accounts[0]);
      const user = await ContractActions.getUser(accounts[0]);
      setUsername(user.name || "");
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
            className={`w-[110px] flex items-center gap-1 ${
              path === "/contract-list" ? "text-primary-200" : ""
            }`}
          >
            <MdDashboard
              className={path === "/contract-list" ? "text-primary-200" : ""}
            />
            Contracts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/search-profile"
            className={`w-[110px] flex items-center gap-1 ${
              path === "/search-profile" ? "text-primary-200" : ""
            }`}
          >
            <FaSearch
              className={path === "/search-profile" ? "text-primary-200" : ""}
            />
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
              {address ? (
                <Button
                  color="primary"
                  variant="flat"
                  onClick={() => {
                    setAddress(null);
                    localStorage.removeItem("selectedAccountIndex");
                  }}
                >
                  Log Out
                </Button>
              ) : (
                <SignUpButton />
              )}
            </NavbarItem>
            <NavbarItem>
              {" "}
              <Button
                color="primary"
                onClick={async () => {
                  if (!(window as any).ethereum) {
                    alert("Please install MetaMask first.");
                    return;
                  }

                  await fetchUserAddress();
                }}
              >
                {address
                  ? username.length > 0
                    ? username
                    : address
                  : "Sign In"}
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
                                onClick={async () => {
                                  setAddress(acc);
                                  const user = await ContractActions.getUser(
                                    acc
                                  );
                                  setUsername(user.name || "");
                                  onOpenChange();
                                  localStorage.setItem(
                                    "selectedAccountIndex",
                                    index.toString()
                                  );
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
