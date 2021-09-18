import { ROUTES } from "../constants/routes";

export const checkLoggedIn = (history: { push: Function}) => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  if (!user || !user.loggedIn) return history.push(ROUTES.login);
}

export const logout = () => {
  localStorage.clear();
  window.location.assign(ROUTES.login);
};

export const getUserProfile = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user || '');
};
