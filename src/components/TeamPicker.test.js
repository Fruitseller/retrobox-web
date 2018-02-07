import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TeamPicker from './TeamPicker';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(
    <TeamPicker handleAuthentication={() => {}} authenticationText="text" />
  );
});

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <TeamPicker handleAuthentication={() => {}} authenticationText="text" />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
