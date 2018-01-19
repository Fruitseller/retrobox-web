import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import RetroAppBar from './RetroAppBar';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const retroAppBar = renderer.create(
    <RetroAppBar buttonText="This is a buttonText" handleOnClick={() => {}} />
  );
  expect(retroAppBar).toMatchSnapshot();
});
