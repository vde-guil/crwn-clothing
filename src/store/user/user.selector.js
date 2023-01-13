import { createSelector } from 'reselect';

export const selectUserSlice = (state) => state.user;

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