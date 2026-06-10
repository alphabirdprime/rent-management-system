import { history } from './redux/configureStore';

export const changeLocation = (path) => {
  history.push(path);
};
