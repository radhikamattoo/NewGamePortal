/**
 * @jest-environment node
 */
import { ourFirebase } from './firebase';
import * as firebase from 'firebase';
import { MatchState, MatchInfo, GameInfo } from '../types/index';
import { store, dispatch } from '../stores';

const testConfig = {
  apiKey: 'AIzaSyA_UNWBNj7zXrrwMYq49aUaSQqygDg66SI',
  authDomain: 'testproject-a6dce.firebaseapp.com',
  databaseURL: 'https://testproject-a6dce.firebaseio.com',
  projectId: 'testproject-a6dce',
  storageBucket: 'testproject-a6dce.appspot.com',
  messagingSenderId: '957323548528'
};
ourFirebase.init(testConfig);
ourFirebase.allPromisesForTests = [];
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

afterEach(done => {
  Promise.all(ourFirebase.allPromisesForTests!).then(done);
});

// Using real gameSpecId (so no need to insert game spec into db).
const gameInfo: GameInfo = {
  gameSpecId: '-KxLz3AY3-xB47ZXN9Az',
  gameName: '3 Man Chess',
  screenShoot: {
    imageId: '-KuXdJ2ZJPJ-Ad_k02Tf',
    downloadURL: 'https://someurl.com/foo.png',
    height: 1024,
    width: 700,
    isBoardImage: true
  }
};
dispatch({ setGamesList: [gameInfo] });
const existingUserId = '0E25lvSVm5bTHrQT517kPafiAia2';

function createMatch() {
  return ourFirebase.createMatch(gameInfo, {});
}

// Must be the first test: signs in anonyously, writeUser,
// and other methods that can be called just once.
it('signInAnonymously finished successfully', done => {
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      ourFirebase.writeUser();
      ourFirebase.listenToMyMatchesList();
      done();
    })
    .catch(err => {
      console.error('error in signInAnonymously with err=', err);
      throw new Error('error in signInAnonymously err=' + err);
    });
});

it('adds a new match in firebase', () => {
  createMatch();
});

it('Should update the match state', () => {
  // take match state and matchinfo
  const state: MatchState = {
    '0': {
      x: 100,
      y: 100,
      zDepth: 1,
      currentImageIndex: 0,
      cardVisibility: { '0': true }
    }
  };
  const match: MatchInfo = createMatch();
  ourFirebase.updateMatchState(match, state);
});

it('addFcmTokens', () => {
  ourFirebase.addFcmToken('1'.repeat(140), 'android');
});

it('addParticipants', done => {
  const match: MatchInfo = createMatch();
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error('You must be logged in');
  }
  ourFirebase.addParticipant(match, existingUserId);
  store.subscribe(() => {
    const matchesList = store.getState().matchesList;
    const thisMatch = matchesList.find(
      matchInList => matchInList.matchId === match.matchId
    );
    if (
      thisMatch &&
      thisMatch.participantsUserIds.indexOf(existingUserId) !== -1
    ) {
      done();
    }
  });
});

it('fetch match list from firebase', done => {
  const matchId = createMatch().matchId;
  store.subscribe(() => {
    const matchesList = store.getState().matchesList;
    if (matchesList.find(match => match.matchId === matchId)) {
      done();
    }
  });
});

it('Should update the phone numbers', done => {
  // write something to gameportal/phoneNumberToUserId
  const testPhoneNumber: string = '123456789';
  // Since our test use anonymous login
  // and the rules only allow you to write there if you have auth.token.phone_number
  // we can not add in gamePortal/PhoneNumberToUserId/${phoneNumber}
  // So firebase rules add "123456789" for test
  const phoneNumberFbr: fbr.PhoneNumber = {
    userId: ourFirebase.getUserId(),
    timestamp: ourFirebase.getTimestamp()
  };
  ourFirebase.refSet(
    ourFirebase.getRef(`/gamePortal/phoneNumberToUserId/${testPhoneNumber}`),
    phoneNumberFbr
  );
  // get string from contact and convert them to string
  const phoneNumbers: string[] = [];
  phoneNumbers.push(testPhoneNumber);
  ourFirebase.updateUserIdsAndPhoneNumbers(phoneNumbers);
  // check if store has been updated
  store.subscribe(() => {
    const newMap = store.getState().userIdsAndPhoneNumbers;
    console.log('store:' + store.getState().userIdsAndPhoneNumbers);
    const phoneNumberToUserId = newMap['phoneNumberToUserId'];
    if (phoneNumberToUserId[testPhoneNumber]) {

it('pingOpponentsInMatch', done => {
  const match: MatchInfo = createMatch();

  ourFirebase.pingOpponentsInMatch(match);
  store.subscribe(() => {
    const matchesList = store.getState().matchesList;
    const thisMatch = matchesList.find(
      matchInList => matchInList.matchId === match.matchId
    );
    if (thisMatch) {
      done();
    }
  });
});

it('pingOpponentsInMatch', done => {
  const match: MatchInfo = createMatch();

  ourFirebase.pingOpponentsInMatch(match);
  store.subscribe(() => {
    const matchesList = store.getState().matchesList;
    const thisMatch = matchesList.find(
      matchInList => matchInList.matchId === match.matchId
    );
    if (thisMatch) {
      done();
    }
  });
});
