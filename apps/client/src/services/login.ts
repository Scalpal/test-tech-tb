import Axios from 'axios';
import routes from '@/routes';
import { LoginValues } from '@/types/Users/LoginValues';

const login = async (values: LoginValues) => {
  const url = routes.api.baseUrl() + routes.api.users.login();

  try {
    const { data } = await Axios.post(url, values);

    return [null, data];
  } catch (error) {
    return [Array.isArray(error) ? error : [error]];
  }
};

export default login;
