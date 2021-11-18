const backend = 'http://localhost:5000';
const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  search: '/search',
  courses: '/courses/:code',
  profiles: '/profiles',
  help: '/help',
  backend: 'http://localhost:5000',
};
export const API = {
  updateProfile: backend + '/updateProfile',
  getProfile: backend + '/getProfile',
  createProfile: backend + '/createProfile',
  validateLogin: backend + '/validateLogin',
};

export default ROUTES;
