import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AddRetroItem from './AddRetroItem';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<AddRetroItem uid="unique" addItem={() => {}} />);
});

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <AddRetroItem uid="unique" addItem={() => {}} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
