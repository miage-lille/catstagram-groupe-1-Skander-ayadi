import {
  CloseModal,
  Decrement,
  FetchCatsCommit,
  FetchCatsRequest,
  FetchCatsRollback,
  Increment,
} from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });
export const closeModal = (): CloseModal => ({ type: 'CLOSE_MODAL' });
export const selectPicture = (picture: Picture) => ({ type: 'SELECT_PICTURE', picture });

export const fetchCatsRequest = (): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: 'Update the path',
}); // TODO : Update this value !

export const fetchCatsCommit = (payload: unknown): FetchCatsCommit => ({ type: 'FETCH_CATS_COMMIT', payload });

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });
