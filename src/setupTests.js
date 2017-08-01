// Credit https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
