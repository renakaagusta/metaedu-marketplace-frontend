import { Task } from 'redux-saga';
import 'redux';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}