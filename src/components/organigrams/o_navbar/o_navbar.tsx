/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SearchOutlined, ShoppingCartOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Form, FormInstance, Input, message, Tooltip } from "antd";
import clsx from "clsx";
import { ethers } from "ethers";
import { Moon as MoonIcon, Sun as SunIcon } from 'lucide-react';
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Metaedu from 'src/abis/Metaedu.json';
import { AuthState } from "store/auth/interfaces";
import AuthActionTypes from "store/auth/interfaces/actions.interfaces";
import { FractionState } from "store/fraction/interfaces";
import FractionActionTypes from "store/fraction/interfaces/actions.interfaces";
import { OwnershipState } from "store/ownership/interfaces";
import OwnershipActionTypes from "store/ownership/interfaces/actions.interfaces";
import { RentalState } from "store/rental/interfaces";
import RentalActionTypes from "store/rental/interfaces/actions.interfaces";
import { ThemesActionTypes, ThemesState } from "store/themes/interfaces";
import { TransactionState } from "store/transaction/interfaces";
import TransactionActionTypes from "store/transaction/interfaces/actions.interfaces";
import { UserState } from "store/user/interfaces";
import UserActionTypes from "store/user/interfaces/actions.interfaces";
import { Web3State } from "store/web3/interfaces";
import Web3ActionTypes from "store/web3/interfaces/actions.interfaces";
import tailwindConfig from 'tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'
import Web3Modal from 'web3modal';

import AButton from "@/components/atoms/a_button/a_button";
import ACol from "@/components/atoms/a_col/a_col";
import ADivider from "@/components/atoms/a_divider/a_divider";
import AInput from "@/components/atoms/a_input/a_input";
import ALayout from "@/components/atoms/a_layout/a_layout";
import ALink from "@/components/atoms/a_link/a_link";
import ARow from "@/components/atoms/a_row/a_row";
import ASpin from "@/components/atoms/a_spin/a_spin";
import ATabs from "@/components/atoms/a_tabs/a_tabs";
import AText from "@/components/atoms/a_text/a_text";
import MDrawer from "@/components/moleculs/m_drawer/m_drawer";
import MOwnershipCard, { UpdateType } from "@/components/moleculs/m_ownership_card/m_ownership_card";
import MPopover from "@/components/moleculs/m_popover/m_popover";
import MRentalCard from "@/components/moleculs/m_rental_card/m_rental_card";
import MTransactionCard from "@/components/moleculs/m_transaction_card/m_transaction_card";

import Ownership from "@/models/ownership.model";
import { AppState } from "@/utils/state";

const twFullConfig = resolveConfig(tailwindConfig)

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export interface ONavBarProps {
  textColor: string,
  theme: string,
  toolbar?: React.ReactNode
  web3State: Web3State
  themeState: ThemesState
  authState: AuthState
  transactionState: TransactionState
  ownershipState: OwnershipState
  fractionState: FractionState
  rentalState: RentalState
  userState: UserState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitKeyword?: (value: string) => void
  dispatch(params: any): any
}

export interface SearchFormData {
  keyword: string
}

// STAGING

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider,
//     options: {
//       infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
//     },
//   },
// }

// LOCAL

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      network: RPC_URL
    },
  },
}

export default function ONavBar(props: ONavBarProps) {
  const { theme, textColor, toolbar, authState, transactionState, fractionState, ownershipState, rentalState, themeState, userState, web3State, onSubmitKeyword } = props

  const router = useRouter()
  const ref = useRef<FormInstance<any>>(null)
  const dispatch = useDispatch()
  const [searchForm] = Form.useForm()
  const [fractionForm] = Form.useForm()

  const [navbar, setNavbar] = React.useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false)
  const [brightnessMenuOpen, setBrightnessMenuOpen] = React.useState(false)
  const [ownedItemOpen, setOwnedItemOpen] = React.useState(false)
  const [transactionOpen, setTransactionOpen] = React.useState(false)
  const [fractionFormOpen, setFractionFormOpen] = React.useState(false)
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null)
  const [hostname, setHostname] = useState("")
  const [salePriceList, setSalePriceList] = useState<Array<number>>([])
  const [rentCostList, setRentCostList] = useState<Array<number>>([])

  const [focusedOwnership, setFocusedOwnership] = useState<Ownership>()
  const [focusedMyItemTab, setFocusedMyItemTab] = useState<string>('1')
  const [focusedTransactionTab, setFocusedTransactionTab] = useState<string>('1')

  const myItemTabList = [
    {
      key: '1',
      label: `Owned`,
    },
    {
      key: '2',
      label: `Rented`,
    }
  ];

  const transactionTabList = [
    {
      key: '1',
      label: `Purchase`,
    },
    {
      key: '2',
      label: `Sale`,
    },
    {
      key: '3',
      label: `Rental`,
    },
  ];

  const onSubmit = (values: SearchFormData) => {
    if (router.pathname === '/token') {
      if (!onSubmitKeyword) {
        return
      }

      router.push({
        pathname: '/token',
        query: {
          ...router.query,
          keyword: values.keyword
        }
      })

      onSubmitKeyword(values.keyword)
    } else {
      router.push({
        pathname: '/token',
        query: {
          keyword: values.keyword
        }
      })
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.keyCode === 13) {
      ref.current?.submit();
    }
  }

  const connect = () => {
    dispatch({
      type: Web3ActionTypes.SET_CONNECT_COUNTER_STATE,
      payload: (web3State.connectCounter ?? 0) + 1
    })
  }

  const updateOwnership = async (ownership: Ownership, type: UpdateType) => {
    dispatch({
      type: OwnershipActionTypes.UPDATE_OWNERSHIP,
      payload: {
        contract: web3State.contract,
        accessToken: authState.accessToken,
        type: type,
        ownership: ownership
      }
    })
  }

  const submitFraction = async (values: FractionFormData) => {
    if (!web3State.contract || !authState.accessToken) {
      return
    }

    if (values.supply <= 1) {
      message.error('Supply must be greater than 1')
      return
    }

    if (fractionState.fractionSubmitState == AppState.Loading) {
      return
    }

    dispatch({
      type: FractionActionTypes.SUBMIT_FRACTION,
      payload: {
        contract: web3State.contract,
        accessToken: authState.accessToken,
        ownership: focusedOwnership,
        supply: Number(values.supply),
        price: Number(values.price) * 1000000
      }
    })
  }

  const handleFraction = async (ownership: Ownership) => {
    setFocusedOwnership(ownership)
    setFractionFormOpen(true)
  }

  const onDetail = async (id: string) => {
    router.push(`/token/${id}`)
  }

  const changeTheme = (mode: string) => {
    dispatch({
      type: ThemesActionTypes.CHANGE_THEMES,
      payload: { theme: mode }
    })
  }

  const onMyItemTabChange = (key: string) => {
    setFocusedMyItemTab(key)
  };

  const onTransactionTabChange = (key: string) => {
    setFocusedTransactionTab(key)
  };

  const handleChange = (index: number, type: UpdateType, value: number) => {
    if (type === UpdateType.SalePrice) {
      const updatedSalePriceList = [...salePriceList]
      updatedSalePriceList[index] = value
      setSalePriceList(updatedSalePriceList)
    } else {
      const updatedRentCostList = [...rentCostList]
      updatedRentCostList[index] = value
      setRentCostList(updatedRentCostList)
    }
  }

  useEffect(() => {
    if (!ownershipState.myOwnershipList) {
      return
    }

    setSalePriceList(ownershipState.myOwnershipList?.map((ownership) => ownership.salePrice))
    setRentCostList(ownershipState.myOwnershipList?.map((ownership) => ownership.rentCost))
  }, [ownershipState.myOwnershipList])

  // Fetch user data 
  useEffect(() => {
    if (!authState.accessToken) {
      return
    }

    if (userState.myUserDataState === AppState.Loading) {
      return
    }

    dispatch({
      type: UserActionTypes.GET_MY_USER_DATA,
      payload: {
        accessToken: authState.accessToken
      }
    })

  }, [authState.accessToken])

  // Load storage data
  useEffect(() => {
    dispatch({
      type: AuthActionTypes.LOAD_STORAGE_DATA,
    })
    dispatch({
      type: ThemesActionTypes.LOAD_STORAGE_DATA,
    })
  }, [web3State.connectCounter])

  // Set Web3Modal
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    setWeb3Modal(new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: false,
      providerOptions, // required
    }))
  }, [])

  // Set provider
  useEffect(() => {
    if (!web3Modal) {
      return
    }

    const configProvider = async () => {
      if (!web3State.provider) {
        const provider = await web3Modal.connect()

        dispatch({
          type: Web3ActionTypes.SET_PROVIDER,
          payload: provider
        })
      }

      if (!web3State.provider) {
        return
      }
    }

    configProvider()
  }, [web3Modal, web3State.provider, web3State.connectCounter])

  // Set web3 provider
  useEffect(() => {
    if (!web3State.provider) {
      return
    }

    const web3Provider = new ethers.providers.Web3Provider(web3State.provider)

    dispatch({
      type: Web3ActionTypes.SET_WEB3_PROVIDER,
      payload: web3Provider
    })
  }, [web3State.provider, web3State.connectCounter])

  // Set signer
  useEffect(() => {
    if (!web3State.web3Provider) {
      return
    }

    const signer = web3State.web3Provider.getSigner()

    dispatch({
      type: Web3ActionTypes.SET_SIGNER,
      payload: signer
    })

    const configNetwork = async () => {
      const network = await (web3State.web3Provider as ethers.providers.Web3Provider).getNetwork()

      dispatch({
        type: Web3ActionTypes.SET_NETWORK,
        payload: network
      })
    }

    configNetwork()
  }, [web3State.web3Provider, web3State.connectCounter])

  // Set account address
  useEffect(() => {
    if (!web3State.signer) {
      return
    }

    const configAddress = async () => {
      const address = (await web3State.signer!.getAddress()).toLowerCase()

      dispatch({
        type: Web3ActionTypes.SET_ADDRESS,
        payload: address
      })
    }

    configAddress()
  }, [web3State.signer, web3State.connectCounter])

  // Connect to contract
  useEffect(() => {
    if (!web3State.address || !web3State.signer) {
      return
    }

    const connectToContract = async () => {
      const abi = (Metaedu as any).abi;
      const contract = new ethers.Contract(CONTRACT_ADDRESS!, abi, web3State.signer!)

      dispatch({
        type: Web3ActionTypes.SET_CONTRACT,
        payload: contract
      })
    }

    connectToContract()
  }, [web3State.address, web3State.signer, web3State.connectCounter])

  // Get user nonce
  useEffect(() => {
    if (!web3State.contract || authState.isRegistered == false || authState.nonce) {
      return
    }

    dispatch({
      type: AuthActionTypes.GET_USER_NONCE,
      payload: web3State.address
    })
  }, [authState.nonce, authState.isRegistered, web3State.address, web3State.contract, web3State.connectCounter])

  // Sign in
  useEffect(() => {
    if (authState.signInState == AppState.Loading || !authState.nonce || !authState.isRegistered || !authState.nonce || !web3State.signer || authState.accessToken || web3State.connectCounter == 0) {
      return
    }

    const signIn = async () => {
      try {
        dispatch({
          type: AuthActionTypes.SIGN_IN,
          payload: {
            address: web3State.address,
            nonce: authState.nonce,
            signer: web3State.signer
          }
        })
      } catch (e) {
        message.error('Sign in failed')
      }
    }

    signIn()
  }, [authState.isRegistered, authState.nonce, web3State.address, web3State.signer, web3State.connectCounter])

  // Sign up
  useEffect(() => {
    if (authState.isRegistered !== false) {
      return
    }

    const signUp = async () => {
      dispatch({
        type: AuthActionTypes.SIGN_UP,
        payload: {
          address: web3State.address,
          nonce: authState.nonce
        }
      })
    }

    signUp()
  }, [authState.isRegistered, authState.nonce, web3State.address, web3State.connectCounter])

  // Set theme
  useEffect(() => {
    if (themeState.theme === '') {
      dispatch({
        type: ThemesActionTypes.CHANGE_THEMES,
        payload: { theme: 'dark' }
      })
    }
  }, [])

  // Fetch ownership & transaction
  useEffect(() => {
    if (!authState.accessToken) {
      return
    }

    if (userState.myUserDataState != AppState.LoadComplete || !userState.myUserData) {
      return
    }

    if (transactionState.myTransactionListState === AppState.Loading) {
      return
    }

    dispatch({
      type: OwnershipActionTypes.GET_MY_OWNERSHIP_LIST,
      payload: {
        accessToken: authState.accessToken,
        userId: userState.myUserData.id,
        offset: 0,
        limit: 100,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC',
      }
    })

    dispatch({
      type: RentalActionTypes.GET_MY_RENTAL_LIST,
      payload: {
        accessToken: authState.accessToken,
        userId: userState.myUserData.id,
        offset: 0,
        limit: 100,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC',
      }
    })

    dispatch({
      type: TransactionActionTypes.GET_MY_TRANSACTION_LIST,
      payload: {
        accessToken: authState.accessToken,
        userId: userState.myUserData.id,
        offset: 0,
        limit: 100,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC',
      }
    })
  }, [authState.accessToken, userState.myUserDataState])

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `http://${host}`;

    setHostname(baseUrl);
  }, [router.pathname]);

  useEffect(() => {
    if (!router.query.keyword) {
      return
    }

    const { keyword } = router.query

    searchForm.setFieldValue('keyword', keyword)
  }, [router.query])

  useEffect(() => {
    if (fractionState.fractionSubmitState === AppState.LoadComplete && fractionState.fractionSubmittedId) {
      router.reload()
    }
  }, [fractionState])

  return <nav className={'fixed w-full z-40 border-solid border-t-0 border-l-0 border-r-0 border-b-1 ' + clsx(theme === 'dark' ? 'bg-dark border-zinc-700' : 'bg-white border-gray-100', textColor)}>
    <div className="justify-between mx-auto lg:w-11/12 md:items-center md:flex">
      <div>
        <div className="flex items-center justify-between p-2 py-5">
          <a href={hostname}><h2 className={clsx('lg:text-3xl xs:text-xl font-bold', textColor)}>MetaEdu Marketplace</h2></a>
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'
            }`}
        >
          <Form className={`mt-5  ${theme}`} ref={ref} form={searchForm} onKeyUp={handleKeyUp} tabIndex={0} onFinish={onSubmit}>
            <Form.Item name="keyword">
              <AInput
                placeholder="Search items"
                className={`bg-transparent rounded-lg w-[30vw] text-xl py-2 border-1 ${theme === 'dark' ? 'border-zinc-500 caret-white' : 'border-gray-900'}`}
                suffix={
                  <Tooltip title="Extra insearchFormation">
                    <SearchOutlined style={{ color: theme === 'dark' ? 'white' : 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'
            }`}
        >
          <ARow gutter={[40, 0]} align="middle">
            <ACol>
              <ALink href="/stats">
                <AText className={clsx('text-xl ', textColor)}>
                  Stats
                </AText>
              </ALink>
            </ACol>
            <ACol>
              <ALink href="/docs">
                <AText className={clsx('text-xl ', textColor)}>
                  Docs
                </AText>
              </ALink>
            </ACol>
            {
              (authState.signInState === AppState.LoadComplete && userState.myUserDataState === AppState.LoadComplete) && <ACol>
                <AButton icon={<ShoppingCartOutlined className={clsx('text-3xl', textColor)} />} className="bg-transparent border-none icon" onClick={() => setTransactionOpen(!transactionOpen)} />
                <MDrawer title="Transaction List" placement="right" className={theme} headerStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} bodyStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} onClose={() => setTransactionOpen(!transactionOpen)} open={transactionOpen}>
                  <ATabs defaultActiveKey="1" items={transactionTabList} onChange={onTransactionTabChange} className={textColor} />
                  {
                    (focusedTransactionTab === '1' && transactionState.myTransactionListState === AppState.LoadComplete) && <>
                      {(transactionState.myTransactions?.filter((transaction) => transaction.type == 'purchase' && transaction.userFromId === userState.myUserData?.id)?.length === 0 || !transactionState.myTransactions) && <AText className={textColor}>Transaction not found</AText>}
                      {
                        transactionState.myTransactions?.filter((transaction) => transaction.type == 'purchase' && transaction.userFromId === userState.myUserData?.id)?.map((transaction) => MTransactionCard({
                          transaction: transaction,
                          user: userState.myUserData!,
                          theme: theme
                        }))
                      }
                    </>
                  }
                  {
                    (focusedTransactionTab === '2' && transactionState.myTransactionListState === AppState.LoadComplete) && <>
                      {(transactionState.myTransactions?.filter((transaction) => transaction.type == 'purchase' && transaction.userToId === userState.myUserData?.id)?.length === 0 || !transactionState.myTransactions) && <AText className={textColor}>Transaction not found</AText>}
                      {
                        transactionState.myTransactions?.filter((transaction) => transaction.type == 'purchase' && transaction.userToId === userState.myUserData?.id)?.map((transaction) => MTransactionCard({
                          transaction: transaction,
                          user: userState.myUserData!,
                          theme: theme
                        }))
                      }
                    </>
                  }
                  {
                    (focusedTransactionTab === '3' && transactionState.myTransactionListState === AppState.LoadComplete) && <>
                      {(transactionState.myTransactions?.filter((transaction) => transaction.type == 'rent' && transaction.userToId === userState.myUserData?.id)?.length === 0 || !transactionState.myTransactions) && <AText className={textColor}>Transaction not found</AText>}
                      {
                        transactionState.myTransactions?.filter((transaction) => transaction.type == 'rent' && transaction.userToId === userState.myUserData?.id)?.map((transaction) => MTransactionCard({
                          transaction: transaction,
                          user: userState.myUserData!,
                          theme: theme
                        }))
                      }
                    </>
                  }
                </MDrawer>
              </ACol>
            }
            {
              authState.signInState === AppState.LoadComplete && <ACol style={{ color: 'white' }}>
                <ASpin spinning={ownershipState.myOwnershipListState === AppState.Loading}>
                  <MDrawer title="My Items" className={theme} headerStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} bodyStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} placement="right" onClose={() => setOwnedItemOpen(!ownedItemOpen)} open={ownedItemOpen}>
                    <ATabs defaultActiveKey="1" items={myItemTabList} onChange={onMyItemTabChange} className={textColor} />
                    {
                      (focusedMyItemTab === '1' && ownershipState.myOwnershipListState === AppState.LoadComplete) && <>
                        {(ownershipState.myOwnershipList?.length === 0 || !ownershipState.myOwnershipList) && <AText className={textColor}>Item not found</AText>}
                        {
                          ownershipState.myOwnershipList?.map((ownership, index) => MOwnershipCard({
                            ownership: ownership,
                            theme: theme,
                            salePrice: salePriceList[index],
                            rentCost: rentCostList[index],
                            onChange: (type: UpdateType, value: number) => handleChange(index, type, value),
                            onUpdate: (ownership: Ownership, type: UpdateType) => updateOwnership(ownership, type),
                            onDetail: (id: string) => onDetail(id),
                            onFraction: (ownership: Ownership) => handleFraction(ownership)
                          }))
                        }
                      </>
                    }
                    {
                      (focusedMyItemTab === '2' && rentalState.myRentalListState === AppState.LoadComplete) && <>
                        {(rentalState.myRentals?.filter((rental) => rental.userId === userState.myUserData!.id).length === 0 || !rentalState.myRentals) && <AText className={textColor}>Item not found</AText>}
                        {
                          rentalState.myRentals?.filter((rental) => rental.userId === userState.myUserData!.id).map((rental) => MRentalCard({
                            rental: rental,
                            theme: theme
                          }))
                        }
                      </>
                    }
                  </MDrawer>
                </ASpin>
                <AButton icon={<UnorderedListOutlined className={clsx('text-3xl icon ', textColor)} />} className="bg-transparent border-none icon" onClick={() => setOwnedItemOpen(!ownedItemOpen)} />
              </ACol>
            }
            <ACol>
              <MPopover
                content={
                  <ARow className="w-[100px]">
                    <ACol span={24}>
                      <a onClick={() => changeTheme('light')}><AText className="text-lg">Light</AText></a>
                      <ADivider className="m-0 my-2" />
                    </ACol>
                    <ACol span={24}>
                      <a onClick={() => changeTheme('dark')}><AText className="text-lg">Dark</AText></a>
                      <ADivider className="m-0 my-2" />
                    </ACol>
                    <ACol span={24}>
                      <a onClick={() => changeTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')}><AText className="text-lg">System</AText></a>
                      <ADivider className="m-0 my-2" />
                    </ACol>
                  </ARow>
                }
                title=""
                trigger="click"
                open={brightnessMenuOpen}
                onOpenChange={() => setBrightnessMenuOpen(!brightnessMenuOpen)}
                placement="bottom"
              >
                <AButton icon={themeState.theme === 'light' ? <SunIcon /> : <MoonIcon />} className={clsx('border-none bg-transparent icon', textColor)} />
              </MPopover>
            </ACol>
            <ACol>
              <MPopover
                content={
                  <ARow className="w-[100px]">
                    <ACol span={24}>
                      <ALink href={`/user/${userState.myUserData?.id}`}><AText className="text-lg">My Profile</AText></ALink>
                      <ADivider className="m-0 my-2" />
                    </ACol>
                    <ACol span={24}>
                      <ALink href="/user/edit"><AText className="text-lg">Edit Profile</AText></ALink>
                      <ADivider className="m-0 my-2" />
                    </ACol>
                    <ACol span={24}>
                      <ALink href="/token/add"><AText className="text-lg">Mint token</AText></ALink>
                      <ADivider className="m-0 my-2" />
                    </ACol>
                    <ACol span={24}>
                      <ALink href="/collection/add"><AText className="text-lg">Create collection</AText></ALink>
                      <ADivider className="m-0 my-2" />
                    </ACol>
                    {/* <ACol span={24} className="mt-1">
                      <a onClick={() => setAccountMenuOpen(!accountMenuOpen)}><AText className="text-lg">Close</AText></a>
                    </ACol> */}
                  </ARow>
                }
                title=""
                trigger="click"
                open={accountMenuOpen}
                onOpenChange={() => setAccountMenuOpen(!accountMenuOpen)}
                placement="bottom"
              >
                {authState.accessToken && <AButton className="bg-transparent border-none icon" icon={<UserOutlined className={clsx('text-3xl ', textColor)} />} />}
              </MPopover>
              {!authState.accessToken && <AButton onClick={connect}>Connect</AButton>}
            </ACol>
          </ARow>
          <MDrawer title="Fraction Form" className={theme} headerStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} bodyStyle={{ background: theme === 'dark' ? twFullConfig.theme!.colors!['dark'].toString() : 'white' }} placement="right" onClose={() => setFractionFormOpen(!fractionFormOpen)} open={fractionFormOpen}>
            <ALayout className="flex flex-col bg-transparent">
              <AText className={'text-lg ' + clsx(textColor)}>Input supply of fraction tokens</AText>
              <Form name="fraction_search_form" form={fractionForm} onFinish={submitFraction}>
                <Form.Item name="supply" rules={[{ required: true, message: 'Please input supply of fraction tokens' }]}>
                  <Input className={`mt-1 bg-${theme} ${textColor}`} placeholder="Supply of fraction tokens" />
                </Form.Item>
                <AText className={'text-lg font-bold ' + clsx(textColor)}>Initial price</AText>
                <Form.Item name="price" rules={[{ required: true, message: 'Please input token price' }]}>
                  <Input className={`mt-1 bg-${theme} ${textColor}`} placeholder="Input price" />
                </Form.Item>
                <AButton className={`mt-4 mb-4 bg-${theme} ${textColor}`} htmlType="submit" loading={fractionState.fractionSubmitState == AppState.Loading}>Submit</AButton>
              </Form>
            </ALayout>
          </MDrawer>
        </div>
      </div>
    </div>
    {toolbar}
  </nav>
}

interface FractionFormData {
  supply: number,
  price: number
}