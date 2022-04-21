import { Box, Flex, Text } from "@chakra-ui/layout";

export interface ProductStat {
  title: string;
  value: string;
}

const ProductStatView = ({ title, value }: ProductStat) => (
  <Flex direction="column">
    <Text fontSize="16px" fontWeight="400">
      {title}
    </Text>
    <Text fontSize="28px" fontWeight="600" mt="16px">
      {value}
    </Text>
  </Flex>
);

const ProductStats = ({ stats }: { stats: ProductStat[] }) => {
  return (
    <Flex
      alignItems={["flex-start", "center"]}
      direction="row"
      justify={["left", "space-between"]}
      w="100%"
      flexWrap="wrap"
    >
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-6 bg-transparent">
          {stats.map((productStat, index) => (
            <div
              key={productStat.title}
              className="px-4 py-5 bg-transparent shadow border-2 border-theme-navy rounded-md overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-theme-black truncate">
                {productStat.title}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-theme-black">
                {productStat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Flex>
  );
};

export default ProductStats;
