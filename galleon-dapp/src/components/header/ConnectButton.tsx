import { colors } from "styles/colors";

import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useEthers, useLookupAddress } from "@usedapp/core";

import ConnectModal from "./ConnectModal";
import NetworkSelector from "./NetworkSelector";
import { useState } from "react";
import { logger } from "index";
import { GALLEON_SERVICE, LABELS } from "@galleondao/logging-lib";

const ConnectButton = () => {
  const { account, deactivate } = useEthers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState("");
  let ens = useLookupAddress();

  const handleConnectWallet = () => {
    onOpen();
  };

  const handleDisconnect = () => {
    deactivate();
    onClose();
  };

  const sendWalletConnectionEvent = () => {
    if (account !== address) {
      setAddress(account);

      logger.logCounter({
        serviceName: GALLEON_SERVICE,
        environment: process.env.NODE_ENV,
        label: LABELS.VISIT,
        metadata: {
          address: account,
        },
      });

      console.log("Successful Wallet Connection", {
        user: {
          name: account,
        },
      });
    }
  };

  const handleAccount = () => {
    sendWalletConnectionEvent();
    return formatAccountName();
  };

  const formatAccountName = () => {
    if (ens) return `${ens}`;
    return (
      account &&
      `${account.slice(0, 6)}...${account.slice(
        account.length - 4,
        account.length
      )}`
    );
  };

  const connectButton = () => {
    return (
      <div>
        <button
          onClick={handleConnectWallet}
          className="ml-4 inline-block bg-theme-blue text-white  py-1.5 px-4 border border-transparent rounded-full text-base font-medium  hover:bg-opacity-75"
        >
          Connect
        </button>

        <ConnectModal isOpen={isOpen} onClose={onClose} />
      </div>
    );
  };

  const disconnectButton = () => {
    return (
      <span>
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-base font-medium bg-transparent ">
          <svg
            className="-ml-1 mr-1.5 h-2 w-2 text-theme-blue animate animate-pulse"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          <span className="text-theme-blue">{handleAccount()}</span>
        </span>

        <button
          onClick={handleDisconnect}
          className="ml-4 inline-block bg-theme-navy text-white py-1.5 px-4 border border-transparent rounded-full text-base font-medium hover:bg-opacity-75"
        >
          Disconnect
        </button>
        <NetworkSelector />
      </span>
    );
  };

  return account ? disconnectButton() : connectButton();
};
export default ConnectButton;
