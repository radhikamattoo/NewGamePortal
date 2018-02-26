/**
 * @jest-environment node
 */
import { reducer, Action } from './index';
import { storeStateDefault } from '../stores/defaults';
import { GameInfo, MyUser, SignalEntry, Image, StoreState } from '../types';

const image: Image = {
  imageId: 'someImageId',
  downloadURL: 'https://someurl.com/foo.png',
  height: 1024,
  width: 700,
  isBoardImage: true
};

const gameInfo: GameInfo = {
  gameSpecId: 'someId',
  gameName: 'Some game name',
  screenShoot: image
};

const userInfo: MyUser = {
  myUserId: 'someId',
  myPhoneNumber: 'Some phone number'
};

const sigEntry: SignalEntry = {
  addedByUid: 'someId',
  timestamp: 1234 /*firebase.database.ServerValue.TIMESTAMP*/,
  signalType: 'sdp',
  signalData: 'some String'
};

function reduce(state: StoreState, action: Action): StoreState {
  return reducer(state, <any>action);
}

it('get initial state', () => {
  expect(reduce(<any>undefined, {})).toEqual(storeStateDefault);
});

it('setGamesList', () => {
  let gamesList = [gameInfo];
  let action: Action = {
    setGamesList: gamesList
  };
  let initialState = storeStateDefault;
  const expectedState = { ...storeStateDefault, gamesList: gamesList };
  expect(reduce(initialState, action)).toEqual(expectedState);
});

it('setSignals', () => {
  let signalsList = [sigEntry];
  let action: Action = {
    setSignals: signalsList
  };
  let initialState = storeStateDefault;
  const expectedState = { ...storeStateDefault, signals: signalsList };
  expect(reduce(initialState, action)).toEqual(expectedState);
});

it('setMyUser', () => {
  let userDetails = userInfo;
  let action: Action = {
    setMyUser: userDetails
  };
  let initialState = storeStateDefault;
  const expectedState = { ...storeStateDefault, myUser: userDetails };
  expect(reduce(initialState, action)).toEqual(expectedState);
});
// TODO: add tests for all other reducers.