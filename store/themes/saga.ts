import { all, put, takeEvery } from 'redux-saga/effects';
import { ChangesThemesParams, ThemesActionTypes } from 'store/themes/interfaces';

function* getThemes() {
  try {
    const theme = localStorage.getItem('theme')
    yield put({
      type: ThemesActionTypes.SET_THEMES,
      payload: {
        theme: theme ?? 'light'
      }
    })
  } catch (err) {
    yield put({
      type: ThemesActionTypes.SET_THEMES,
      payload: {
        theme: 'light'
      }
    })
  }
}

function* setThemes(data: ChangesThemesParams) {
  try {
    localStorage.setItem('theme', data.payload.theme)
    yield put({
      type: ThemesActionTypes.SET_THEMES,
      payload: data.payload
    })
  } catch (err) {
    yield put({
      type: ThemesActionTypes.SET_THEMES,
      payload: data.payload
    })
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(ThemesActionTypes.LOAD_STORAGE_DATA, getThemes),
    takeEvery(ThemesActionTypes.CHANGE_THEMES, setThemes)
  ]);
}

export default rootSaga;
