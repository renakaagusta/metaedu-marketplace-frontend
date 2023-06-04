import { Action } from 'redux';
import { ThemesState } from "store/themes/interfaces/data.interfaces";

export enum ThemesActionTypes {
  CHANGE_THEMES = 'THEME/CHANGE_THEMES',
  SET_THEMES = 'THEME/SET_THEMES',
  LOAD_STORAGE_DATA = 'THEME/LOAD_STORAGE_DATA',
}

export type ThemesAction =
  | ChangeThemes
  | SetThemes
  | LoadThemes;

export interface ChangeThemes {
  type: ThemesActionTypes.CHANGE_THEMES;
  payload: ThemesState
}

export interface SetThemes {
  type: ThemesActionTypes.SET_THEMES;
  payload: ThemesState
}

export interface LoadThemes {
  type: ThemesActionTypes.LOAD_STORAGE_DATA;
  payload: ThemesState
}

export interface ChangesThemesParams extends Action, ChangeThemes { type: ThemesActionTypes.CHANGE_THEMES, payload: ThemesState }