import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { RoomFeedback } from '../../../src/components/roomFeedback/RoomFeedback';
import defaultUserRole from '../../../src/fixtures/user';
import ErrorIcon from '../../../src/components/commons/ErrorIcon';

describe('RoomFeeback Component', () => {
  const testProps = {
    data: {
      questions: {
        questions: [{
          id: '1',
          questionId: '3',
          question: 'test question',
          questionTitle: 'my title',
          startDate: '2019-05-21 13:32:15.753',
          endDate: '2019-05-22 13:32:15.753',
          questionResponseCount: 2,
          questionType: 'test',
          isActive: true,
        }],
      },
      loading: false,
      error: undefined,
    },
    user: defaultUserRole,
    client: {},
  };
  const wrapper = mount(
    <MockedProvider>
      <RoomFeedback user={defaultUserRole} {...testProps} />
    </MockedProvider>,
  );
  it('should render table headers property while rendering the component', () => {
    expect(wrapper.find('.table__headers')).toHaveLength(1);
  });

  it('should have empty user prop', () => {
    const roomFeedback = shallow(<RoomFeedback user={{}} {...testProps} />);
    expect(roomFeedback.props().user).toBeFalsy();
  });

  it('should have an error component with length 1', () => {
    const newProps = {
      loading: false,
      error: undefined,
      data: { questions: { questions: [] } },
      user: {},
      client: {},
    };
    const roomFeedback = shallow(<RoomFeedback {...newProps} />);
    expect(roomFeedback.find(ErrorIcon)).toHaveLength(1);
  });
});
