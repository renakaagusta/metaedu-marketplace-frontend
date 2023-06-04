import { Col, Collapse, Radio, RadioChangeEvent, Row, Select, Slider, Space } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { TfiLayoutColumn2 as Column2Icon, TfiLayoutColumn3 as Column3Icon } from 'react-icons/tfi'
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
import { UserState } from 'store/user/interfaces';
import { Web3State } from 'store/web3/interfaces';

import ACol from '@/components/atoms/a_col/a_col';
import AImage from '@/components/atoms/a_image/a_image';
import ALayout from '@/components/atoms/a_layout/a_layout';
import ARow from '@/components/atoms/a_row/a_row';
import AText from '@/components/atoms/a_text/a_text';
import Layout from '@/components/moleculs/layout/Layout';
import MTokenCard from '@/components/moleculs/m_token_card/m_token_card';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

export enum LayoutMode {
  First = 'first',
  Second = 'second',
}

const { Panel } = Collapse;

function TokenListPage(props: TokenListPageProps) {
  const { authState, themeState, web3State, ownershipState, rentalState, tokenState, tokenCategoryState, collectionState, transactionState, fractionState, userState } = props
  const { tokens } = tokenState
  const { collections } = collectionState
  const { tokenCategoryList } = tokenCategoryState
  const { theme } = themeState

  const router = useRouter()

  const dispatch = useDispatch()

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const [layoutMode, setLayoutMode] = React.useState<LayoutMode>(LayoutMode.First);

  const [offset, setOffset] = React.useState<number>(0)
  const [limit, setLimit] = React.useState<number>(25)
  const [orderBy, setOrderBy] = React.useState<string>('created_at')
  const [orderOption, setOrderOption] = React.useState<string>('DESC')
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(1000)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedCollection, setSelectedCollection] = useState<string>('all')
  const [keyword, setKeyword] = useState<string>()

  const onLayoutModeChange = (e: RadioChangeEvent) => {
    setLayoutMode(e.target.value);
    router.push({
      pathname: '/token',
      query: {
        ...router.query,
        'layout_mode': e.target.value
      }
    })
  };

  const onOrderChange = (value: string) => {
    const [orderBy, orderOption] = value.split('-')
    setOrderBy(orderBy)
    setOrderOption(orderOption)

    router.push({
      pathname: '/token',
      query: {
        ...router.query,
        'order_by': orderBy,
        'order_option': orderOption
      }
    })
  };

  const onCollectionChange = (e: RadioChangeEvent) => {
    setSelectedCollection(e.target.value)
    router.push({
      pathname: '/token',
      query: {
        ...router.query,
        'collection_id': e.target.value
      }
    })
  };

  const onCategoryChange = (e: RadioChangeEvent) => {
    setSelectedCategory(e.target.value)
    router.push({
      pathname: '/token',
      query: {
        ...router.query,
        'category_id': e.target.value
      }
    })
  };

  const onMinPriceChange = (value: number) => {
    setMinPrice(value)
    router.push({
      pathname: '/token',
      query: {
        ...router.query,
        'min_price': value
      }
    })
  }

  const onMaxPriceChange = (value: number) => {
    setMaxPrice(value)
    router.push({
      pathname: '/token',
      query: {
        ...router.query,
        'max_price': value
      }
    })
  }

  const fetchTokenList = () => {
    dispatch({
      type: TokenActionTypes.GET_TOKEN_LIST,
      payload: {
        offset: offset,
        limit: limit,
        keyword: keyword,
        orderBy: orderBy,
        orderOption: orderOption,
        categoryId: selectedCategory,
        collectionId: selectedCollection,
        creatorId: 'all',
        minPrice: minPrice * 1000000,
        maxPrice: maxPrice * 1000000
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
    setSelectedCategory(router.query['category_id'] as string ?? 'all')
    setSelectedCollection(router.query['collection_id'] as string ?? 'all')
    setOrderBy(router.query['order_by'] as string ?? 'created_at')
    setOrderOption(router.query['order_option'] as string ?? 'DESC')
    setLayoutMode(router.query['layout_mode'] as LayoutMode ?? LayoutMode.First)
    setKeyword(router.query['keyword'] as string ?? '')

    if (router.query['min_price']) {
      setMinPrice(Number(router.query['min_price']))
    }

    if (router.query['max_price']) {
      setMaxPrice(Number(router.query['max_price']))
    }
  }, [router.query])

  useEffect(() => {
    fetchTokenList()
    fetchTokenCategoryList()
    fetchCollectionList()
  }, [limit, offset, orderBy, orderOption, selectedCollection, selectedCategory, minPrice, maxPrice, keyword])

  return (
    <Layout>
      <Seo
        templateTitle='MetaEdu Marketplace'
        description='Pre-built components with awesome default'
      />
      <ONavBar theme={theme} textColor={textColor} ownershipState={ownershipState} rentalState={rentalState} transactionState={transactionState} fractionState={fractionState} web3State={web3State} themeState={themeState} authState={authState} userState={userState} dispatch={dispatch} onSubmitKeyword={(value) => setKeyword(value)} toolbar={
        <div className="justify-end mx-auto lg:w-11/12 md:items-center md:flex pb-5">
          <Select
            className='dark'
            onChange={onOrderChange}
            value={`${orderBy}-${orderOption}`}
            options={[
              { value: 'created_at-DESC', label: 'Latest' },
              { value: 'created_at-ASC', label: 'Oldest' },
              { value: 'last_price-ASC', label: 'Price low to high' },
              { value: 'last_price-DESC', label: 'Price high to low' },
            ]}
          />
          <Radio.Group className={`ml-5 ${theme}`} value={layoutMode} onChange={onLayoutModeChange}>
            <Radio.Button className="dark" value={LayoutMode.First}>
              <Column2Icon />
            </Radio.Button>
            <Radio.Button value={LayoutMode.Second}>
              <Column3Icon />
            </Radio.Button>
          </Radio.Group>
        </div>
      } />
      <main>
        <section
          className={clsx(theme === 'dark' ? 'bg-dark' : 'bg-white', textColor)}
        >
          <div
            className={clsx(
              'layout min-h-screen pt-[28vh] ',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <Row>
              <Col span={4}>
                <Collapse defaultActiveKey={[]} className={theme} bordered={false}>
                  <Panel header="Collection" key="1">
                    <Radio.Group value={selectedCollection} onChange={onCollectionChange}>
                      <Space direction="vertical">
                        <Radio className={`bg-${theme} ${textColor}`} key="token-category-all" value="all">All</Radio>
                        {
                          collections?.map((collection) => <Radio className={`bg-${theme} ${textColor}`} key={`collection-${collection.id}`} value={collection.id}>
                            <ALayout className="bg-transparent flex flex-row">
                              <AImage className='rounded-lg h-[30px] w-[30px]' src={collection.thumbnail.string} />
                              <AText className={`ml-2 ${textColor}`}>{collection.title.string}</AText>
                            </ALayout>
                          </Radio>)
                        }
                      </Space>
                    </Radio.Group>
                  </Panel>
                  <Panel header="Price" key="2">
                    <ALayout className="flex flex-column bg-transparent">
                      <AText className={`${textColor}`}>Minimum price</AText>
                      <Slider defaultValue={minPrice} onChange={onMinPriceChange} />
                      <AText className={`text-xs ${textColor}`}>{minPrice} ETH</AText>
                      <AText className={`${textColor} mt-1`}>Maximum price</AText>
                      <Slider defaultValue={maxPrice} onChange={onMaxPriceChange} />
                      <AText className={`text-xs ${textColor}`}>{maxPrice} ETH</AText>
                    </ALayout>
                  </Panel>
                  <Panel header="Category" key="3">
                    <Radio.Group value={selectedCategory} onChange={onCategoryChange}>
                      <Space direction="vertical">
                        <Radio className={`bg-${theme} ${textColor}`} key="token-category-all" value="all">All</Radio>
                        {
                          tokenCategoryList?.map((tokenCategory) => <Radio className={`bg-${theme} ${textColor}`} key={`token-category-${tokenCategory.id}`} value={tokenCategory.id}>{tokenCategory.title}</Radio>)
                        }
                      </Space>
                    </Radio.Group>
                  </Panel>
                </Collapse>
              </Col>
              <Col span={20} className="pl-4">
                <AText className={`text-md md:text-xl ml-3 ${textColor}`}>{tokens?.length} items</AText>
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
                  <ARow gutter={[10, 20]}>
                    {
                      tokens?.map((token) => <ACol lg={layoutMode === LayoutMode.First ? 6 : 4} xs={24} key={`token-${token.id}`}>
                        <MTokenCard token={token} theme={theme} />
                      </ACol>)
                    }
                  </ARow>
                </InfiniteScroll>
              </Col>
            </Row>
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
    rentalState: state.rentalReducer,
    transactionState: state.transactionReducer,
    fractionState: state.fractionReducer,
    userState: state.userReducer
  }))(TokenListPage)

interface TokenListPageProps {
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


