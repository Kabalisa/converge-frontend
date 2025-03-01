import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import NextButton from '../../../src/components/onboarding/officeStructure/nextButton';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../src/graphql/mutations/Preview';

describe('NextButton component', () => {
  const mocks = [
    {
      request: {
        query: ADD_LEVEL_SETUP_MUTATION,
        variables: {
          flattenedData: [
            {
              structureId: 'structureId',
              level: 4,
              name: 'test office',
              parentId: 'parentId',
              parentTitle: 'parentTitle',
              tag: 'tag',
              locationId: 100,
              position: 1,
            },
          ],
        },
      },
      result: {
        data: {
          structure: {
            structureId: '46363yettete989',
            name: 'offices',
            tag: 'buildings',
            locationId: 123,
            position: 0,
            level: 1,
          },
        },
      },
    },
  ];

  const props = {
    flattenedData: [
      {
        structureId: 'structureId',
        level: 4,
        name: 'test office',
        parentId: 'parentId',
        parentTitle: 'parentTitle',
        tag: 'tag',
        locationId: 100,
        position: 1,
      },
    ],
  };

  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NextButton {...props} />
    </MockedProvider>,
  );

  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should click the button', () => {
    wrapper.find('button').simulate('click');
  });
});
