import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

const SignUpButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const connectWallet = async () => {};

  return (
    <>
      <Button color="primary" variant="flat" onClick={onOpen}>
        Sign Up
      </Button>
      <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>Sign Up Form</ModalHeader>
          <ModalBody>
            <form className="flex flex-col gap-3">
              <Input
                isRequired
                label="Username"
                type="text"
                placeholder="username e.g. John Doe"
              />
              <Input
                isRequired
                label="Title"
                type="text"
                placeholder="title e.g. UI/UX Designer"
              />
              <Button onPress={connectWallet} className="w-full">
                Connect Wallet
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              className="w-full"
              color="primary"
              variant="bordered"
              onPress={onOpenChange}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full" color="primary">
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpButton;
