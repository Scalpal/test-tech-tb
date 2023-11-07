import jsonwebtoken from 'jsonwebtoken';

const checkToken = async (token: string) => {
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const decodedToken = jsonwebtoken.decode(token);

  if (
    typeof decodedToken !== 'string'
    && decodedToken !== null
    && decodedToken.exp
  ) {
    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

    if (isTokenExpired) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  return {
    valid: true,
  };
};

export default checkToken;
