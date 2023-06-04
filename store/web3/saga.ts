import { message } from 'antd';
import { all, put, takeEvery } from 'redux-saga/effects';
import { UpdateWeb3ProviderParams } from 'store/web3/interfaces';
import Web3ActionTypes, { UpdateAddressParams, UpdateConnectCounterParams, UpdateContractParams, UpdateNetworkParams, UpdateProviderParams, UpdateSignerParams } from 'store/web3/interfaces/actions.interfaces';

function* updateConnectCounter(data: UpdateConnectCounterParams) {
  try {
    yield put({
      type: Web3ActionTypes.SET_CONNECT_COUNTER_STATE,
      payload: data.payload
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* updateProvider(data: UpdateProviderParams) {
  try {
    yield put({
      type: Web3ActionTypes.SET_PROVIDER_STATE,
      payload: data.payload
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* updateWeb3Provider(data: UpdateWeb3ProviderParams) {
  try {
    yield put({
      type: Web3ActionTypes.SET_WEB3_PROVIDER_STATE,
      payload: data.payload
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* updateNetwork(data: UpdateNetworkParams) {
  try {
    yield put({
      type: Web3ActionTypes.SET_NETWORK_STATE,
      payload: data.payload
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* updateSigner(data: UpdateSignerParams) {
  try {
    yield put({
      type: Web3ActionTypes.SET_SIGNER_STATE,
      payload: data.payload
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* updateAddress(data: UpdateAddressParams) {
  try {
    yield put({
      type: Web3ActionTypes.SET_ADDRESS_STATE,
      payload: data.payload
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* updateContract(data: UpdateContractParams) {
  try {
    yield put({
      type: Web3ActionTypes.SET_CONTRACT_STATE,
      payload: data.payload
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(Web3ActionTypes.SET_CONNECT_COUNTER, updateConnectCounter),
    takeEvery(Web3ActionTypes.SET_PROVIDER, updateProvider),
    takeEvery(Web3ActionTypes.SET_WEB3_PROVIDER, updateWeb3Provider),
    takeEvery(Web3ActionTypes.SET_NETWORK, updateNetwork),
    takeEvery(Web3ActionTypes.SET_SIGNER, updateSigner),
    takeEvery(Web3ActionTypes.SET_ADDRESS, updateAddress),
    takeEvery(Web3ActionTypes.SET_CONTRACT, updateContract),
  ]);
}

export default rootSaga;
