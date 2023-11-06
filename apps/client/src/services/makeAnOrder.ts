import routes from '@/routes';
import getApiClient from './getApiClient';

const makeAnOrder = async (values: any) => {
  const reqInstance = getApiClient(null);
  const url = routes.api.baseUrl() + routes.api.order();

  try {
    const { data } = await reqInstance.post(url, values);

    return [null, data];
  } catch (error) {
    return Array.isArray(error) ? error : [error];
  }
};

export default makeAnOrder;
