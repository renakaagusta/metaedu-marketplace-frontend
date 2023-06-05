import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import clsx from 'clsx';
import { connect, useDispatch } from 'react-redux';
import { AuthState } from 'store/auth/interfaces';
import { FractionState } from 'store/fraction/interfaces';
import { OwnershipState } from 'store/ownership/interfaces';
import { RootReducerInterface } from 'store/reducer';
import { RentalState } from 'store/rental/interfaces';
import { ThemesState } from 'store/themes/interfaces';
import { TokenState } from 'store/token/interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import { UserState } from 'store/user/interfaces';
import { Web3State } from "store/web3/interfaces";

import ADivider from '@/components/atoms/a_divider/a_divider';
import ALayout from '@/components/atoms/a_layout/a_layout';
import ALink from '@/components/atoms/a_link/a_link';
import AText from '@/components/atoms/a_text/a_text';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://18.236.86.21:8000/api/';

function DocsPage(props: StatsPageProps) {
  const { authState, themeState, web3State, transactionState, fractionState, userState, ownershipState, rentalState } = props
  const { theme } = themeState

  const dispatch = useDispatch()

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const parameterColumns: ColumnsType<Parameters> = [
    {
      title: () => {
        return <AText className={textColor}>Field</AText>
      },
      key: 'field',
      render: (parameters: Parameters) => <AText className={textColor}>{parameters.field}</AText>
    },
    {
      title: () => {
        return <AText className={textColor}>Type</AText>
      },
      key: 'type',
      render: (parameters: Parameters) => <AText className={textColor}>{parameters.type}</AText>
    },
    {
      title: () => {
        return <AText className={textColor}>Description</AText>
      },
      key: 'description',
      render: (parameters: Parameters) => <AText className={textColor}>{parameters.description}</AText>
    }
  ]

  const tokenListParameters: Array<Parameters> = [
    {
      field: 'offset',
      type: 'int',
      description: 'Specify the starting point of records'
    },
    {
      field: 'limit',
      type: 'int',
      description: 'Specify the number of records'
    },
    {
      field: 'keyword',
      type: 'string',
      description: 'Filter the records that contain or have similarity with some words'
    },
    {
      field: 'creator_id',
      type: 'string',
      description: 'Filter the records based on its creator'
    },
    {
      field: 'collection_id',
      type: 'string',
      description: 'Filter the records based on its collection'
    }
  ]

  const collectionListParameters: Array<Parameters> = [
    {
      field: 'offset',
      type: 'int',
      description: 'Specify the starting point of records'
    },
    {
      field: 'limit',
      type: 'int',
      description: 'Specify the number of records'
    },
    {
      field: 'keyword',
      type: 'string',
      description: 'Filter the records that contain or have similarity with some words'
    },
    {
      field: 'creator_id',
      type: 'string',
      description: 'Filter the records based on its creator'
    },
  ]

  const ownershipListParameters: Array<Parameters> = [
    {
      field: 'offset',
      type: 'int',
      description: 'Specify the starting point of records'
    },
    {
      field: 'limit',
      type: 'int',
      description: 'Specify the number of records'
    },
    {
      field: 'keyword',
      type: 'string',
      description: 'Filter the records that contain or have similarity with some words'
    },
    {
      field: 'user_id',
      type: 'string',
      description: 'Filter the records based on its user'
    },
  ]

  const rentalListParameters: Array<Parameters> = [
    {
      field: 'offset',
      type: 'int',
      description: 'Specify the starting point of records'
    },
    {
      field: 'limit',
      type: 'int',
      description: 'Specify the number of records'
    },
    {
      field: 'keyword',
      type: 'string',
      description: 'Filter the records that contain or have similarity with some words'
    },
    {
      field: 'user_id',
      type: 'string',
      description: 'Filter the records based on its user'
    },
  ]

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
              'layout min-h-screen py-[18vh] ',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <AText className={`text-3xl font-bold ${textColor}`}>API Overview</AText>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-lg ${textColor} text-justify`}>The MetaEdu API helps developers to build new applications using NFTs and our marketplace data. We provide a set of endpoints that enable you to fetch ERC1155 token metadata as well as other core elements of our marketplace. </AText><br /><br />
            <AText className={`text-lg ${textColor} text-justify mt-2`}>Additionally, we provide this API free of charge and ask that you provide attribution to MetaEdu on your site or in your app. When using our API, you should link to the MetaEdu marketplace from the NFTs that you display, where appropriate. Please see our Logos & Brand Guidelines for images that you can use for MetaEdu attribution.</AText>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-2xl font-bold ${textColor}`}>Retrieve token detail</AText>
            <ALayout className="flex flex-row mt-2">
              <ALayout className="p-2 flex justify-center align-center rounded-lg bg-green-600 max-w-[50px] max-h-[20px]">
                <AText className={`text-sm text-center ${textColor}`}>GET</AText>
              </ALayout>
              <ALink href={`${BASE_URL}/v1/token`}>
                <AText className={`text-sm ml-2 underline ${textColor}`}>{BASE_URL}/v1/token</AText>
              </ALink>
            </ALayout>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-lg ${textColor}`}>This endpoint is used to fetch the set of tokens that listed on our contract.</AText><br /><br />
            <AText className={`text-sm font-bold ${textColor}`}>Parameters</AText>
            <Table columns={parameterColumns} dataSource={tokenListParameters} pagination={false} />
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`mt-3 text-2xl font-bold ${textColor}`}>Retrieve token detail</AText>
            <ALayout className="flex flex-row mt-2">
              <ALayout className="p-2 flex justify-center align-center rounded-lg bg-green-600 max-w-[50px] max-h-[20px]">
                <AText className={`text-sm text-center ${textColor}`}>GET</AText>
              </ALayout>
              <ALink href={`${BASE_URL}/v1/token`}>
                <AText className={`text-sm ml-2 underline ${textColor}`}>{BASE_URL}/v1/token/{'{token_id}'}</AText>
              </ALink>
            </ALayout>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-lg ${textColor}`}>This endpoint is used to fetch the details data of specified token.</AText><br /><br />
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-2xl font-bold ${textColor}`}>Retrieve collections</AText>
            <ALayout className="flex flex-row mt-2">
              <ALayout className="p-2 flex justify-center align-center rounded-lg bg-green-600 max-w-[50px] max-h-[20px]">
                <AText className={`text-sm text-center ${textColor}`}>GET</AText>
              </ALayout>
              <ALink href={`${BASE_URL}/v1/token`}>
                <AText className={`text-sm ml-2 underline ${textColor}`}>{BASE_URL}/v1/collection</AText>
              </ALink>
            </ALayout>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-lg ${textColor}`}>This endpoint is used to fetch the set of collections that listed on our contract.</AText><br /><br />
            <AText className={`text-sm font-bold ${textColor}`}>Parameters</AText>
            <Table columns={parameterColumns} dataSource={collectionListParameters} pagination={false} />
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`mt-3 text-2xl font-bold ${textColor}`}>Retrieve collection detail</AText>
            <ALayout className="flex flex-row mt-2">
              <ALayout className="p-2 flex justify-center align-center rounded-lg bg-green-600 max-w-[50px] max-h-[20px]">
                <AText className={`text-sm text-center ${textColor}`}>GET</AText>
              </ALayout>
              <ALink href={`${BASE_URL}/v1/collection`}>
                <AText className={`text-sm ml-2 underline ${textColor}`}>{BASE_URL}/v1/collection/{'{collection_id}'}</AText>
              </ALink>
            </ALayout>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-2xl font-bold ${textColor}`}>Retrieve ownerships</AText>
            <ALayout className="flex flex-row mt-2">
              <ALayout className="p-2 flex justify-center align-center rounded-lg bg-green-600 max-w-[50px] max-h-[20px]">
                <AText className={`text-sm text-center ${textColor}`}>GET</AText>
              </ALayout>
              <ALink href={`${BASE_URL}/v1/token`}>
                <AText className={`text-sm ml-2 underline ${textColor}`}>{BASE_URL}/v1/collection</AText>
              </ALink>
            </ALayout>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-lg ${textColor}`}>This endpoint is used to fetch the set of ownerships that listed on our contract.</AText><br /><br />
            <AText className={`text-sm font-bold ${textColor}`}>Parameters</AText>
            <Table columns={parameterColumns} dataSource={ownershipListParameters} pagination={false} />
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-2xl font-bold ${textColor}`}>Retrieve ownership detail</AText>
            <ALayout className="flex flex-row mt-2">
              <ALayout className="p-2 flex justify-center align-center rounded-lg bg-green-600 max-w-[50px] max-h-[20px]">
                <AText className={`text-sm text-center ${textColor}`}>GET</AText>
              </ALayout>
              <ALink href={`${BASE_URL}/v1/ownership`}>
                <AText className={`text-sm ml-2 underline ${textColor}`}>{BASE_URL}/v1/ownership</AText>
              </ALink>
            </ALayout>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-lg ${textColor}`}>This endpoint is used to fetch the set of ownerships that listed on our contract.</AText><br /><br />
            <AText className={`text-sm font-bold ${textColor}`}>Parameters</AText>
            <Table columns={parameterColumns} dataSource={ownershipListParameters} pagination={false} />
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-2xl font-bold ${textColor}`}>Retrieve rentals</AText>
            <ALayout className="flex flex-row mt-2">
              <ALayout className="p-2 flex justify-center align-center rounded-lg bg-green-600 max-w-[50px] max-h-[20px]">
                <AText className={`text-sm text-center ${textColor}`}>GET</AText>
              </ALayout>
              <ALink href={`${BASE_URL}/v1/rental`}>
                <AText className={`text-sm ml-2 underline ${textColor}`}>{BASE_URL}/v1/rental</AText>
              </ALink>
            </ALayout>
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-lg ${textColor}`}>This endpoint is used to fetch the set of rentals that listed on our contract.</AText><br /><br />
            <AText className={`text-sm font-bold ${textColor}`}>Parameters</AText>
            <Table columns={parameterColumns} dataSource={rentalListParameters} pagination={false} />
            <ADivider className={`${theme === 'dark' ? 'bg-zinc-500' : 'bg-slate-400'} my-6`} />
            <AText className={`text-2xl font-bold ${textColor}`}>Retrieve rental detail</AText>
            <ALayout className="flex flex-row mt-2">
              <ALayout className="p-2 flex justify-center align-center rounded-lg bg-green-600 max-w-[50px] max-h-[20px]">
                <AText className={`text-sm text-center ${textColor}`}>GET</AText>
              </ALayout>
              <ALink href={`${BASE_URL}/v1/rental`}>
                <AText className={`text-sm ml-2 underline ${textColor}`}>{BASE_URL}/v1/rental</AText>
              </ALink>
            </ALayout>
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
  }))(DocsPage)

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

interface Parameters {
  field: string
  type: string
  description: string
}