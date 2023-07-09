import { InfoCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
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
import RentalActionTypes from 'store/rental/interfaces/actions.interfaces';
import { ThemesState } from 'store/themes/interfaces';
import { TokenState } from 'store/token/interfaces';
import TokenActionTypes from 'store/token/interfaces/actions.interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import TransactionActionTypes from 'store/transaction/interfaces/actions.interfaces';
import { UserState } from 'store/user/interfaces';
import UserActionTypes from 'store/user/interfaces/actions.interfaces';
import { Web3State } from "store/web3/interfaces";

import AAvatar from '@/components/atoms/a_avatar/a_avatar';
import ACol from '@/components/atoms/a_col/a_col';
import AImage from '@/components/atoms/a_image/a_image';
import ALayout from '@/components/atoms/a_layout/a_layout';
import ALink from '@/components/atoms/a_link/a_link';
import ARow from '@/components/atoms/a_row/a_row';
import ASpin from '@/components/atoms/a_spin/a_spin';
import ATabs from '@/components/atoms/a_tabs/a_tabs';
import AText from '@/components/atoms/a_text/a_text';
import MCollectionCard from '@/components/moleculs/m_collection_card/m_collection_card';
import MTokenCard from '@/components/moleculs/m_token_card/m_token_card';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

import Token from '@/models/token.model';
import { TransactionType } from '@/models/transaction.model';
import User from '@/models/user.model';
import { AppState } from '@/utils/state';

function CollectionDetailPage(props: CollectionDetailPageProps) {
  const { authState, themeState, web3State, collectionState, transactionState, fractionState, userState, ownershipState, rentalState, tokenState } = props
  const { theme } = themeState

  const dispatch = useDispatch()
  const router = useRouter()

  const { id } = router.query

  const [selectedTab, setSelectedTab] = useState<ProfileTab>(ProfileTab.Token)
  const [offset, setOffset] = useState<number>(0)
  const [limit, setLimit] = useState<number>(25)
  const [orderBy, setOrderBy] = useState<string>('created_at')
  const [orderOption, setOrderOption] = useState<string>('DESC')
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(1000)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedCollection, setSelectedCollection] = useState<string>('all')
  const [keyword, setKeyword] = useState<string>()
  const [activityList, setActivityList] = useState<Array<Activity>>([])

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const profileTabList = [
    {
      key: ProfileTab.Token,
      label: `Token`,
    },
    {
      key: ProfileTab.Collection,
      label: `Collection`,
    },
    {
      key: ProfileTab.Ownership,
      label: `Ownership`,
    },
    {
      key: ProfileTab.Rental,
      label: `Rental`,
    },
    {
      key: ProfileTab.Transaction,
      label: `Transaction`,
    },
  ];

  const activityColumns: ColumnsType<Activity> = [
    {
      title: () => <AText className={textColor}>Token</AText>,
      key: 'token',
      render: (activity: Activity) => <>
        <AAvatar src={activity?.token?.image} /><AText className={`ml-2 ${textColor}`}>{activity.token.title}</AText>
      </>,
    },
    {
      title: () => <AText className={textColor}>Event</AText>,
      key: 'event',
      render: (activity: Activity) => {
        const { event } = activity

        switch (event) {
          case EventType.Minting:
            return <AText className={textColor}>Minting</AText>
          case EventType.Purchase:
            return <AText className={textColor}>Purchase</AText>
          case EventType.Rental:
            return <AText className={textColor}>Rental</AText>
        }
      },
    },
    {
      title: () => <AText className={textColor}>Price</AText>,
      key: 'price',
      render: (activity: Activity) =>
        <AText className={textColor}>{String(activity.price / 1000000)} ETH</AText>
      ,
    },
    {
      title: () => <AText className={textColor}>From</AText>,
      key: 'from',
      render: (activity: Activity) => activity.from ? <ALink href={`/user/${activity.from?.id}`}><AText className="text-blue-400">{activity.from.name !== '' ? activity.from.name : activity.from.address}</AText></ALink> : <AText className={textColor}>-</AText>

    },
    {
      title: () => <AText className={textColor}>To</AText>,
      key: 'to',
      render: (activity: Activity) =>
        <ALink href={`/user/${activity.to?.id}`}><AText className="text-blue-400">{activity.to.name !== '' ? activity.to.name : activity.to.address}</AText></ALink>
    },
    {
      title: () => <AText className={textColor}>Date</AText>,
      key: 'date',
      render: (activity: Activity) => <AText className={textColor}>{dayjs(activity.date).format('HH:mm DD-MM-YYYY')}</AText>
    },
  ];

  const onTabChange = (key: string) => {
    setSelectedTab(key as ProfileTab)
  }

  const fetchUserData = () => {
    dispatch({
      type: UserActionTypes.GET_USER_DETAIL,
      payload: id
    })
  }

  const fetchOwnershipList = () => {
    dispatch({
      type: OwnershipActionTypes.GET_OWNERSHIP_LIST,
      payload: {
        offset: offset,
        limit: limit,
        keyword: keyword,
        orderBy: orderBy,
        orderOption: orderOption,
        categoryId: selectedCategory,
        collectionId: selectedCollection,
        minPrice: minPrice * 1000000,
        maxPrice: maxPrice * 1000000,
        userId: id
      }
    })
  }

  const fetchRentalList = () => {
    dispatch({
      type: RentalActionTypes.GET_RENTAL_LIST,
      payload: {
        offset: offset,
        limit: limit,
        keyword: keyword,
        orderBy: orderBy,
        orderOption: orderOption,
        categoryId: selectedCategory,
        collectionId: selectedCollection,
        minPrice: minPrice * 1000000,
        maxPrice: maxPrice * 1000000,
        userId: id
      }
    })

    dispatch({
      type: RentalActionTypes.GET_RENTAL_BY_OTHER_LIST,
      payload: {
        accessToken: authState.accessToken,
        ownerId: id,
        offset: 0,
        limit: 100,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC',
      }
    })
  }

  console.log('rentals', rentalState.rentals)

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
        creatorId: id,
        minPrice: minPrice * 1000000,
        maxPrice: maxPrice * 1000000,
      }
    })
  }

  const fetchCollectionList = () => {
    dispatch({
      type: CollectionActionTypes.GET_COLLECTION_LIST,
      payload: {
        offset: offset,
        limit: limit,
        keyword: keyword,
        orderBy: orderBy,
        orderOption: orderOption,
        categoryId: selectedCategory,
        creatorId: id
      }
    })
  }

  const fetchTransactionList = () => {
    dispatch({
      type: TransactionActionTypes.GET_TRANSACTION_LIST,
      payload: {
        offset: offset,
        limit: limit,
        keyword: keyword,
        orderBy: orderBy,
        orderOption: orderOption,
        userId: id
      }
    })
  }

  useEffect(() => {
    if (!id) {
      return
    }

    fetchUserData()
    fetchTokenList()
    fetchCollectionList()
    fetchOwnershipList()
    fetchRentalList()
    fetchTransactionList()
  }, [id, limit, offset])

  useEffect(() => {
    if (tokenState.tokenListState !== AppState.LoadComplete || transactionState.transactionListState !== AppState.LoadComplete) {
      return
    }

    const activityList: Array<Activity> = []

    transactionState.transactions?.forEach((transaction) => {
      activityList.push({
        event: transaction.type === TransactionType.Purchase ? EventType.Purchase : EventType.Rental,
        token: transaction.token,
        price: transaction.amount / transaction.quantity,
        from: transaction.userFrom,
        to: transaction.userTo,
        date: transaction.createdAt.time
      })
    })

    tokenState.tokens?.forEach((token) => {
      activityList.push({
        event: EventType.Minting,
        token: token,
        price: token.lastPrice,
        from: undefined,
        to: token.creator,
        date: token.createdAt.time
      })
    })

    setActivityList(activityList.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
  }, [tokenState.tokenListState, transactionState.transactionListState])

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
              'layout min-h-screen py-[12vh] m-0 p-0',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            {
              (userState.userDetailState != AppState.LoadComplete) && <ALayout className='h-screen w-full bg-transparent flex justify-center items-center'>
                <ASpin className='mt-8' />
              </ALayout>
            }
            {
              (userState.userDetailState == AppState.LoadComplete) && <ALayout className='bg-transparent'>
                <AImage className='h-[35vh] w-[100vw] object-cover' preview={false} alt="cover" src={(userState.user?.cover && userState.user?.cover != '') ? userState.user?.cover : 'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-dark-gray-solid-color-background.jpg'} />
                <ALayout className={`absolute top-[30vh] left-[8vw] h-[168px] w-[168px] rounded-lg bg-${theme}`}>
                  <AImage className='object-cover' alt="photo" src={userState?.user?.photo !== '' ? userState?.user?.photo : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
                </ALayout>
                <ALayout className="px-[8vw] py-[40px] bg-transparent mt-3">
                  <AText className={`text-3xl font-bold ${textColor}`}>{userState?.user?.name != '' ? userState?.user?.name : userState?.user?.address}</AText>
                  <AText className={`text-lg mt-1 ${textColor}`}>
                    <AText className={textColor}>Joined</AText>
                    <AText className={`font-bold ml-1  ${textColor}`}>{dayjs(userState.user?.createdAt.time).format('D MMMM YYYY')}</AText>
                  </AText>
                  <ATabs defaultActiveKey={ProfileTab.Token} items={profileTabList} onChange={onTabChange} className={textColor} />
                  {
                    selectedTab === ProfileTab.Token && <InfiniteScroll
                      className="mt-2"
                      dataLength={tokenState.tokens?.length ?? 0}
                      next={() => {
                        setLimit(offset + limit)
                        setOffset(offset + offset)
                      }}
                      hasMore={true}
                      loader={<></>}
                    >
                      <ARow gutter={[10, 20]}>
                        {
                          tokenState.tokens?.map((token) => <ACol lg={6} xs={24} key={`token-${token.id}`}>
                            <MTokenCard token={token} theme={theme} />
                          </ACol>)
                        }
                      </ARow>
                      {
                        (!tokenState.tokens || tokenState.tokens.length === 0) && <ALayout className="flex flex-column align-center"><InfoCircleOutlined className={`text-3xl ${textColor}`} /><AText className={`text-center text-xl ${textColor}`}>No items</AText></ALayout>
                      }
                    </InfiniteScroll>
                  }
                  {
                    selectedTab === ProfileTab.Collection && <InfiniteScroll
                      className="mt-2"
                      dataLength={collectionState.collections?.length ?? 0}
                      next={() => {
                        setLimit(offset + limit)
                        setOffset(offset + offset)
                      }}
                      hasMore={true}
                      loader={<></>}
                    >
                      <ARow gutter={[10, 20]}>
                        {
                          collectionState.collections?.map((collection) => <ACol lg={6} xs={24} key={`collection-${collection.id}`}>
                            <MCollectionCard collection={collection} theme={theme} />
                          </ACol>)
                        }
                      </ARow>
                      {
                        (!collectionState.collections || collectionState.collections.length === 0) && <ALayout className="flex flex-column align-center"><InfoCircleOutlined className={`text-3xl ${textColor}`} /><AText className={`text-center text-xl ${textColor}`}>No items</AText></ALayout>
                      }
                    </InfiniteScroll>
                  }
                  {
                    selectedTab === ProfileTab.Ownership && <InfiniteScroll
                      className="mt-2"
                      dataLength={ownershipState.ownershipList?.length ?? 0}
                      next={() => {
                        setLimit(offset + limit)
                        setOffset(offset + offset)
                      }}
                      hasMore={true}
                      loader={<></>}
                    >
                      <ARow gutter={[10, 20]}>
                        {
                          ownershipState.ownershipList?.map((ownership) => <ACol lg={6} xs={24} key={`ownership-${ownership.id}`}>
                            <MTokenCard token={ownership.token} rental={rentalState.rentalsByOther?.find((rental) => rental.tokenId === ownership.tokenId && (new Date(rental.timestamp.time).getTime() > new Date().getTime()))} theme={theme} />
                          </ACol>)
                        }
                      </ARow>
                      {
                        (!ownershipState.ownershipList || ownershipState.ownershipList.length === 0) && <ALayout className="flex flex-column align-center"><InfoCircleOutlined className={`text-3xl ${textColor}`} /><AText className={`text-center text-xl ${textColor}`}>No items</AText></ALayout>
                      }
                    </InfiniteScroll>
                  }
                  {
                    selectedTab === ProfileTab.Rental && <InfiniteScroll
                      className="mt-2"
                      dataLength={rentalState.rentals?.length ?? 0}
                      next={() => {
                        setLimit(offset + limit)
                        setOffset(offset + offset)
                      }}
                      hasMore={true}
                      loader={<></>}
                    >
                      <ARow gutter={[10, 20]}>
                        {
                          rentalState.rentals?.map((rental) => <ACol lg={6} xs={24} key={`rental-${rental.id}`}>
                            <MTokenCard token={rental.token} theme={theme} />
                          </ACol>)
                        }
                      </ARow>
                      {
                        (!rentalState.rentals || rentalState.rentals.length === 0) && <ALayout className="flex flex-column align-center"><InfoCircleOutlined className={`text-3xl ${textColor}`} /><AText className={`text-center text-xl ${textColor}`}>No items</AText></ALayout>
                      }
                    </InfiniteScroll>
                  }
                  {
                    selectedTab === ProfileTab.Transaction && <ALayout>
                      <Table columns={activityColumns} dataSource={activityList} className="mt-2 mb-4 min-w-max" pagination={false} />
                    </ALayout>
                  }
                </ALayout>
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

enum ProfileTab {
  Token = 'token',
  Collection = 'collection',
  Ownership = 'ownership',
  Rental = 'rental',
  Transaction = 'transaction',
}

interface Activity {
  event: EventType
  token: Token
  price: number
  from?: User
  to: User
  date: string
}

enum EventType {
  Minting = "minting",
  Purchase = "purchase",
  Rental = "rental",
  Fraction = "fraction",
}