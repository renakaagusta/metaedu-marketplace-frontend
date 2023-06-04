import clsx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect, useDispatch } from 'react-redux';
import { AuthState } from 'store/auth/interfaces';
import { CollectionState } from 'store/collection/interfaces';
import CollectionActionTypes from 'store/collection/interfaces/actions.interfaces';
import { FractionState } from 'store/fraction/interfaces';
import { OwnershipState } from 'store/ownership/interfaces';
import { RootReducerInterface } from 'store/reducer';
import { RentalState } from 'store/rental/interfaces';
import { ThemesState } from 'store/themes/interfaces';
import { TokenState } from 'store/token/interfaces';
import TokenActionTypes from 'store/token/interfaces/actions.interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import { UserState } from 'store/user/interfaces';
import { Web3State } from "store/web3/interfaces";

import ACol from '@/components/atoms/a_col/a_col';
import AImage from '@/components/atoms/a_image/a_image';
import ALayout from '@/components/atoms/a_layout/a_layout';
import ARow from '@/components/atoms/a_row/a_row';
import ASpin from '@/components/atoms/a_spin/a_spin';
import AText from '@/components/atoms/a_text/a_text';
import Layout from '@/components/moleculs/layout/Layout';
import MTokenCard from '@/components/moleculs/m_token_card/m_token_card';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

import Collection from '@/models/collection.model';
import Token from '@/models/token.model';
import { AppState } from '@/utils/state';

function CollectionDetailPage(props: CollectionDetailPageProps) {
  const { authState, themeState, web3State, collectionState, transactionState, fractionState, userState, ownershipState, rentalState, tokenState } = props
  const { collections } = collectionState
  const { tokens } = tokenState
  const { theme } = themeState

  const dispatch = useDispatch()
  const router = useRouter()

  const { id } = router.query

  const [offset, setOffset] = useState<number>(0)
  const [limit, setLimit] = useState<number>(25)
  const [orderBy, setOrderBy] = useState<string>('created_at')
  const [orderOption, setOrderOption] = useState<string>('DESC')
  const [collectionsGroupping, setCollectionsGroupping] = useState<Array<Array<Collection>>>([])

  const [collection, setCollection] = useState<Collection>()
  const [tokenList, setTokenList] = useState<Array<Token>>()
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const fetchTokenList = () => {
    dispatch({
      type: TokenActionTypes.GET_TOKEN_LIST,
      payload: {
        offset: offset,
        limit: limit,
        keyword: '',
        orderBy: orderBy,
        orderOption: orderOption,
        categoryId: 'all',
        collectionId: id,
        creatorId: 'all',
        minPrice: 0,
        maxPrice: 1000000000
      }
    })
  }

  const fetchCollectionData = () => {
    dispatch({
      type: CollectionActionTypes.GET_COLLECTION_DETAIL,
      payload: id
    })
  }

  useEffect(() => {
    if (!id) {
      return
    }

    fetchCollectionData()
    fetchTokenList()
  }, [id, limit, offset])

  useEffect(() => {
    if (!collectionState.collection) {
      return
    }

    setCollection(collectionState.collection as Collection)
  }, [collectionState.collection])

  useEffect(() => {
    if (!tokenState.tokens) {
      return
    }

    setTokenList(tokenState.tokens)
  }, [tokenState])

  return (
    <Layout>
      <Seo
        templateTitle='MetaEdu Marketplace'
        description='Pre-built components with awesome default'
      />
      <ONavBar theme={theme} textColor={textColor} web3State={web3State} themeState={themeState} authState={authState} transactionState={transactionState} fractionState={fractionState} ownershipState={ownershipState} rentalState={rentalState} userState={userState} dispatch={dispatch} />
      <main>
        <section
          className={clsx(theme === 'dark' ? 'bg-dark' : 'bg-white', textColor)}
        >
          <div
            className={clsx(
              'layout min-h-screen py-[12vh] m-0 p-0',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            {
              (collectionState.collectionDetailState != AppState.LoadComplete) && <ALayout className='h-screen w-full bg-transparent flex justify-center items-center'>
                <ASpin className='mt-8' />
              </ALayout>
            }
            {
              (collectionState.collectionDetailState == AppState.LoadComplete) && <ALayout className='bg-transparent'>
                <AImage className='h-[45vh] w-[100vw] object-cover' preview={false} alt="cover" src={collection?.cover.string} />
                <ALayout className={`absolute top-[40vh] left-[8vw] h-[168px] w-[168px] p-2 rounded-lg bg-${theme}`}>
                  <AImage className='object-cover' alt="thumbnail" src={collection?.thumbnail.string} />
                </ALayout>
                <ALayout className="px-[8vw] py-[40px] bg-transparent">
                  <AText className={`text-3xl font-bold ${textColor}`}>{collection?.title?.string ?? '-'}</AText>
                  <AText className={`text-lg mt-1 ${textColor}`}>By <span className="font-bold">{collection?.creator.name !== '' ? collection?.creator.name : collection?.creator.address}</span></AText>
                  <AText className={`text-lg mt-1 ${textColor}`}>Items
                    <span className="font-bold mx-1 mr-2">4</span>
                    ·
                    <span className="ml-2">Created</span>
                    <span className="font-bold ml-1">{dayjs(collection?.createdAt.time).format('D MMMM YYYY')}</span>
                  </AText>
                  <AText className={`text-lg mt-1 ${textColor}`}>{collection?.description.string}</AText>
                  <InfiniteScroll
                    className="mt-2"
                    dataLength={tokens?.length ?? 0}
                    next={fetchTokenList}
                    hasMore={true}
                    loader={<></>}
                  >
                    <ARow gutter={[10, 20]}>
                      {
                        tokens?.map((token) => <ACol lg={6} xs={24} key={`token-${token.id}`}>
                          <MTokenCard token={token} theme={theme} />
                        </ACol>)
                      }
                    </ARow>
                  </InfiniteScroll>
                </ALayout>
              </ALayout>
            }
          </div>
        </section>
      </main>
      <OFooter theme={theme} textColor={textColor} />
    </Layout >
  );
}

export default connect(
  (state: RootReducerInterface) => ({
    themeState: state.themeReducer,
    web3State: state.web3Reducer,
    authState: state.authReducer,
    collectionState: state.collectionReducer,
    transactionState: state.transactionReducer,
    fractionState: state.fractionReducer,
    userState: state.userReducer,
    ownershipState: state.ownershipReducer,
    rentalState: state.rentalReducer,
    tokenState: state.tokenReducer
  }))(CollectionDetailPage)

interface CollectionDetailPageProps {
  themeState: ThemesState
  web3State: Web3State
  authState: AuthState
  collectionState: CollectionState
  transactionState: TransactionState
  fractionState: FractionState
  userState: UserState
  ownershipState: OwnershipState
  rentalState: RentalState
  tokenState: TokenState
}
