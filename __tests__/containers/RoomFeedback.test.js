import React from 'react';
import { shallow } from 'enzyme';
import '../matchMedia.test';
import AddQuestionComponent from '../../src/components/roomFeedback/AddQuestion';
import RoomFeedbackPage from '../../src/containers/RoomFeedbackPage';
import Button from '../../src/components/commons/Button';
import { getUserDetails, getRoomFeedbackQuestions, getAllResponses } from '../../src/components/helpers/QueriesHelpers';

jest.mock('../../src/components/helpers/QueriesHelpers');


describe('RoomFeedback component', () => {
  const questions = [{
    id: '1',
    questionId: '3',
    question: 'test question',
    questionTitle: 'my title',
    startDate: '2019-05-21 13:32:15.753',
    endDate: '2019-05-22 13:32:15.753',
    questionResponseCount: 2,
    questionType: 'test',
    isActive: true,
  }];

  const tick = () => new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

  const allResponses = {
    pages: null,
    hasPrevious: null,
    hasNext: null,
    queryTotal: null,
    responses: [{
      roomId: 1184,
      roomName: 'Tortuga',
      totalResponses: 2,
      response: [
        {
          id: 296,
          createdDate: '2019-06-25T14:47:34.434065',
          resolved: false,
          response: {
            __typename: 'Rate',
            rate: 3,
          },
        },
        {
          id: 297,
          createdDate: '2019-06-25T14:47:35.583645',
          resolved: false,
          response: {
            __typename: 'MissingItems',
            missingItems: [],
          },
        },
      ],
    }, {
      roomId: 1180,
      roomName: 'pandora edited',
      totalResponses: 4,
      response: [
        {
          id: 289,
          createdDate: '2019-06-25T14:45:26.577611',
          resolved: false,
          response: {
            __typename: 'Rate',
            rate: 5,
          },
        },
        {
          id: 311,
          createdDate: '2019-07-01T09:59:38.846630',
          resolved: false,
          response: {
            __typename: 'SelectedOptions',
            options: [
              'red',
            ],
          },
        },
        {
          id: 290,
          createdDate: '2019-06-25T14:45:27.942964',
          resolved: false,
          response: {
            __typename: 'Rate',
            rate: 5,
          },
        },
        {
          id: 291,
          createdDate: '2019-06-25T14:46:06.718295',
          resolved: false,
          response: {
            __typename: 'SelectedOptions',
            options: [
              'handywork',
            ],
          },
        },
      ],
    }],
  };

  const noRatingResponses = {
    pages: null,
    hasPrevious: null,
    hasNext: null,
    queryTotal: null,
    responses: [{
      roomId: 1184,
      roomName: 'Tortuga',
      totalResponses: 2,
      response: [
        {
          id: 297,
          createdDate: '2019-06-25T14:47:35.583645',
          resolved: false,
          response: {
            __typename: 'MissingItems',
            missingItems: [],
          },
        },
      ],
    }, {
      roomId: 1180,
      roomName: 'pandora edited',
      totalResponses: 4,
      response: [
        {
          id: 311,
          createdDate: '2019-07-01T09:59:38.846630',
          resolved: false,
          response: {
            __typename: 'SelectedOptions',
            options: [
              'red',
            ],
          },
        },
        {
          id: 291,
          createdDate: '2019-06-25T14:46:06.718295',
          resolved: false,
          response: {
            __typename: 'SelectedOptions',
            options: [
              'handywork',
            ],
          },
        },
      ],
    }],
  };

  getAllResponses.mockResolvedValue(allResponses);
  let wrapper;
  beforeAll(() => {
    getRoomFeedbackQuestions.mockResolvedValue(questions);
    getUserDetails.mockResolvedValue({
      id: '214',
      roles: [{ id: 2, role: 'Admin' }],
    });
    wrapper = shallow(<RoomFeedbackPage />);
    wrapper.instance().getData(false);
  });

  it('should render RoomQuestions component with length of 1 ', () => {
    expect(wrapper.find('#questions').length).toEqual(1);
  });

  it('should display the addQuestion button', () => {
    wrapper.setState({ activeTab: 'questions' });
    expect(wrapper.find(AddQuestionComponent).length).toEqual(1);
  });

  it('should  change the value of isResponsePageVisible to true', () => {
    expect(wrapper.state().isResponsePageVisible).toEqual(false);
    wrapper.find(Button).at(1).dive().find('.responses-tab-nav')
      .simulate('click');
    expect(wrapper.state().isResponsePageVisible).toEqual(true);
  });

  it('should have a div with classname responsePage with length of 1 ', () => {
    wrapper.update();
    wrapper.setState({ activeTab: 'responses' });
    expect(wrapper.find('#responses').length).toEqual(1);
  });

  it('should use and clear filters', async () => {
    expect(wrapper.state('useFilter')).toBe(false);
    wrapper.find('FilterRoomResponses').dive().find('.btn-primary').simulate('click');
    await tick();

    wrapper.setState({
      roomFilter: 'Tortuga',
      responseCutoff: { min: 2, max: 4 },
    });
    wrapper.instance().filterData();

    wrapper.setState({
      roomFilter: 'Tortuga',
      responseCutoff: { min: 2, max: 3 },
    });
    wrapper.instance().filterData();

    wrapper.setState({
      roomFilter: 'pandora edited',
      responseCutoff: { min: 3, max: 4 },
    });
    wrapper.instance().filterData();

    await tick();

    expect(sessionStorage.setItem).toHaveBeenLastCalledWith('feedbackActiveTab', 'responses');
    expect(wrapper.state('useFilter')).toBe(true);
    wrapper.find('FilterRoomResponses').dive().find('.btn-secondary').simulate('click');
    expect(wrapper.state('useFilter')).toBe(false);
  });

  it('should use date range', () => {
    wrapper.instance().sendDateData('Jun 4 2014', 'July 4 2019');
    expect(wrapper.state('startDate')).toBe('Jun 4 2014');
  });

  it('should toggle filter modal', () => {
    expect(wrapper.state('filterModal')).toBe(false);
    wrapper.instance().toggleFilterModal();
    expect(wrapper.state('filterModal')).toBe(true);
    wrapper.instance().toggleFilterModal();
    expect(wrapper.state('filterModal')).toBe(false);
    wrapper.instance().toggleFilterModal(false);
    expect(wrapper.state('filterModal')).toBe(false);
  });

  it('should set room', () => {
    wrapper.instance().setRoom('Foo');
    expect(wrapper.state('roomFilter')).toBe('Foo');
  });

  it('should set room', () => {
    wrapper.instance().setResponseCutoff({ min: 2, max: 7 });
    expect(wrapper.state('responseCutoff')).toEqual({ min: 2, max: 7 });
  });

  it('should return no ratings yet for average rating', () => {
    const rating = wrapper.instance().getTotalAverageRating(noRatingResponses.responses);
    expect(rating).toEqual('No ratings yet');
  });
});
