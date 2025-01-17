import { ARBITRUM, MAINNET, OPTIMISM, POLYGON } from "constants/chains";
import {
  BasisYieldEthIndex,
  DoubloonToken,
  EthMaxYieldIndex,
} from "constants/tokens";

const apiSupport = [MAINNET.chainId, POLYGON.chainId];

const alchemyApiUrl = (chainId: number) => {
  if (!apiSupport.includes(chainId)) {
    return undefined;
  }

  switch (chainId) {
    case MAINNET.chainId:
      return process.env.REACT_APP_MAINNET_ALCHEMY_API;
    case POLYGON.chainId:
      return process.env.REACT_APP_POLYGON_ALCHEMY_API;
    case OPTIMISM.chainId:
      return process.env.REACT_APP_POLYGON_ALCHEMY_API;
    case ARBITRUM.chainId:
      return process.env.REACT_APP_ARBITRUM_ALCHEMY_API;
    default:
      return process.env.REACT_APP_MAINNET_ALCHEMY_API;
  }
};

const contractAddresses: string[] = [
  EthMaxYieldIndex.address!,
  DoubloonToken.arbitrumAddress!,
  BasisYieldEthIndex.optimismAddress!,
];

interface AlchemyApiParams {
  fromBlock: string;
  toBlock: string;
  contractAddresses: string[];
  fromAddress?: string | null;
  toAddress?: string | null;
  maxCount: string;
  excludeZeroValue: boolean;
  category: string[];
}

export interface AlchemyApiTransaction {
  asset: string;
  blockNum: string;
  category: string;
  erc721TokenId: string | null;
  erc1155Metadata: string | null;
  from: string;
  hash: string;
  rawContract: {
    value: string;
    address: string;
    decimal: string;
  };
  to: string;
  tokenId: string | null;
  value: number;
}

const fetchTransactionHistory = async (
  alchemyApiUrl: string,
  fromAddress: string | null = null,
  toAddress: string | null = null
): Promise<AlchemyApiTransaction[]> => {
  if (alchemyApiUrl === undefined) return [];

  console.log("fetchTransactionHistory", alchemyApiUrl, fromAddress, toAddress);
  const params: AlchemyApiParams[] = [
    {
      fromBlock: "0xB82D69",
      toBlock: "latest",
      contractAddresses,
      maxCount: "0x20",
      excludeZeroValue: true,
      category: ["erc20"],
    },
  ];

  if (fromAddress !== null) {
    params[0].fromAddress = fromAddress;
  }

  if (toAddress !== null) {
    params[0].toAddress = toAddress;
  }

  const body = {
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  const resp = await fetch(alchemyApiUrl, requestOptions);
  const data = await resp.json();
  return data["result"]["transfers"];
};

export const getTransactionHistory = async (
  address: string,
  chainId: number
) => {
  const url = alchemyApiUrl(chainId);
  if (!url) return { from: [], to: [] };
  const fromTransactions = await fetchTransactionHistory(url, address, null);
  const toTransactions = await fetchTransactionHistory(url, null, address);
  return { from: fromTransactions, to: toTransactions };
};
