import { Radio, RadioChangeEvent, Row } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { AuthState } from 'store/auth/interfaces';
import { FractionState } from 'store/fraction/interfaces';
import { OwnershipState } from 'store/ownership/interfaces';
import { RootReducerInterface } from 'store/reducer';
import { RentalState } from 'store/rental/interfaces';
import { ThemesState } from 'store/themes/interfaces';
import { TokenState } from 'store/token/interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import TransactionActionTypes from 'store/transaction/interfaces/actions.interfaces';
import { UserState } from 'store/user/interfaces';
import { Web3State } from "store/web3/interfaces";

import AAvatar from '@/components/atoms/a_avatar/a_avatar';
import ALayout from '@/components/atoms/a_layout/a_layout';
import ALink from '@/components/atoms/a_link/a_link';
import ASpin from '@/components/atoms/a_spin/a_spin';
import AText from '@/components/atoms/a_text/a_text';
import MTokenImage from '@/components/moleculs/m_token_image/m_token_image';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

import Collection from '@/models/collection.model';
import Token from '@/models/token.model';
import Transaction, { TransactionType } from '@/models/transaction.model';
import { AppState } from '@/utils/state';

function StatsPage(props: StatsPageProps) {
  const { authState, themeState, web3State, transactionState, fractionState, userState, ownershipState, rentalState } = props
  const { theme } = themeState

  const dispatch = useDispatch()

  const [filteredTransactionList, setFilteredTransactionList] = useState<Array<Transaction>>([])
  const [collectionStats, setCollectionStats] = useState<Array<CollectionStats>>([])
  const [tokenStats, setTokenStats] = useState<Array<TokenStats>>([])
  const [selectedTab, setSelectedTab] = useState<StatsTab>(StatsTab.Token)

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const collectionColumns: ColumnsType<CollectionStats> = [
    {
      title: () => <AText className={textColor}>#</AText>,
      key: 'index',
      render: (_, __, index: number) => {
        return <AText className={textColor}>{index + 1}</AText>
      },
    },
    {
      title: () => <AText className={textColor}>Collection</AText>,
      key: 'collection',
      render: (collectionStats: CollectionStats) =>

        <ALink href={`/collection/${collectionStats.collection.id}`}>{collectionStats.collection?.thumbnail.valid ? <AAvatar src={collectionStats.collection.thumbnail.string} /> : <AAvatar>{collectionStats.collection.title.string}</AAvatar>}<AText className={'ml-2 ' + clsx(textColor)}>{collectionStats?.collection?.title.string}</AText></ALink>
      ,
    },
    {
      title: () => <AText className={textColor}>Volume</AText>,
      key: 'volume',
      render: (collectionStats: CollectionStats) =>
        <AText className={'ml-2 ' + clsx(textColor)}>{collectionStats.volume / 1000000} ETH</AText>
      ,
      sorter: (a, b) => a.volume - b.volume,
      sortDirections: ['descend'],
    },
    {
      title: () => <AText className={textColor}>Change (%)</AText>,
      key: 'change',
      render: (collectionStats: CollectionStats) =>
        <AText className={`ml-2 ${collectionStats.change > 0 ? 'text-green-500' : 'text-red-500'}`}>{(collectionStats?.change * 100).toFixed(2)}%</AText>,
      sorter: (a, b) => a.change - b.change,
      sortDirections: ['descend'],
    },
    {
      title: () => <AText className={textColor}>Floor</AText>,
      key: 'floor',
      render: (collectionStats: CollectionStats) =>
        <AText className={textColor}>{collectionStats?.floor / 1000000} ETH</AText>,
      sorter: (a, b) => a.floor - b.floor,
      sortDirections: ['descend'],
    },
    {
      title: () => <AText className={textColor}>Sales</AText>,
      key: 'sales',
      render: (collectionStats: CollectionStats) =>
        <AText className={textColor}>{collectionStats?.sales}</AText>,
      sorter: (a, b) => a.sales - b.sales,
      sortDirections: ['descend'],
    },
    {
      title: () => <AText className={textColor}>Rentals</AText>,
      key: 'rentals',
      render: (collectionStats: CollectionStats) =>
        <AText className={textColor}>{collectionStats?.rentals}</AText>,
      sorter: (a, b) => a.rentals - b.rentals,
      sortDirections: ['descend'],
    },
  ];

  const tokenColumns: ColumnsType<TokenStats> = [
    {
      title: () => <AText className={textColor}>#</AText>,
      key: 'index',
      render: (_, __, index: number) => {
        return <AText className={textColor}>{index + 1}</AText>
      },
    },
    {
      title: () => <AText className={textColor}>Token</AText>,
      key: 'token',
      render: (tokenStats: TokenStats) =>
        <ALink className="flex flex-row align-center" href={`/token/${tokenStats.token.id}`}><ALayout className="max-h-[30px] max-w-[30px]"> <MTokenImage token={tokenStats.token} height={30} rounded="rounded-full" /></ALayout><AText className="ml-2 text-blue-400">{tokenStats?.token?.title}</AText></ALink>,
    },
    {
      title: () => <AText className={textColor}>Volume</AText>,
      key: 'volume',
      render: (tokenStats: TokenStats) =>
        <AText className={textColor}>{tokenStats.volume / 1000000} ETH</AText>
      ,
      sorter: (a, b) => a.volume - b.volume,
      sortDirections: ['descend'],
    },
    {
      title: () => <AText className={textColor}>Change (%)</AText>,
      key: 'change',
      render: (tokenStats: TokenStats) =>
        <AText className={`${tokenStats.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{(tokenStats?.change * 100).toFixed(2)}%</AText>,
      sorter: (a, b) => a.change - b.change,
    },
    {
      title: () => <AText className={textColor}>Floor</AText>,
      key: 'floor',
      render: (tokenStats: TokenStats) =>
        <AText className={textColor}>{tokenStats?.floor / 1000000} ETH</AText>,
      sorter: (a, b) => a.floor - b.floor,
    },
    {
      title: () => <AText className={textColor}>Sales</AText>,
      key: 'sales',
      render: (tokenStats: TokenStats) =>
        <AText className={textColor}>{tokenStats?.sales - 1}</AText>,
      sorter: (a, b) => a.sales - b.sales,
    },
    {
      title: () => <AText className={textColor}>Rentals</AText>,
      key: 'rentals',
      render: (tokenStats: TokenStats) =>
        <AText className={textColor}>{tokenStats?.rentals}</AText>,
      sorter: (a, b) => a.rentals - b.rentals,
    },
  ];

  const onTabChange = (e: RadioChangeEvent) => {
    setSelectedTab(e.target.value)
  }

  useEffect(() => {
    if (transactionState.transactionListState === AppState.LoadComplete) {
      return
    }

    dispatch({
      type: TransactionActionTypes.GET_TRANSACTION_LIST,
      payload: {
        offset: 0,
        limit: 100,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC',
      }
    })
  }, [transactionState.transactionListState])

  useEffect(() => {
    if (transactionState.transactionListState !== AppState.LoadComplete) {
      return
    }

    setFilteredTransactionList(transactionState.transactions as Array<Transaction>)
  }, [transactionState.transactionListState])

  useEffect(() => {
    if (!filteredTransactionList) {
      return
    }

    const collectionStats: Array<CollectionStats> = []

    filteredTransactionList?.forEach((focusedTransaction) => {
      if (focusedTransaction.collection?.title.valid && !collectionStats.find((collectionStatData) => collectionStatData.collection.id === focusedTransaction.collectionId)) {
        const collectionTransactionList: Array<Transaction> = filteredTransactionList.filter((transaction) => transaction.collectionId === focusedTransaction.collectionId)
        const collectionSaleTransactionList = collectionTransactionList.filter((transaction) => transaction.type === TransactionType.Purchase)
        const collectionRentalTransactionList = collectionTransactionList.filter((transaction) => transaction.type === TransactionType.Rental)

        const volume = collectionSaleTransactionList.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)
        const sales = collectionSaleTransactionList.length
        const rentals = collectionRentalTransactionList.length

        const floorCollection = collectionSaleTransactionList.slice().sort((a, b) => (a.amount / a.quantity) - (b.amount / b.quantity))[0]
        const floor = floorCollection.amount / floorCollection.quantity

        const collectionPriceChangeList: Array<number> = []
        const collectionSaleTransactionListReversed = collectionSaleTransactionList.slice().reverse()
        collectionSaleTransactionList.forEach((_, index) => {
          if (index !== collectionSaleTransactionList.length - 1) {
            collectionPriceChangeList.push(((collectionSaleTransactionListReversed[index + 1].amount / collectionSaleTransactionListReversed[index + 1].quantity) - (collectionSaleTransactionListReversed[index].amount / collectionSaleTransactionListReversed[index].quantity)) / collectionSaleTransactionListReversed[index].amount)
          }
        })

        const change = collectionPriceChangeList.reduceRight((previousValue, currentValue) => previousValue + currentValue, 0) / collectionPriceChangeList.length

        collectionStats.push({
          collection: focusedTransaction.collection,
          volume: volume,
          change: !isNaN(change) ? change : 0,
          floor: floor,
          sales: sales,
          rentals: rentals
        })
      }
    })

    setCollectionStats(collectionStats)
  }, [filteredTransactionList])

  useEffect(() => {
    const tokenStats: Array<TokenStats> = []

    filteredTransactionList?.forEach((focusedTransaction) => {
      if (focusedTransaction.token.title && !tokenStats.find((tokenStatData) => tokenStatData.token.id === focusedTransaction.tokenId)) {
        const tokenTransactionList = filteredTransactionList.filter((transaction) => transaction.tokenId === focusedTransaction.tokenId)
        tokenTransactionList.push({
          id: '-',
          userFromId: undefined,
          userFrom: undefined,
          userToId: focusedTransaction.token.creatorId,
          userTo: focusedTransaction.token.creator,
          ownershipId: undefined,
          ownership: undefined,
          rentalId: undefined,
          rental: undefined,
          collectionId: undefined,
          collection: undefined,
          tokenId: focusedTransaction.tokenId,
          token: focusedTransaction.token,
          type: TransactionType.Purchase,
          quantity: focusedTransaction.token.supply,
          amount: focusedTransaction.token.supply * focusedTransaction.token.initialPrice,
          gasFee: 0,
          status: 'active',
          createdAt: focusedTransaction.token.createdAt,
          updatedAt: focusedTransaction.token.updatedAt
        })

        const tokenSaleTransactionList = tokenTransactionList.filter((transaction) => transaction.type === TransactionType.Purchase)
        const tokenRentalTransactionList = tokenTransactionList.filter((transaction) => transaction.type === TransactionType.Rental)

        const volume = tokenSaleTransactionList.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0) - focusedTransaction.token.initialPrice
        const sales = tokenSaleTransactionList.length
        const rentals = tokenRentalTransactionList.length

        const floorToken = tokenSaleTransactionList.slice().sort((a, b) => (a.amount / a.quantity) - (b.amount / b.quantity))[0]
        const floor = floorToken.amount / floorToken.quantity

        const tokenPriceChangeList: Array<number> = []
        const tokenSaleTransactionListReversed = tokenSaleTransactionList.slice().reverse()
        tokenSaleTransactionListReversed.slice().reverse().forEach((_, index) => {
          if (index !== tokenSaleTransactionList.length - 1) {
            tokenPriceChangeList.push((((tokenSaleTransactionListReversed[index + 1].amount / tokenSaleTransactionListReversed[index + 1].quantity) - (tokenSaleTransactionListReversed[index].amount / tokenSaleTransactionListReversed[index].quantity)) / tokenSaleTransactionListReversed[index].amount))
          }
        })

        const change = tokenPriceChangeList.reduceRight((previousValue, currentValue) => previousValue + currentValue, 0) / tokenPriceChangeList.length

        tokenStats.push({
          token: focusedTransaction.token,
          volume: volume,
          change: !isNaN(change) ? change : 0,
          floor: floor,
          sales: sales,
          rentals: rentals
        })
      }
    })

    setTokenStats(tokenStats)
  }, [filteredTransactionList])

  return (
    <ALayout className={theme}>
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
              'layout min-h-screen py-[16vh]',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            {
              (transactionState.transactionListState !== AppState.LoadComplete) && <ALayout className='h-screen w-full bg-transparent flex justify-center items-center'>
                <ASpin className='mt-8' />
              </ALayout>
            }
            {
              (transactionState.transactionListState === AppState.LoadComplete) && <ALayout className='bg-transparent'><Row>
                <ALayout className="mt-6">
                  <Radio.Group defaultValue={selectedTab} onChange={onTabChange}>
                    <Radio.Button className={`bg-${theme} ${textColor}`} value={StatsTab.Token}>Token</Radio.Button>
                    <Radio.Button className={`bg-${theme} ${textColor}`} value={StatsTab.Collection}>Collection</Radio.Button>
                  </Radio.Group>
                  <ALayout className="mt-4">
                    <AText className={`text-2xl font-bold ${textColor}`}>{selectedTab === StatsTab.Token ? 'Token' : 'Collection'} Stats</AText>
                    {selectedTab === StatsTab.Token ? <Table columns={tokenColumns} dataSource={tokenStats} className="my-4" /> : <Table columns={collectionColumns} dataSource={collectionStats} className="my-4" />}
                  </ALayout>
                </ALayout>
              </Row>
              </ALayout>
            }
          </div>
        </section>
      </main>
      <OFooter theme={theme} textColor={textColor} />
    </ALayout >
  );
}

export default connect(
  (state: RootReducerInterface) => ({
    themeState: state.themeReducer,
    web3State: state.web3Reducer,
    authState: state.authReducer,
    tokenState: state.tokenReducer,
    transactionState: state.transactionReducer,
    fractionState: state.fractionReducer,
    userState: state.userReducer,
    ownershipState: state.ownershipReducer,
    rentalState: state.rentalReducer
  }))(StatsPage)

interface StatsPageProps {
  themeState: ThemesState
  web3State: Web3State
  authState: AuthState
  tokenState: TokenState
  transactionState: TransactionState
  fractionState: FractionState
  userState: UserState
  ownershipState: OwnershipState
  rentalState: RentalState
}

interface CollectionStats {
  collection: Collection
  volume: number
  change: number
  floor: number
  sales: number
  rentals: number
}

interface TokenStats {
  token: Token
  volume: number
  change: number
  floor: number
  sales: number
  rentals: number
}

enum StatsTab {
  Token = 'token',
  Collection = 'collection'
}