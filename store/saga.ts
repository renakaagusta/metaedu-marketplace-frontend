import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import collectionSaga from './collection/saga';
import fractionSaga from './fraction/saga';
import ownershipSaga from './ownership/saga';
import rentalSaga from './rental/saga';
import themeSaga from './themes/saga';
import tokenSaga from './token/saga';
import tokenCategorySaga from './token_category/saga';
import transactionSaga from './transaction/saga';
import userSaga from './user/saga';
import web3Saga from './web3/saga';

export default function* rootSaga(): Generator {
  yield all([
    authSaga(),
    collectionSaga(),
    ownershipSaga(),
    rentalSaga(),
    themeSaga(),
    tokenSaga(),
    tokenCategorySaga(),
    transactionSaga(),
    fractionSaga(),
    userSaga(),
    web3Saga()
  ]);
}