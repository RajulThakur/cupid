import {atom} from 'recoil';

export const MessageState = atom({
  key: 'message',
  default: [],
});
export const UserId = atom({
  key: 'userID',
  default: '',
});

export const GifSearchValue = atom({
  key: 'gifSearch',
  default: 'trending',
});
export const circularProgress = atom({
  key: 'uploadProgress',
  default: 0,
});
export const audioCircularProgress = atom({
  key: 'audioCircularProgress',
  default: 0,
});
export const timer = atom({
  key: 'timer',
  default: 0,
});
export const audioLength = atom({
  key: 'audioLength',
  default: 180 * 1000,
});
export const isAudioRecorded = atom({
  key: 'isRecorded',
  default: false,
});
