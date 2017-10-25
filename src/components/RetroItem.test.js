import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import RetroItem from './RetroItem';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(
    <RetroItem
      teamId="teamId"
      authorId="authorId"
      authorName="displayName"
      timestamp={12345678}
      message="massage"
      removeItem={() => {}}
    />
  );
});

it('renders correctly', () => {
  const tree = renderer
    .create(
      <RetroItem
        teamId="teamId"
        authorId="authorId"
        authorName="displayName"
        timestamp={12345678}
        message="massage"
        removeItem={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
