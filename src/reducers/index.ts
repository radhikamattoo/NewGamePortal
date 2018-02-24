import { Reducer } from 'redux';
import { StoreState, GameInfo, MatchInfo, Contact, PhoneNumberToUserId, SignalEntry } from '../types';
import { storeStateDefault } from '../stores/defaults';

interface Action {
  setGamesList?: GameInfo[];
  setGameSpec?: GameInfo;
  setMatchesList?: MatchInfo[];
  setMatch?: MatchInfo;
  setCurrentMatchIndex?: number; // an index in matchesList
  setContacts?: Contact[];
  setPhoneNumberToUserId?: PhoneNumberToUserId; // Updates both phoneNumberToUserId and userIdToPhoneNumber.  
  setMyUserId?: string;
  setSignals?: SignalEntry[];
  // TODO: add more.
}

export const reducer: Reducer<StoreState> = 
  (state: StoreState = storeStateDefault, actionWithAnyType: any) => {
    const action: Action = actionWithAnyType;
    if (action.setGamesList) {
      let {gamesList, ...rest} = state;
      return {gamesList: action.setGamesList, ...rest};
    } else {
      return state;
    }
};
