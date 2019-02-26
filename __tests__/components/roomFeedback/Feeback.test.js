import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoomFeedback } from '../../../src/components/roomFeedback/RoomFeedback';
import defaultUserRole from '../../../src/fixtures/user';

describe('RoomFeeback Component', () => {
  const wrapper = mount(
    <MockedProvider>
      <Router>
        <RoomFeedback user={defaultUserRole} />
      </Router>,
    </MockedProvider>,
  );
  it('should render table row property while rendering the component', () => {
    expect(wrapper.find('tr')).toHaveLength(2);
  });

  it('should has empty user prop', () => {
    const roomFeedback = shallow(<RoomFeedback user={{}} />);
    expect(roomFeedback.props().user).toBeFalsy();
  });
});
