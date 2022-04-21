import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  ETH,
  EthMaxYieldIndex,
  DoubloonToken,
  SolunavaxIndex,
} from "constants/tokens";
import { fetchHistoricalTokenMarketData } from "utils/coingeckoApi";

export interface TokenMarketDataValues {
  prices?: number[][];
  hourlyPrices?: number[][];
  marketcaps?: number[][];
  volumes?: number[][];
}

export interface TokenContext {
  eth?: TokenMarketDataValues;
  doubloon?: TokenMarketDataValues;
  ethmaxy?: TokenMarketDataValues;
  solunavax?: TokenMarketDataValues;

  selectLatestMarketData: (...args: any) => number;
}

export type TokenContextKeys = keyof TokenContext;

export const MarketDataContext = createContext<TokenContext>({
  selectLatestMarketData: () => 0,
});

export const useMarketData = () => useContext(MarketDataContext);

export const MarketDataProvider = (props: { children: any }) => {
  const [ethMarketData, setEthMarketData] = useState<any>({});
  const [doubloonMarketData, setDoubloonMarketData] = useState<any>({});
  const [ethmaxyMarketData, setEthmaxyMarketData] = useState<any>({});
  const [solunavaxMarketData, setSolunavaxMarketData] = useState<any>({});

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0;

  const fetchMarketData = useCallback(async () => {
    const marketData = await Promise.all([
      fetchHistoricalTokenMarketData(ETH.coingeckoId),
      fetchHistoricalTokenMarketData(DoubloonToken.coingeckoId),
      fetchHistoricalTokenMarketData(EthMaxYieldIndex.coingeckoId),
      fetchHistoricalTokenMarketData(SolunavaxIndex.coingeckoId),
    ]);

    setEthMarketData(marketData[0]);
    setDoubloonMarketData(marketData[1]);
    setEthmaxyMarketData(marketData[2]);
    setEthmaxyMarketData(marketData[3]);
  }, []);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  return (
    <MarketDataContext.Provider
      value={{
        selectLatestMarketData,
        eth: ethMarketData,
        doubloon: doubloonMarketData,
        ethmaxy: ethmaxyMarketData,
        solunavax: solunavaxMarketData,
      }}
    >
      {props.children}
    </MarketDataContext.Provider>
  );
};
