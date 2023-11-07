import Axios from 'axios';
import routes from '@/routes';
import { RegisterValues } from '@/types/Users/RegisterValues';

const register = async (values: RegisterValues) => {
  const url = routes.api.baseUrl() + routes.api.users.register();

  try {
    const { data } = await Axios.post(url, values);

    return [null, data];
  } catch (error) {
    return [Array.isArray(error) ? error : [error]];
  }
};

export default register;
