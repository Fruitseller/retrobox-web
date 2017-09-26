import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import raf from 'raf';
import App from './App';

configure({ adapter: new Adapter() });

raf.polyfill();
it('renders without crashing', () => {
  shallow(<App />);
});
