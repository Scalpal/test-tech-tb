import useSWR from 'swr';
import routes from '@/routes';
import getApiClient from '@/services/getApiClient';

const fetcher = async (url: string): Promise<any> => {
  const reqInstance = getApiClient(null);

  try {
    const { data } = await reqInstance.get(url);

    return data.orders;
  } catch (error) {
    return [Array.isArray(error) ? error : [error]];
  }
};

type UseGetOrdersResult = {
  ordersData: any,
  ordersError: any,
  ordersIsLoading: boolean,
  refreshorders: any,
};

function useGetOrders(): UseGetOrdersResult {
  const url = routes.api.baseUrl() + routes.api.order();
  const config = {
    revalidateOnFocus: false,
  };

  const {
    data, error, isLoading, mutate,
  } = useSWR(url, fetcher, config);

  return {
    ordersData: data,
    ordersError: error,
    ordersIsLoading: isLoading,
    refreshorders: mutate,
  };
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useGetOrders;
