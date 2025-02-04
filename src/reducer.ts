import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { CloseModal, Decrement, Increment, SelectPicture } from './types/actions.type';
import { Picture } from './types/picture.type';




export type State = {
  counter: number;
  pictures: Picture[];
  selectedPicture: Picture | null;
};

export const defaultState: State = {
  counter: 0,
  pictures: [],
  selectedPicture: null,
}

type Actions = | Increment | Decrement | SelectPicture | CloseModal

export const reducer = (state: State | undefined, action: Actions) : State => {

  if (!state) return defaultState;

  let counter = state.counter;
  if(counter > 3){
    throw 'Counter cannot be greater than 3';
  }
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1, pictures: new Array(state.counter + 1).fill({})};
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1, pictures: new Array(state.counter - 1).fill({})};
    case 'SELECT_PICTURE':
      return { ...state, selectedPicture: action.picture };
    case 'CLOSE_MODAL':
      return { ...state, selectedPicture: null };
  }


}

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  return state.selectedPicture;
};

export default compose(liftState, reducer);
