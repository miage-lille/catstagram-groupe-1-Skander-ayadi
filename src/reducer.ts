import { liftState, loop, Cmd, Loop } from 'redux-loop';
import { compose } from 'redux';
import { CloseModal, Decrement, Increment, SelectPicture, FetchCatsCommit, FetchCatsRollback, FetchCatsRequest } from './types/actions.type';
import { Picture } from './types/picture.type';
import { ApiStatus } from './types/api.type';
import { failure, loading, success } from './api';
import { fetchCatsRequest } from './actions';
import { cmdFetch } from './commands';
import { Option, none, some} from 'fp-ts/Option';

export type State = {
  counter: number;
  pictures: ApiStatus;
  pictureSelected: Option<Picture>;
};

export const defaultState: State = {
  counter: 3,
  pictures: success([]),
  pictureSelected: none
};

type Actions = Increment | Decrement | SelectPicture | CloseModal | FetchCatsCommit | FetchCatsRollback | FetchCatsRequest;


export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState;

  switch (action.type) {
    case "INCREMENT":
      return loop(
        { ...state, counter: state.counter + 1, pictures: loading() },
        cmdFetch(fetchCatsRequest(state.counter + 1))
      );

    case "DECREMENT":
      return state.counter > 3
        ? loop(
          { ...state, counter: state.counter - 1, pictures: loading() },
          cmdFetch(fetchCatsRequest(state.counter - 1))
        )
        : state;

    case "SELECT_PICTURE":
      return { ...state, pictureSelected: some(action.picture) };

    case "CLOSE_MODAL":
      return { ...state, pictureSelected: none };

    case "FETCH_CATS_REQUEST":
      return loop(
        { ...state, pictures: loading() },
        cmdFetch(action)
      );

    case "FETCH_CATS_COMMIT":
      return {
        ...state,
        pictures: success(action.payload),
      };

    case "FETCH_CATS_ROLLBACK":
      return loop(
        { ...state, pictures: failure(action.error.message) },
        Cmd.run(() => console.error(action.error.message))
      );

    default:
      return state;
  }
};



export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  return state.pictureSelected;
};

export default compose(liftState, reducer);
