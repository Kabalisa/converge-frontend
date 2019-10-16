/* eslint-disable import/extensions */
import React from 'react';
import { shallow, mount } from 'enzyme';
import PreviewComponent from '.../../../src/components/setup/Preview';
import { mockedProps, flattenedData, firstLevelPropsWithThreePreviewButtons, firstLevelPropsWithFivePreviewButtons, multipleLevelsProps } from '../../../src/fixtures/Preview';

jest.mock('../../../src/utils/ApolloClient', () => ({
  mutate: () =>
    new Promise((resolve) => {
      resolve();
    }),
}));

describe('Preview page component', () => {
  let button;

  const wrapper = mount(<PreviewComponent {...firstLevelPropsWithThreePreviewButtons} />);

  describe('preview component with one level', () => {
    it('check initial state', () => {
      expect(wrapper.state('activeLevelPagination')).toEqual(0);
      expect(wrapper.state('activeLevel')).toEqual('0');
    });

    it('it renders the preview area', () => {
      const previewArea = wrapper.find('.form-area');
      const walkingIcon = wrapper.find('.form-area img').first();
      expect(previewArea).toHaveLength(1);
      expect(walkingIcon).toHaveLength(1);
    });

    it('it renders an image which is the walking icon as its first in the preview area', () => {
      const walkingIcon = wrapper.find('.form-area img').first();
      expect(walkingIcon).toHaveLength(1);
    });

    it('it renders a heading , subheading with text Preview your structure and Click any level to expand', () => {
      const heading = wrapper.find('.form-area h4');
      const subHeading = wrapper.find('.form-area p').first();
      expect(heading.text()).toContain('Preview your structure');
      expect(subHeading.text()).toContain('Click any level to expand');
    });

    it('it renders one button with text Save & Submit on the preview area', () => {
      button = wrapper.find('.form-area Button').last();
      expect(button).toHaveLength(1);
      expect(button.text()).toContain('Save & Submit');
    });

    it('it renders  This is your building on the first paragraph on the structure preview when one level is added.', () => {
      const structurePreviewParagraph = wrapper.find('.structure-preview p').first();
      expect(structurePreviewParagraph.text()).toContain('These are your Building');
    });

    it('it renders next icon in a level when preview buttons are more than four and none when its not more.', () => {
      let chevronIcon = wrapper.find('.arrow__right');
      let firstPreviewButton = wrapper.find('.preview-active-btn').first();
      let secondPreviewButton = wrapper.find('.preview-active-btn').at(1);
      let thirdPreviewButton = wrapper.find('.preview-active-btn').at(2);
      expect(firstPreviewButton.text()).toContain('1');
      expect(secondPreviewButton.text()).toContain('2');
      expect(thirdPreviewButton.text()).toContain('3');
      expect(chevronIcon).toHaveLength(0);

      wrapper.setProps(firstLevelPropsWithFivePreviewButtons);
      chevronIcon = wrapper.find('.arrow__right');
      firstPreviewButton = wrapper.find('.preview-active-btn').first();
      secondPreviewButton = wrapper.find('.preview-active-btn').at(1);
      thirdPreviewButton = wrapper.find('.preview-active-btn').at(2);
      const fourthPreviewButton = wrapper.find('.preview-active-btn').last();

      expect(firstPreviewButton.text()).toContain('Epic tower');
      expect(secondPreviewButton.text()).toContain('Block A');
      expect(thirdPreviewButton.text()).toContain('Block B');
      expect(fourthPreviewButton.text()).toContain('Block C');

      expect(wrapper.find('.arrow__right')).toHaveLength(1);
    });

    it('it renders first four preview buttons in a level on the preview structure when user adds level.', () => {
      const firstPreviewButton = wrapper.find('.preview-active-btn').first();
      const secondPreviewButton = wrapper.find('.preview-active-btn').at(1);
      const thirdPreviewButton = wrapper.find('.preview-active-btn').at(2);
      const fourthPreviewButton = wrapper.find('.preview-active-btn').last();
      expect(firstPreviewButton.text()).toContain('Epic tower');
      expect(secondPreviewButton.text()).toContain('Block A');
      expect(thirdPreviewButton.text()).toContain('Block B');
      expect(fourthPreviewButton.text()).toContain('Block C');
    });

    it('it renders next preview button in a level when user clicks next icon', () => {
      wrapper.find('.arrow__right').simulate('click');
      expect(wrapper.state('activeLevelPagination')).toEqual(4);
      const previewButton = wrapper.find('.preview-active-btn');
      expect(previewButton.text()).toContain('Block D');
    });

    it('it renders previous preview button in a level when user clicks previous icon', () => {
      wrapper.find('.arrow__left').simulate('click');
      expect(wrapper.state('activeLevelPagination')).toEqual(0);

      const firstPreviewButton = wrapper.find('.preview-active-btn').first();
      const secondPreviewButton = wrapper.find('.preview-active-btn').at(1);
      const thirdPreviewButton = wrapper.find('.preview-active-btn').at(2);
      const fourthPreviewButton = wrapper.find('.preview-active-btn').last();
      expect(firstPreviewButton.text()).toContain('Epic tower');
      expect(secondPreviewButton.text()).toContain('Block A');
      expect(thirdPreviewButton.text()).toContain('Block B');
      expect(fourthPreviewButton.text()).toContain('Block C');
    });

    it('it renders remove level icon on all four preview buttons displayed', () => {
      const removeLevel = wrapper.find('.remove-level');
      expect(removeLevel).toHaveLength(4);
    });
  });

  describe('preview component with more than one level', () => {
    it('renders: This is your building & Within Room you can access when more than one level is added', () => {
      wrapper.setProps(multipleLevelsProps);
      const structurePreviewParagraph1 = wrapper.find('.structure-preview p').at(0);
      const structurePreviewParagraph2 = wrapper.find('.structure-preview p').at(1);
      expect(structurePreviewParagraph1.text()).toContain('These are your Buildings');
      expect(structurePreviewParagraph2.text()).toContain(' Within Floor you can access');
    });

    it('it adds class highlight-btn on children and their parent previewed level button when the parent is clicked and replaces it to preview-btn when clicked again.', () => {
      const childOne = wrapper.find('.preview-btn').first();
      childOne.simulate('click');
      expect(wrapper.state('activeLevel')).toEqual('6789668f-fe25-40de-9a08-f6d9b9f12e75');
      expect(childOne.text()).toContain('Epic tower');

      wrapper.find('.highlight-btn').first().simulate('click');
      expect(wrapper.state('activeLevel')).toEqual('0');
      expect(childOne.text()).toContain('Epic tower');
      expect(childOne.hasClass('highlight-btn')).toBe(false);
      expect(childOne.hasClass('preview-btn')).toBe(true);
    });

    it('it adds class .highlight-arrow-btn to next pagination button when there are more children of clicked parent on next paginated section', () => {
      const childOne = wrapper.find('.preview-btn').first();
      let nextIcon = wrapper.find('.arrow__right img');
      expect(nextIcon.hasClass('highlight-arrow-btn')).toBe(false);
      childOne.simulate('click');
      expect(wrapper.state('activeLevel')).toEqual('6789668f-fe25-40de-9a08-f6d9b9f12e75');
      expect(childOne.text()).toContain('Epic tower');
      nextIcon = wrapper.find('.arrow__right img');
      expect(nextIcon.hasClass('highlight-arrow-btn')).toBe(true);
    });

    it('it adds class .highlight-arrow-btn to previous pagination button when there are more children of clicked parent on previous paginated section', () => {
      const childTwo = wrapper.find('.preview-btn-container').at(2);
      childTwo.simulate('click');
      wrapper.find('.arrow__right').simulate('click');
      const previousIcon = wrapper.find('.arrow__left img');
      expect(previousIcon.hasClass('highlight-arrow-btn')).toBe(true);
    });
  });

  it('should return flatten data when formatLocationStructureData is run', () => {
    const shallowWrapper = shallow(<PreviewComponent {...mockedProps} />);
    const locationId = shallowWrapper.instance().getUserLocationId();
    expect(locationId).toBe(3);
    const structuredData = shallowWrapper.instance().formatLocationStructureData();
    expect(flattenedData.length).toEqual(structuredData.length);
  });

  it('should disable button on clicking by adding class save-btn-container-disable', () => {
    wrapper.setProps(mockedProps);
    expect(wrapper.state('isSubmiting')).toEqual(false);
    expect(wrapper.find('div').last().hasClass('save-btn-container-disable')).toBe(false);
    expect(wrapper.find('div').last().hasClass('save-btn-container')).toBe(true);
    wrapper.find('.save-btn-container Button').simulate('click');
    expect(wrapper.state('isSubmiting')).toEqual(true);
    expect(wrapper.find('div').last().hasClass('save-btn-container-disable')).toBe(true);
    expect(wrapper.find('div').last().hasClass('save-btn-container')).toBe(false);
  });
});
