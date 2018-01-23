import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import RetroAppBar from './RetroAppBar';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const retroAppBar = renderer.create(
    <Router>
      <RetroAppBar buttonText="This is a buttonText" handleOnClick={() => {}} />
    </Router>
  );
  expect(retroAppBar).toMatchSnapshot();
});

it('renders correctly if a team link was provided', () => {
  const retroAppBar = renderer.create(
    <Router>
      <RetroAppBar
        buttonText="This is a buttonText"
        handleOnClick={() => {}}
        teamLink={'Team'}
      />
    </Router>
  );
  expect(retroAppBar).toMatchSnapshot();
});
