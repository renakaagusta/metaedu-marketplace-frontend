import { AlignLeftOutlined, ArrowRightOutlined, BlockOutlined, ClockCircleOutlined, DownOutlined, EyeOutlined, FileTextOutlined, LineChartOutlined, PaperClipOutlined, ShoppingOutlined, SwapOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Form, Input, MenuProps, Row, Space } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip
} from 'chart.js';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { connect, useDispatch } from 'react-redux';
import { AuthState } from 'store/auth/interfaces';
import { FractionState } from 'store/fraction/interfaces';
import { OwnershipState } from 'store/ownership/interfaces';
import OwnershipActionTypes from 'store/ownership/interfaces/actions.interfaces';
import { RootReducerInterface } from 'store/reducer';
import { RentalState } from 'store/rental/interfaces';
import { ThemesState } from 'store/themes/interfaces';
import { TokenState } from 'store/token/interfaces';
import TokenActionTypes from 'store/token/interfaces/actions.interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import TransactionActionTypes from 'store/transaction/interfaces/actions.interfaces';
import { UserState } from 'store/user/interfaces';
import { Web3State } from "store/web3/interfaces";
import tailwindConfig from 'tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'
import 'chartjs-adapter-date-fns';

import AAvatar from '@/components/atoms/a_avatar/a_avatar';
import AButton from '@/components/atoms/a_button/a_button';
import ACol from '@/components/atoms/a_col/a_col';
import ADivider from '@/components/atoms/a_divider/a_divider';
import ALayout from '@/components/atoms/a_layout/a_layout';
import ALink from '@/components/atoms/a_link/a_link';
import ARow from '@/components/atoms/a_row/a_row';
import ASpin from '@/components/atoms/a_spin/a_spin';
import ATag from '@/components/atoms/a_tag/a_tag';
import AText from '@/components/atoms/a_text/a_text';
import MDrawer from '@/components/moleculs/m_drawer/m_drawer';
import MTokenAttributeCard from '@/components/moleculs/m_token_attribute_card/m_token_attribute_card';
import MTokenImage from '@/components/moleculs/m_token_image/m_token_image';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

import Ownership from '@/models/ownership.model';
import Token from '@/models/token.model';
import Transaction, { TransactionType } from '@/models/transaction.model';
import User from '@/models/user.model';
import { AppState } from '@/utils/state';

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

const twFullConfig = resolveConfig(tailwindConfig)

function TokenDetailPage(props: TokenDetailPageProps) {
  const { authState, themeState, web3State, tokenState, transactionState, fractionState, userState, ownershipState, rentalState } = props
  const { theme } = themeState

  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const [form] = Form.useForm()

  const [purchaseFormOpen, setPurchaseFormOpen] = useState<boolean>(false)
  const [rentalFormOpen, setRentalFormOpen] = useState<boolean>(false)
  const [focusedOwnership, setFocusedOwnership] = useState<Ownership>()
  const [token, setToken] = useState<Token>()
  const [transactionList, setTransactionList] = useState<Array<Transaction>>([])
  const [ownershipList, setOwnershipList] = useState<Array<Ownership>>([])
  const [lastActivityDate, setLastActivityDate] = useState<string>(new Date().toISOString())
  const [activityList, setActivityList] = useState<Array<Activity>>([])

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';


  const buy = async (quantity: number, ownership?: Ownership) => {
    if (!focusedOwnership && !ownership) {
      return
    }

    dispatch({
      type: TransactionActionTypes.SUBMIT_TRANSACTION,
      payload: {
        type: 'purchase',
        user: userState.myUserData,
        ownership: ownership ?? focusedOwnership,
        accessToken: authState.accessToken,
        quantity: quantity,
        amount: (ownership ?? focusedOwnership)!.salePrice * quantity,
        contract: web3State.contract,
      }
    })
  }

  const rent = async (rentalPeriod: number) => {
    if (!focusedOwnership) {
      return
    }

    dispatch({
      type: TransactionActionTypes.SUBMIT_TRANSACTION,
      payload: {
        type: 'rent',
        days: rentalPeriod,
        user: userState.myUserData,
        ownership: focusedOwnership,
        fractionOwnershipList: ownershipState.fractionOwnershipList,
        accessToken: authState.accessToken,
        quantity: focusedOwnership.quantity,
        amount: focusedOwnership.rentCost * rentalPeriod,
        contract: web3State.contract,
      }
    })
  }

  const onPurchaseSubmit = (values: PurchaseFormData) => {
    buy(values.quantity)
  };

  const onRentalSubmit = (values: RentalFormData) => {
    rent(values.days)
  };

  const handleOwnershipActionClick: MenuProps['onClick'] = (e) => {
    if (e.key.includes('buy')) {
      const ownershipId: string = e.key.split('-').slice(1, e.key.split('-').length).join().replaceAll(',', '-')
      const ownership = ownershipList.find((ownershipMap) => ownershipMap.id === ownershipId)

      if (!ownership) {
        return
      }

      setFocusedOwnership(ownership)

      if (ownership.token.supply === 1) {
        buy(ownership.quantity, ownership)
      } else {
        setPurchaseFormOpen(true)
      }
    } else {
      const ownershipId: string = e.key.split('-').slice(1, e.key.split('-').length).join().replaceAll(',', '-')
      const ownership = ownershipList.find((ownershipMap) => ownershipMap.id === ownershipId)

      if (ownership) {
        setFocusedOwnership(ownership)
        setRentalFormOpen(true)
      }
    }
  };

  const ownershipColumns: ColumnsType<Ownership> = [
    {
      title: () => {
        return <AText className={textColor}>User</AText>
      },
      key: 'user',
      render: (ownership: Ownership) =>
        <>
          {ownership?.user?.photo != '' ? <AAvatar src={ownership?.user?.photo} /> : <AAvatar>{ownership?.user?.name != '' ? ownership?.user?.name[0] : '?'}</AAvatar>}<AText className={`ml-2 ${textColor}`}>{token?.fractionId === '00000000-0000-0000-0000-000000000000' ? ownership?.user?.name : 'System'}</AText>
        </>
      ,
    },
    {
      title: () => {
        return <AText className={textColor}>Address</AText>
      },
      key: 'address',
      render: (ownership: Ownership) =>
        <ALink href={`/user/${ownership.user.id}`}><AText className="text-blue-400">{token?.fractionId === '00000000-0000-0000-0000-000000000000' ? ownership?.user?.address : '-'}</AText></ALink>
      ,
    },
    {
      title: () => <AText className={textColor}>Sale Price</AText>
      ,
      key: 'salePrice',
      render: (ownership: Ownership) =>
        <AText className={textColor}>{ownership?.salePrice / 1000000} ETH</AText>
    },
    {
      title: () => <AText className={textColor}>Rent Cost</AText>
      ,
      key: 'rentCost',
      render: (ownership: Ownership) =>
        <AText className={textColor}>{ownership?.rentCost / 1000000} ETH</AText>
    },
    {
      title: () => <AText className={textColor}>Quantity</AText>
      ,
      key: 'quantity',
      render: (ownership: Ownership) =>
        <AText className={textColor}>{ownership?.quantity} X</AText>
    },
    {
      title: () => <AText className={textColor}>Status</AText>,
      key: 'status',
      render: (ownership: Ownership) =>
        <>{ownership?.availableForRent ? <ATag color="green">Available for rent</ATag> : <ATag color="default">Not available for rent</ATag>} {ownership?.availableForSale ? <ATag color="blue">Available for sale</ATag> : <ATag color="default">Not available for sale</ATag>}</>
    },
    {
      title: () => {
        return <AText className={textColor}>Action</AText>
      },
      key: 'action',
      render: (ownership: Ownership) =>
        <>
          {
            ownership.userId !== userState.myUserData?.id && <Dropdown
              menu={{
                onClick: handleOwnershipActionClick,
                items: [
                  {
                    label: 'Buy',
                    key: `buy-${ownership.id}`,
                    disabled: !ownership.availableForSale,
                    icon: <ShoppingOutlined />,
                  },
                  {
                    label: 'Rent',
                    key: `rent-${ownership.id}`,
                    disabled: !ownership.availableForRent,
                    icon: <PaperClipOutlined />,
                  },
                ]
              }}>
              <Button className="rounded-xl" size="large">
                <Space>
                  Action
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          }
        </>
    },
  ];

  const activityColumns: ColumnsType<Activity> = [
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

  useEffect(() => {
    if (!id) {
      return
    }

    if (tokenState.tokenDetailState === AppState.LoadComplete) {
      return
    }

    dispatch({
      type: TokenActionTypes.GET_TOKEN_DETAIL,
      payload: id
    })
  }, [id, tokenState.tokenDetailState, userState.myUserDataState])

  useEffect(() => {
    if (!id) {
      return
    }

    if (ownershipState.fractionOwnershipListState === AppState.LoadComplete) {
      return
    }

    if (!tokenState.token?.fractionId) {
      return
    }

    dispatch({
      type: OwnershipActionTypes.GET_FRACTION_OWNERSHIP_LIST,
      payload: {
        offset: 0,
        limit: 5,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC',
        tokenId: tokenState.token!.fractionId
      }
    })
  }, [id, tokenState.tokenDetailState])

  useEffect(() => {
    if (!id) {
      return
    }

    if (ownershipState.ownershipListState !== AppState.Initial) {
      return
    }

    dispatch({
      type: OwnershipActionTypes.GET_OWNERSHIP_LIST,
      payload: {
        offset: 0,
        limit: 5,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC',
        tokenId: id
      }
    })
  }, [id, ownershipState.ownershipListState])

  useEffect(() => {
    if (!id) {
      return
    }

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
        tokenId: id
      }
    })
  }, [id, transactionState.transactionListState])

  useEffect(() => {
    if (tokenState.tokenDetailState !== AppState.LoadComplete) {
      return
    }

    if (transactionState.transactionListState !== AppState.LoadComplete) {
      return
    }

    if (!transactionState.transactions) {
      if (!tokenState.token?.createdAt.time) {
        return
      }

      setLastActivityDate(tokenState.token?.createdAt.time)
      return
    }

    setLastActivityDate(transactionState.transactions[0].createdAt.time)
  }, [tokenState.tokenDetailState, transactionState.transactionListState])

  useEffect(() => {
    if (!tokenState.token) {
      return
    }

    setToken(tokenState.token as Token)
  }, [tokenState.token])

  useEffect(() => {
    if (!transactionState.transactions) {
      return
    }

    setOwnershipList(ownershipState.ownershipList as Array<Ownership>)
  }, [ownershipState.ownershipList])

  useEffect(() => {
    if (!ownershipState.ownershipList) {
      return
    }

    setOwnershipList(ownershipState.ownershipList as Array<Ownership>)
  }, [ownershipState.ownershipList])

  useEffect(() => {
    if (!transactionState.transactions) {
      return
    }

    setTransactionList(transactionState.transactions as Array<Transaction>)
  }, [ownershipState.ownershipList])

  useEffect(() => {
    if (tokenState.tokenDetailState !== AppState.LoadComplete || transactionState.transactionListState !== AppState.LoadComplete) {
      return
    }

    if (!tokenState.token) {
      return
    }

    const activityList: Array<Activity> = []

    transactionState.transactions?.forEach((transaction) => {
      activityList.push({
        event: transaction.type === TransactionType.Purchase ? EventType.Purchase : EventType.Rental,
        price: transaction.amount / transaction.quantity,
        from: transaction.userFrom,
        to: transaction.userTo,
        date: transaction.createdAt.time
      })
    })

    activityList.push({
      event: EventType.Minting,
      price: tokenState.token.lastPrice,
      from: undefined,
      to: tokenState.token.creator,
      date: tokenState.token.createdAt.time
    })

    setActivityList(activityList)
  }, [token, transactionList])

  useEffect(() => {
    if (transactionState.transactionSubmitState === AppState.LoadComplete) {
      // router.reload()
    }
  }, [transactionState.transactionSubmitState])

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
              (tokenState.tokenDetailState != AppState.LoadComplete || ownershipState.ownershipListState != AppState.LoadComplete) && <ALayout className='h-screen w-full bg-transparent flex justify-center items-center'>
                <ASpin className='mt-8' />
              </ALayout>
            }
            {
              (tokenState.tokenDetailState == AppState.LoadComplete && ownershipState.ownershipListState == AppState.LoadComplete) && <ALayout className='bg-transparent'><Row>
                <Col span={10}>
                  <ALayout className="shadow-lg bg-slate-100 flex justify-center">
                    {token && <ALayout className="h-[500px]">
                      <MTokenImage token={token} height={500} />
                    </ALayout>}
                  </ALayout>
                  <ALayout className={`rounded-lg border mt-5 border-1 border-solid ${theme === 'dark' ? 'border-zinc-500 bg-zinc-800' : 'border-slate-400 bg-white'}`}>
                    <ALayout className='px-5 pb-4 pt-4 m-0 flex flex-row justify-start align-center'>
                      <AlignLeftOutlined className='text-lg' />
                      <AText className={`ml-2 text-lg  ${textColor}`}>Description</AText>
                    </ALayout>
                    <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} m-1`} />
                    <ALayout className='px-5 py-4 m-0'>
                      <AText className={'font-bold m-0 p-0 ' + clsx(textColor)}>{token?.description}</AText>
                    </ALayout>
                  </ALayout>
                  {
                    (token?.attributes && token?.attributes.length !== 0) && <ALayout className={`rounded-lg border mt-5 border-1 border-solid ${theme === 'dark' ? 'border-zinc-500 bg-zinc-800' : 'border-slate-400 bg-white'}`}>
                      <ALayout className='px-5 pb-4 pt-4 m-0 flex flex-row justify-start align-center'>
                        <FileTextOutlined className='text-lg' />
                        <AText className={`ml-2 text-lg  ${textColor}`}>Attributes</AText>
                      </ALayout>
                      <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} m-1`} />
                      <ALayout className='p-2'>
                        <ARow gutter={[2, 2]}>
                          {
                            token?.attributes.map((attribute) => <ACol lg={6} xs={24} key={`token-attribute-${attribute.traitType}`}>
                              <MTokenAttributeCard attribute={attribute} theme={theme} />
                            </ACol>)
                          }
                        </ARow>
                      </ALayout>
                    </ALayout>
                  }
                </Col>
                <Col span={14} >
                  <ALayout className="pl-4">
                    <ALayout className="px-5">
                      {token?.collection?.title.valid && <AText className='text-lg text-blue-500'>{token?.collection?.title.string}</AText>}
                      <AText className={`text-2xl ${textColor}`}>{token?.title} <AText className={`text-2xl font-bold ${textColor}`}>{token?.sourceId !== '00000000-0000-0000-0000-000000000000' ? '(Fraction)' : ''}{token?.fractionId !== '00000000-0000-0000-0000-000000000000' ? '(Parent)' : ''}</AText></AText>
                      {token?.sourceId !== '00000000-0000-0000-0000-000000000000' && <ALink href={`/token/${token?.sourceId}`}><AText className="text-blue-500">See parent token <ArrowRightOutlined /></AText></ALink>}
                      {token?.fractionId !== '00000000-0000-0000-0000-000000000000' && <ALink href={`/token/${token?.fractionId}`}><AText className="text-blue-500">See fraction token <ArrowRightOutlined /></AText></ALink>}
                      <AText className={`text-lg mb-5 ${textColor}`}>Minted by <ALink href={`/user/${token?.creator.id}`}><AText className="text-blue-500">{token?.creator.name !== '' ? token?.creator.name : token?.creator.address}</AText></ALink></AText>
                      <ALayout className="w-[50vw]">
                        <Row>
                          <Col span={6}>
                            <ALayout className='flex flex-row justify-start items-center'>
                              <HiOutlineUserGroup className='text-2xl' />
                              <AText className={'ml-2 text-lg ' + clsx(textColor)}>{ownershipList.length} Owners</AText>
                            </ALayout>
                          </Col>
                          <Col span={6}>
                            <ALayout className='flex flex-row justify-start items-center'>
                              <TableOutlined className='text-2xl' />
                              <AText className={'ml-2 text-lg ' + clsx(textColor)}>{token?.supply} Items</AText>
                            </ALayout>
                          </Col>
                          <Col span={6}>
                            <ALayout className='flex flex-row justify-start items-center'>
                              <EyeOutlined className='text-2xl' />
                              <AText className={'ml-2 text-lg ' + clsx(textColor)}>{token?.views} Views</AText>
                            </ALayout>
                          </Col>
                          <Col span={6}>
                            {token?.category.title != '' && <ALayout className='flex flex-row justify-start items-center'>
                              <BlockOutlined className='text-2xl' />
                              <AText className={'ml-2 text-lg ' + clsx(textColor)}>{token?.category.title}</AText>
                            </ALayout>}
                          </Col>
                        </Row>
                      </ALayout>
                    </ALayout>
                    <ALayout className={`rounded-lg border ml-4 mt-5 border-1 border-solid ${theme === 'dark' ? 'border-zinc-500 bg-zinc-800' : 'border-slate-400 bg-white'}`}>
                      <ALayout className='px-5 pb-4 pt-4 m-0 flex flex-row justify-start align-center'>
                        <ClockCircleOutlined className='text-lg' />
                        <AText className={`ml-2 text-lg  ${textColor}`}>Last activity {dayjs(lastActivityDate).format('hh:mm, DD MMMM YYYY')}</AText>
                      </ALayout>
                      <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} m-1`} />
                      <ALayout className='px-5 py-4 m-0'>
                        <AText className={'font-bold m-0 p-0 ' + clsx(textColor)}>Last Price</AText><br />
                        <AText className={'font-bold text-3xl  m-0 p-0 ' + clsx(textColor)}>{(token?.lastPrice ?? 0) / 1000000} ETH</AText>
                      </ALayout>
                    </ALayout>
                    {
                      (activityList) &&
                      <ALayout className={`rounded-lg border ml-4 mt-5 border-1 border-solid ${theme === 'dark' ? 'border-zinc-500 bg-zinc-800' : 'border-slate-400 bg-white'}`}>
                        <ALayout className='px-5 pb-4 pt-4 m-0 flex flex-row justify-start align-center'>
                          <LineChartOutlined className='text-lg' />
                          <AText className={`ml-2 text-lg ${textColor}`}>Price History</AText>
                        </ALayout>
                        <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} m-1`} />
                        <ALayout className="p-5">
                          <Line options={{
                            responsive: true,
                            scales: {
                              x: {
                                type: 'time',
                                time: {
                                  parser: 'yyyy-MM-dd HH:mm',
                                  unit: 'day'
                                }
                              }
                            },
                            plugins: {
                              legend: {
                                display: false
                              },
                            },
                          }} data={{
                            labels: activityList.slice().reverse().filter((activity) => activity.event !== EventType.Rental).map((activity) => dayjs(activity.date).format('YYYY-MM-DD HH:mm')),
                            datasets: [
                              {
                                data: activityList.slice().reverse().filter((activity) => activity.event !== EventType.Rental).map((activity) => activity.price / 1000000),
                                borderColor: '#0ea5e9',
                                backgroundColor: '#0ea5e9'
                              },
                            ],
                          }} />
                        </ALayout>
                      </ALayout>
                    }
                  </ALayout>
                </Col>
              </Row>
                <ALayout className={`rounded-lg border mt-5 border-1 border-solid mb-5 ${theme === 'dark' ? 'border-zinc-500 bg-zinc-800' : 'border-slate-400 bg-white'}`}>
                  <ALayout className='px-5 pb-4 pt-4 m-0 flex flex-row justify-start align-center'>
                    <SwapOutlined className='text-lg' />
                    <AText className={`ml-2 text-lg ${textColor}`}>Activity</AText>
                  </ALayout>
                  <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} m-1`} />
                  <ALayout className='px-3 py-3 m-0'>
                    <Table columns={activityColumns} dataSource={activityList} className="mt-2 mb-4" pagination={false} />
                  </ALayout>
                </ALayout>
                <ALayout className={`rounded-lg border mt-5 border-1 border-solid mb-5 ${theme === 'dark' ? 'border-zinc-500 bg-zinc-800' : 'border-slate-400 bg-white'}`}>
                  <ALayout className='px-5 pb-4 pt-4 m-0 flex flex-row justify-start align-center'>
                    <UserOutlined className='text-lg' />
                    <AText className={`ml-2 text-lg  ${textColor}`}>Owners</AText>
                  </ALayout>
                  <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} m-1`} />
                  <ALayout className='px-3 py-3 m-0'>
                    <Table columns={ownershipColumns} dataSource={ownershipList} className="mt-2 mb-4" pagination={false} />
                  </ALayout>
                </ALayout>
              </ALayout>
            }
          </div>
          <MDrawer title="Purchase Form" className={theme} headerStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} bodyStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} placement="right" onClose={() => setPurchaseFormOpen(!purchaseFormOpen)} open={purchaseFormOpen}>
            <ALayout className="flex flex-col bg-transparent">
              <AText className={'text-lg ' + clsx(textColor)}>Input quantity</AText>
              <Form name="purchasement_form" form={form} onFinish={onPurchaseSubmit}>
                <Form.Item name="quantity" rules={[{ required: true, message: 'Please input quantity' }]}>
                  <Input className={`mt-1 bg-${theme} ${textColor}`} placeholder="Quantity" />
                </Form.Item>
                <AButton className={`mt-4 mb-4 bg-${theme} ${textColor}`} htmlType="submit" loading={tokenState.tokenSubmitState == AppState.Loading}>Submit</AButton>
              </Form>
            </ALayout>
          </MDrawer>
          <MDrawer title="Rental Form" className={theme} headerStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} bodyStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} placement="right" onClose={() => setRentalFormOpen(!rentalFormOpen)} open={rentalFormOpen}>
            <ALayout className="flex flex-col bg-transparent">
              <AText className={'text-lg ' + clsx(textColor)}>Input rental period (days)</AText>
              <Form name="rental_form" form={form} onFinish={onRentalSubmit}>
                <Form.Item name="days" rules={[{ required: true, message: 'Please input rental period' }]}>
                  <Input className={`mt-1 bg-${theme} ${textColor}`} placeholder="Rental period" />
                </Form.Item>
                <AButton className={`mt-4 mb-4 bg-${theme} ${textColor}`} htmlType="submit" loading={tokenState.tokenSubmitState == AppState.Loading}>Submit</AButton>
              </Form>
            </ALayout>
          </MDrawer>
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
  }))(TokenDetailPage)

interface TokenDetailPageProps {
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

interface PurchaseFormData {
  quantity: number
}

interface RentalFormData {
  days: number
}

interface Activity {
  event: EventType
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