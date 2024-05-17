"use client";
import { useUserStore } from "@/lib/states/userStore";
import { Button } from "@nextui-org/react";
import { ethers } from "ethers";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface UserInfo {
  name: string;
  candidateAddress: string;
}

const UserWallet = () => {
  const address = useUserStore((state) => state.address);
  const setAddress = useUserStore((state) => state.setAddress);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    // check if the browser has MetaMask installed
    if (!(window as any).ethereum) {
      alert("Please install MetaMask first.");
      return;
    }
    // get the user's account address
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0]);
  };

  useEffect(() => {
    // fetchUser();
  }, []);

  const signer = useMemo(() => {
    if (!address) return null;
    return new ethers.BrowserProvider((window as any).ethereum).getSigner();
  }, [address]);

  const _ = useCallback(async () => {
    if (!signer) return;
    setLoading(true);
    try {
      const ballotContract = new ethers.Contract(
        "CONTRACT_ADDRESS",
        [],
        await signer
      );
      // show a pop-up to the user to confirm the transaction
      const name = prompt("Please enter your name");
      if (!name) return;
      const tx = await ballotContract.registerCandidate(name);
      // wait for the transaction to be mined
      await tx.wait();
    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
    setLoading(false);
  }, [signer]);

  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.BrowserProvider((window as any).ethereum);
  }, []);

  return (
    <div>
      {!address ? (
        <Button onClick={fetchUser}>Connect to the website</Button>
      ) : (
        <>
          <span>{address}</span>
        </>
      )}
    </div>
  );
};

export default UserWallet;
