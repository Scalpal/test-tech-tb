import Axios from 'axios';
import { parseCookies } from 'nookies';

const getApiClient = (context: any) => {
  const { token } = parseCookies(context);

  const reqInstance = Axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });

  return reqInstance;
};

export default getApiClient;
