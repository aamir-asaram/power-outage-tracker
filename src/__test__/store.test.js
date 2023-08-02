import store from '../redux/store';

describe('Test the store', () => {
  it('Store is created correctly', () => {
    expect(store.getState().provinces.provinces.length).toBe(0);
  });
});
