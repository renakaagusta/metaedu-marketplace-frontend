import { ThemesAction, ThemesActionTypes, ThemesState } from './interfaces';

export const initialState: ThemesState = {
  theme: 'dark'
};

const themeReducer = (
  state = initialState,
  action: ThemesAction,
): ThemesState => {

  switch (action.type) {
    case ThemesActionTypes.SET_THEMES:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export default themeReducer;
