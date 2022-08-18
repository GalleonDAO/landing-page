import {
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'

import PerformanceCell from 'components/products/PerformanceCell'
import TickerCell from 'components/products/TickerCell'
import {
  PriceChangeIntervals,
  ProductsTableProduct,
} from 'components/views/Products'
import { colors } from 'styles/colors'

type ProductsTableProps = {
  products: ProductsTableProduct[]
}

const PortfoliosTable = ({ products }: ProductsTableProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false })

  const colorScheme = 'blackAlpha'
  const amountOfIntervalsToShow = isMobile ? 2 : PriceChangeIntervals.length
  const priceChangeIntervals = PriceChangeIntervals.slice(
    0,
    amountOfIntervalsToShow,
  )

  return (
    <Table colorScheme={colorScheme}>
      <Thead>
        <Tr>
          <Th color={colors.themeNavy} p={['8px 8px', '12px 24px']}>
            Ticker
          </Th>
          <Th color={colors.themeNavy} p={['8px 8px', '12px 24px']}>
            Theme
          </Th>

          <Th color={colors.themeNavy} p={['8px 8px', '12px 24px']}>
            Description
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product.symbol}>
            <Td p={['16px 8px', '16px 24px']}>
              <TickerCell product={product} />
            </Td>
            <Td p={['16px 8px', '16px 24px']}>
              <Text className="text-theme-navy" fontWeight={'semibold'}>
                {product.theme}
              </Text>
            </Td>
            <Td p={['16px 8px', '16px 24px']}>
              <Text className="text-theme-navy" fontWeight={'normal'}>
                {product.summary}
              </Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default PortfoliosTable