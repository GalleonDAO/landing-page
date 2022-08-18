import { useEffect, useState } from 'react'

import { Box, Flex, Image, useBreakpointValue } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import duneLogo from 'assets/dune.png'
import QuickTrade from 'components/dashboard/QuickTrade'
import Page from 'components/Page'
import { getPriceChartData } from 'components/product/PriceChartData'
import { DoubloonToken, Token } from 'constants/tokens'
import {
  TokenMarketDataValues,
  useMarketData,
} from 'providers/MarketData/MarketDataProvider'
import { SetComponent } from 'providers/SetComponents/SetComponentsProvider'
import { displayFromWei } from 'utils'
import {
  getFormattedChartPriceChanges,
  getPricesChanges,
} from 'utils/priceChange'
import { getTokenSupply } from 'utils/setjsApi'

import MarketChart, { PriceChartRangeOption } from './MarketChart'
import ProductComponentsTable from './ProductComponentsTable'
import ProductHeader from './ProductHeader'
import ProductPageSectionHeader from './ProductPageSectionHeader'
import ProductStats, { ProductStat } from './ProductStats'
import QuickPerpTrade from 'components/dashboard/QuickPerpTrade'

function getStatsForToken(
  tokenData: Token,
  marketData: TokenMarketDataValues,
  currentSupply: number,
): ProductStat[] {
  const dailyPriceRange = PriceChartRangeOption.DAILY_PRICE_RANGE
  const hourlyDataInterval = 24

  let formatter = Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    notation: 'compact',
  })

  let supplyFormatter = Intl.NumberFormat('en', { maximumFractionDigits: 2 })

  const marketCap =
    marketData.marketcaps
      ?.slice(-dailyPriceRange * hourlyDataInterval)
      ?.slice(-1)[0]
      ?.slice(-1)[0] ?? 0
  const marketCapFormatted = formatter.format(marketCap)

  const supplyFormatted = supplyFormatter.format(currentSupply)

  const volume =
    marketData.volumes
      ?.slice(-dailyPriceRange * hourlyDataInterval)
      ?.slice(-1)[0]
      ?.slice(-1)[0] ?? 0
  const volumeFormatted = formatter.format(volume)

  return [
    { title: 'Market Cap', value: marketCapFormatted },
    { title: 'Streaming Fee', value: tokenData.fees?.streamingFee ?? 'n/a' },
    { title: 'Mint Fee', value: tokenData.fees?.mintFee ?? 'n/a' },
    { title: 'Redeem Fee', value: tokenData.fees?.redeemFee ?? 'n/a' },
    {
      title: 'Performance Fee',
      value: tokenData.fees?.performanceFee ?? 'n/a',
    },
  ]
}

const PortfoliosPage = (props: {
  tokenData: Token
  marketData: TokenMarketDataValues
  components: SetComponent[]
  isLeveragedToken?: boolean
  perpIssuance?: boolean
  apy?: string
  hasDashboard?: boolean
  isPortfolio?: boolean
  children?: any
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const { marketData, tokenData } = props

  const { chainId, library } = useEthers()
  const { selectLatestMarketData } = useMarketData()

  const [currentTokenSupply, setCurrentTokenSupply] = useState(0)

  useEffect(() => {
    console.log('components', props.components)

    const tokenAddress = tokenData.address

    if (
      tokenAddress === undefined ||
      library === undefined ||
      chainId === undefined
    ) {
      return
    }

    const fetchSupply = async () => {
      try {
        const setDetails = await getTokenSupply(
          library,
          [tokenAddress],
          chainId,
        )
        if (setDetails.length < 1) return
        const supply = parseFloat(
          displayFromWei(setDetails[0].totalSupply) ?? '0',
        )
        setCurrentTokenSupply(supply)
      } catch (error) {
        console.log(error)
      }
    }

    fetchSupply()
  }, [chainId, library, tokenData])

  const priceChartData = getPriceChartData([marketData])

  const price = `$${selectLatestMarketData(marketData.hourlyPrices).toFixed(2)}`
  const priceChanges = getPricesChanges(marketData.hourlyPrices ?? [])
  const priceChangesFormatted = getFormattedChartPriceChanges(priceChanges)

  const stats = getStatsForToken(tokenData, marketData, currentTokenSupply)
  const chartWidth = window.outerWidth < 400 ? window.outerWidth : 580
  const chartHeight = window.outerWidth < 400 ? 300 : 400

  return (
    <Page>
      <Flex direction="column" w={['100%']} m="0 auto">
        <Flex direction="column">
          <Box mb={['16px', '48px']}>
            <ProductHeader
              isMobile={isMobile ?? false}
              tokenData={props.tokenData}
            />
          </Box>

          <div className="flex justify-center gap-6 ">
            <div className="max-w-xl flex  items-center justify-center bg-theme-oldlace border-2 border-theme-navy rounded-2xl shadow-md shadow-theme-black  divide-y divide-theme-navy">
              <div className="max-w-xl  flex items-center justify-between p-6 space-x-6">
                <Flex direction="column" grow={1} flexBasis="0">
                  <p className="px-10 pt-5 text-2xl font-semibold font-morion text-theme-navy">
                    Overview
                  </p>
                  <p className="px-10 pt-2 text-theme-navy">
                    {tokenData.summary}
                  </p>
                  <p className="px-10 pt-5 text-2xl font-semibold font-morion text-theme-navy -mb-6">
                    Buy {tokenData.symbol}
                  </p>
                  <QuickTrade
                    isNarrowVersion={false}
                    singleToken={tokenData}
                    eiOnly={true}
                  >
                    {props.children}
                  </QuickTrade>
                </Flex>
              </div>
            </div>
          </div>

          {props.hasDashboard && (
            <div className="mt-10">
              <div className="max-w-7xl mx-auto ">
                <div className="p-2 border-2 border-theme-navy rounded-2xl bg-theme-oldlace shadow-md shadow-theme-black sm:p-3">
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="flex p-2 rounded-2xl bg-theme-champagne">
                        <Image
                          src={duneLogo}
                          alt={'dune logo'}
                          w="32px"
                          h="32px"
                        />
                      </span>
                      <p className="ml-3 font-medium text-lg text-theme-navy truncate">
                        <span className="md:hidden">
                          {props.tokenData.name} Analytics.
                        </span>
                        <span className="hidden md:inline">
                          {props.tokenData.name} Analytics. Check our Dune
                          Dashboard for on-chain product insights.
                        </span>
                      </p>
                    </div>
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                      <a
                        target={'_blank'}
                        href={props.tokenData.dashboard}
                        className="flex items-center justify-center px-4 py-2  rounded-2xl shadow-sm font-medium text-lg text-theme-navy bg-theme-champagne border-2 border-theme-navy hover:opacity-70"
                        rel="noreferrer"
                      >
                        Dashboard
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Flex>
      </Flex>
    </Page>
  )
}

export default PortfoliosPage