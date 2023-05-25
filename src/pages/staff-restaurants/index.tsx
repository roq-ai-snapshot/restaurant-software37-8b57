import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getStaffRestaurants } from 'apiSdk/staff-restaurants';
import { StaffRestaurantInterface } from 'interfaces/staff-restaurant';
import { Error } from 'components/error';

function StaffRestaurantListPage() {
  const { data, error, isLoading } = useSWR<StaffRestaurantInterface[]>(
    () => '/staff-restaurants',
    () =>
      getStaffRestaurants({
        relations: ['users', 'restaurants'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Staff Restaurant
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>User Name</Th>
                  <Th>Restaurant Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.users?.name}</Td>
                    <Td>{record.restaurants?.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default StaffRestaurantListPage;
