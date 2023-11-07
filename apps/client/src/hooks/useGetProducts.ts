import useSWR from 'swr';
import routes from '@/routes';
import getApiClient from '@/services/getApiClient';

const fetcher = async (url: string): Promise<any> => {
  const reqInstance = getApiClient(null);

  try {
    const { data } = await reqInstance.get(url);

    return data.result;
  } catch (error) {
    return [Array.isArray(error) ? error : [error]];
  }
};

type UseGetProductsResult = {
  productsData: any,
  productsError: any,
  productsIsLoading: boolean,
  refreshProducts: any,
};

function useGetProducts(searchValue: string): UseGetProductsResult {
  const url = routes.api.baseUrl() + routes.api.products.all(searchValue);
  const config = {
    revalidateOnFocus: false,
  };

  const {
    data, error, isLoading, mutate,
  } = useSWR(url, fetcher, config);

  return {
    productsData: data,
    productsError: error,
    productsIsLoading: isLoading,
    refreshProducts: mutate,
  };
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useGetProducts;
