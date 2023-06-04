import { combineReducers } from 'redux';
import { AuthState } from 'store/auth/interfaces';
import authReducer from 'store/auth/reducer';
import { CollectionState } from 'store/collection/interfaces';
import collectionReducer from 'store/collection/reducer';
import { FractionState } from 'store/fraction/interfaces';
import fractionReducer from 'store/fraction/reducer';
import { OwnershipState } from 'store/ownership/interfaces';
import ownershipReducer from 'store/ownership/reducer';
import { RentalState } from 'store/rental/interfaces';
import rentalReducer from 'store/rental/reducer';
import { ThemesState } from 'store/themes/interfaces';
import themeReducer from 'store/themes/reducer';
import { TokenState } from 'store/token/interfaces';
import tokenReducer from 'store/token/reducer';
import { TokenCategoryState } from 'store/token_category/interfaces';
import tokenCategoryReducer from 'store/token_category/reducer';
import { TransactionState } from 'store/transaction/interfaces';
import transactionReducer from 'store/transaction/reducer';
import { UserState } from 'store/user/interfaces';
import userReducer from 'store/user/reducer';
import { Web3State } from 'store/web3/interfaces';
import web3Reducer from 'store/web3/reducer';

export interface RootReducerInterface {
  authReducer: AuthState,
  collectionReducer: CollectionState,
  themeReducer: ThemesState,
  tokenReducer: TokenState,
  tokenCategoryReducer: TokenCategoryState,
  ownershipReducer: OwnershipState,
  rentalReducer: RentalState,
  userReducer: UserState,
  web3Reducer: Web3State,
  transactionReducer: TransactionState,
  fractionReducer: FractionState
}

const rootReducer = combineReducers({
  authReducer,
  collectionReducer,
  ownershipReducer,
  rentalReducer,
  themeReducer,
  tokenReducer,
  tokenCategoryReducer,
  transactionReducer,
  fractionReducer,
  userReducer,
  web3Reducer
})

export default rootReducer

