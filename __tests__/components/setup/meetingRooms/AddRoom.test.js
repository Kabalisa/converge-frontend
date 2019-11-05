import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooks } from '@apollo/react-hooks';
import { mount } from 'enzyme';
import apolloClient from '../../../../src/utils/ApolloClient';
import AddRoom from '../../../../src/components/setup/meetingRooms/AddRoom';


describe('<AddRooms /> spec', () => {
  it('it render without failling', () => {
    const wrapper = mount(
      <ApolloProvider client={apolloClient}>
        <ApolloHooks client={apolloClient}>
          <AddRoom />
        </ApolloHooks>
      </ApolloProvider>,
    );
    expect(wrapper.length).toEqual(1);
  });
});
