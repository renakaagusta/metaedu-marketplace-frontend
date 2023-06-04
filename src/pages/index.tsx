import { Carousel } from 'antd';
import clsx from 'clsx';
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
import { TokenCategoryState } from 'store/token_category/interfaces';
import TokenCategoryActionTypes from 'store/token_category/interfaces/actions.interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import { UserState } from 'store/user/interfaces/data.interfaces';
import { Web3State } from "store/web3/interfaces";

import ACard from '@/components/atoms/a_card/a_card';
import ACol from '@/components/atoms/a_col/a_col';
import ARow from '@/components/atoms/a_row/a_row';
import AText from '@/components/atoms/a_text/a_text';
import Layout from '@/components/moleculs/layout/Layout';
import MCollectionBanner from '@/components/moleculs/m_collection_banner/m_collection_banner';
import MTokenCard from '@/components/moleculs/m_token_card/m_token_card';
import MTokenCategoryCard from '@/components/moleculs/m_token_category_card/m_token_category_card';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

function IndexPage(props: IndexPageProps) {
  const { authState, themeState, web3State, ownershipState, rentalState, tokenState, tokenCategoryState, collectionState, transactionState, fractionState, userState } = props
  const { tokens } = tokenState
  const { tokenCategoryList } = tokenCategoryState
  const { collections } = collectionState
  const { theme } = themeState

  const dispatch = useDispatch()

  const [offset, setOffset] = useState<number>(0)
  const [limit, setLimit] = useState<number>(25)
  const [orderBy, setOrderBy] = useState<string>('created_at')
  const [orderOption, setOrderOption] = useState<string>('DESC')

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
        minPrice: 0,
        maxPrice: 1000000000,
        categoryId: 'all',
        collectionId: 'all',
        creatorId: 'all'
      }
    })
  }

  const fetchTokenCategoryList = () => {
    dispatch({
      type: TokenCategoryActionTypes.GET_TOKEN_CATEGORY_LIST,
      payload: {
        offset: 0,
        limit: 100,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC'
      }
    })
  }

  const fetchCollectionList = () => {
    dispatch({
      type: CollectionActionTypes.GET_COLLECTION_LIST,
      payload: {
        offset: 0,
        limit: 5,
        keyword: '',
        creatorId: 'all',
        orderBy: 'created_at',
        orderOption: 'DESC'
      }
    })
  }

  useEffect(() => {
    fetchTokenList()
    fetchTokenCategoryList()
    fetchCollectionList()
  }, [limit, offset])

  return (
    <Layout>
      <Seo
        templateTitle='MetaEdu Marketplace'
        description='Pre-built components with awesome default'
      />
      <ONavBar theme={theme} textColor={textColor} ownershipState={ownershipState} rentalState={rentalState} transactionState={transactionState} fractionState={fractionState} web3State={web3State} themeState={themeState} authState={authState} userState={userState} dispatch={dispatch} />
      <main>
        <section
          className={clsx(theme === 'dark' ? 'bg-dark' : 'bg-white', textColor)}
        >
          <div
            className={clsx(
              'layout min-h-screen py-[16vh]',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <Carousel autoplay>
              {
                collections?.map((collection) => <MCollectionBanner key={`collection-${collection.id}`} collection={collection} theme={theme} />)
              }
            </Carousel>
            <ACard className={`mt-3 bg-${theme} ${theme == 'dark' ? 'border-black' : 'border-gray'}`}>
              <AText className={clsx('text-2xl font-bold ml-3', textColor)}>Explore Categories</AText>
              <ARow className="mt-2" gutter={[100, 20]}>
                {
                  tokenCategoryList?.map((tokenCategory) => <ACol lg={6} xs={12} key={`token-category-${tokenCategory.id}`}>
                    <MTokenCategoryCard tokenCategory={tokenCategory} theme={theme} />
                  </ACol>)
                }
              </ARow>
            </ACard>
            <ACard className={`mt-3 bg-${theme} ${theme == 'dark' ? 'border-black' : 'border-gray'}`}>
              <AText className={clsx('text-2xl font-bold ml-3', textColor)}>Latest Items</AText>
              <InfiniteScroll
                className="mt-2"
                dataLength={tokens?.length ?? 0}
                next={() => {
                  setLimit(offset + limit)
                  setOffset(offset + offset)
                }}
                hasMore={true}
                loader={<></>}
              >
                <ARow gutter={[100, 20]}>
                  {
                    tokens?.map((token) => <ACol lg={6} xs={24} key={`token-${token.id}`}>
                      <MTokenCard token={token} theme={theme} />
                    </ACol>)
                  }
                </ARow>
              </InfiniteScroll>
            </ACard>
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
    tokenState: state.tokenReducer,
    tokenCategoryState: state.tokenCategoryReducer,
    collectionState: state.collectionReducer,
    ownershipState: state.ownershipReducer,
    transactionState: state.transactionReducer,
    fractionState: state.fractionReducer,
    rentalState: state.rentalReducer,
    userState: state.userReducer
  }))(IndexPage)

interface IndexPageProps {
  themeState: ThemesState
  web3State: Web3State
  authState: AuthState
  ownershipState: OwnershipState
  rentalState: RentalState
  tokenState: TokenState
  tokenCategoryState: TokenCategoryState
  collectionState: CollectionState
  transactionState: TransactionState
  fractionState: FractionState
  userState: UserState
}
