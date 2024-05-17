import { ContractActions } from "@/utils/contractActions";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";

const SignUpButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [hint, setHint] = useState<{
    message: string;
    isError: boolean;
  }>({
    message: "",
    isError: false,
  });

  const connectWallet = async () => {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setSelectedAccount(accounts[0]);
  };

  return (
    <>
      <Button color="primary" variant="flat" onClick={onOpen}>
        Sign Up
      </Button>
      <Modal onOpenChange={onOpenChange} isOpen={isOpen} backdrop="blur">
        <ModalContent>
          <ModalHeader>Sign Up Form</ModalHeader>
          <ModalBody>
            <form
              className="flex flex-col gap-3"
              onSubmit={async (e) => {
                e.preventDefault();

                if (!selectedAccount) {
                  alert("Please connect your wallet");
                  return;
                }
                setIsSubmitting(true);
                try {
                  await ContractActions.registerUser({
                    username,
                    title,
                  });

                  setHint({
                    message: "Successfully registered",
                    isError: false,
                  });
                } catch (error) {
                  console.log((error as any).data.message);

                  setHint({
                    message:
                      (error as any).data.message ||
                      "Something went wrong! Make sure you are connected to the right network",
                    isError: true,
                  });
                }
                setIsSubmitting(false);
              }}
            >
              <Input
                isRequired
                isDisabled={isSubmitting}
                label="Username"
                type="text"
                placeholder="username e.g. John Doe"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                id="title"
                isRequired
                isDisabled={isSubmitting}
                label="Title"
                type="text"
                placeholder="title e.g. UI/UX Designer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {accounts.length === 0 && !selectedAccount && (
                <Button onPress={connectWallet} className="w-full">
                  Connect Wallet
                </Button>
              )}
              {accounts.length > 0 && !selectedAccount && (
                <div className="flex flex-col">
                  <p className="text-base my-1 font-light">
                    Select account you would like to connect to
                  </p>
                  {accounts.map((account) => (
                    <Button
                      className="my-1"
                      key={account}
                      onPress={() => setSelectedAccount(account)}
                    >
                      {account}
                    </Button>
                  ))}
                  <Button
                    className="my-1"
                    variant="bordered"
                    onPress={() => setAccounts([])}
                  >
                    Reconnect
                  </Button>
                </div>
              )}
              {selectedAccount && (
                <div>
                  <p>Selected Account: </p>{" "}
                  <p className="text-muted text-xs mb-1">
                    (the first account in your Wallet will be used to sign up)
                  </p>
                  <p className="italic font-light">{selectedAccount}</p>
                </div>
              )}
              {hint.message && (
                <p
                  className={
                    hint.isError
                      ? "text-danger text-sm"
                      : "text-success test-sm"
                  }
                >
                  {hint.message}
                </p>
              )}
              <div className="flex gap-1 my-5">
                <Button
                  type="button"
                  className="w-full"
                  color="primary"
                  variant="bordered"
                  onPress={onOpenChange}
                  isLoading={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  color="primary"
                  isLoading={isSubmitting}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpButton;
