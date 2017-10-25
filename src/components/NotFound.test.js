import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import NotFound from './NotFound';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<NotFound />);
});

it('renders correctly', () => {
  const tree = renderer.create(<NotFound />).toJSON();
  expect(tree).toMatchSnapshot();
});
