import {getAnalytics, isSupported} from 'firebase/analytics';

export const initializeAnalytics = async (app) => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};
