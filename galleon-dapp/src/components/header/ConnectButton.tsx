import { colors } from "styles/colors";

import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useEthers, useLookupAddress } from "@usedapp/core";
import { useToast } from "@chakra-ui/react";

import ConnectModal from "./ConnectModal";
import NetworkSelector from "./NetworkSelector";
import { useEffect, useState } from "react";
import { logger } from "index";
import { KNOWN_SERVICES, KNOWN_LABELS } from "@galleondao/logging-lib";
import { useNetwork } from "hooks/useNetwork";
import {
  PendingTransactionState,
  useWaitForTransaction,
} from "hooks/useWaitForTransaction";
import { isSupportedNetwork } from "utils";
import { getBlockExplorerUrl } from "utils/blockExplorer";
import TransactionStateHeader, {
  TransactionStateHeaderState,
} from "./TransactionStateHeader";

const ConnectButton = () => {
  const { account, chainId, deactivate } = useEthers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState("");
  const id = "login-toast";
  let ens = useLookupAddress();
  const toast = useToast();
  const { changeNetwork } = useNetwork();
  const { pendingTxHash, pendingTxState } = useWaitForTransaction();
  const txStateHeaderState = getHeaderState(pendingTxState);
  const supportedNetwork = isSupportedNetwork(chainId ?? -1);

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
        serviceName: KNOWN_SERVICES.GALLEON_DAPP,
        environment: process.env.NODE_ENV,
        label: KNOWN_LABELS.WALLET_CONNECT,
        metadata: {
          address: account,
          referrer: document.referrer === "" ? "direct" : document.referrer,
        },
      });

      console.log("Successful Wallet Connection", {
        user: {
          name: account,
        },
      });
    }
  };

  useEffect(() => {
    if (!toast.isActive(id) && account) {
      toast({
        id,
        title: "Connected",
        description: account,
        variant: "info",
        duration: 3000,
        isClosable: true,
        containerStyle: {
          borderRadius: "1rem",
          border: "2px solid #040728",
          backgroundColor: " #FEF3E2",
          color: "#040728",
        },
      });
      sendWalletConnectionEvent();
    }
  }, [account]);

  const onClickTransactionState = () => {
    if (!pendingTxHash || pendingTxState === PendingTransactionState.none)
      return;
    const explorerUrl = getBlockExplorerUrl(pendingTxHash, chainId);
    const newWindow = window.open(explorerUrl, "_blank");
    newWindow?.focus();
  };

  const onWrongNetworkButtonClicked = () => {
    changeNetwork("1");
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
          className="ml-4 inline-block bg-theme-oldlace shadow-sm shadow-theme-black text-theme-navy  py-1.5 px-4 border-2 border-theme-champagne rounded-xl text-base font-medium  hover:bg-theme-champagne"
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
        {pendingTxState === PendingTransactionState.none ? (
          <span className="hidden md:inline-flex items-center px-3 py-0.5 rounded-xl text-base font-medium bg-transparent ">
            <svg
              className="-ml-1 mr-1.5 h-2 w-2 text-theme-oldlace animate animate-pulse"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            <span className="text-theme-oldlace">{formatAccountName()}</span>
          </span>
        ) : (
          <TransactionStateHeader
            isDarkMode={false}
            onClick={onClickTransactionState}
            state={txStateHeaderState}
          />
        )}

        <button
          onClick={handleDisconnect}
          className="ml-4 inline-block bg-theme-navy shadow-sm shadow-theme-black text-theme-oldlace py-1.5 px-4  rounded-xl text-base  border-theme-oldlace border-2 hover:bg-opacity-75"
        >
          Disconnect
        </button>
        <NetworkSelector />
      </span>
    );
  };

  const wrongNetworkButton = () => {
    return (
      <div>
        <button
          onClick={onWrongNetworkButtonClicked}
          className="ml-4 inline-block bg-theme-oldlace shadow-sm shadow-theme-black text-theme-navy  py-1.5 px-4 border-2 border-theme-champagne rounded-xl text-base font-medium  hover:bg-theme-champagne"
        >
          Wrong Network
        </button>

        <ConnectModal isOpen={isOpen} onClose={onClose} />
      </div>
    );
  };

  if (supportedNetwork) {
    return account ? disconnectButton() : connectButton();
  }

  return wrongNetworkButton();
};

const getHeaderState = (
  pendingTxState: PendingTransactionState
): TransactionStateHeaderState => {
  switch (pendingTxState) {
    case PendingTransactionState.failed:
      return TransactionStateHeaderState.failed;
    case PendingTransactionState.none:
      return TransactionStateHeaderState.none;
    case PendingTransactionState.pending:
      return TransactionStateHeaderState.pending;
    case PendingTransactionState.success:
      return TransactionStateHeaderState.success;
  }
};

export default ConnectButton;
