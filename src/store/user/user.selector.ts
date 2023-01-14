import { createSelector } from 'reselect';
import { RootState } from '../store';
import { UserState } from './user.types';

export const selectUserSlice = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
	[selectUserSlice],
	(userSlice) => userSlice.currentUser,
);

export const selectIsLoading = createSelector(
  [selectUserSlice],
  (userState) => userState.isLoading
)

export const selectError = createSelector(
  [selectUserSlice],
  (userState) => userState.error
)