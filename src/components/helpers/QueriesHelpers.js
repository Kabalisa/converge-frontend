import { GET_USER_QUERY } from '../../graphql/queries/People';
import { GET_LOCATIONS_QUERY, GET_ALL_ROOMS } from '../../graphql/queries/Rooms';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import apolloClient from '../../utils/ApolloClient';

const getUserDetails = async (client = apolloClient) => {
  const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
  const email = process.env.NODE_ENV === 'test' ? 'sammy.muriuki@andela.com' : userData.email;
  try {
    const data = client.readQuery(
      {
        query: GET_USER_QUERY,
        variables: {
          email,
        },
      },
      true,
    );
    return data.user;
  } catch (err) {
    const { data } = await client.query({
      query: GET_USER_QUERY,
      variables: { email },
    });
    const user = Object.assign({}, data.user);
    user.firstName = userData.firstName;
    return user;
  }
};

const getAllLocations = async (client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_LOCATIONS_QUERY,
      },
      true,
    );
    return data.allLocations;
  } catch (err) {
    const { data } = await client.query({
      query: GET_LOCATIONS_QUERY,
    });
    return data.allLocations;
  }
};

const getRoomList = async (client = apolloClient, userLocation) => {
  const { data } = await client.query({
    query: GET_ALL_ROOMS,
    variables: {
      location: userLocation,
      office: '',
      page: 1,
      perPage: 5,
    },
  });

  return data;
};


export { getUserDetails, getAllLocations, getRoomList };
