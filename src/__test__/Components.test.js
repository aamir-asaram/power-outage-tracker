import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from '../components/NavBar';
import ProvinceList from '../components/ProvinceList';
import Province from '../components/Province';
import store from '../redux/store';

describe('Test all component rendering', () => {
  it('NavBar renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <NavBar />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Province list renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <ProvinceList />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Province renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Province province="city-of-cape-town" />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
