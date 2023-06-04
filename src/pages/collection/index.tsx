import { Card, Checkbox, Col, Collapse, Image, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import clsx from 'clsx';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { AuthState } from 'store/auth/interfaces';
import { CollectionState } from 'store/collection/interfaces';
import { FractionState } from 'store/fraction/interfaces';
import { OwnershipState } from 'store/ownership/interfaces';
import { RootReducerInterface } from 'store/reducer';
import { RentalState } from 'store/rental/interfaces';
import { ThemesState } from 'store/themes/interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import { UserState } from 'store/user/interfaces';
import { Web3State } from 'store/web3/interfaces';

import Layout from '@/components/moleculs/layout/Layout';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

export enum LayoutMode {
  Four = 'four',
  Six = 'six',
  Art = 'art'
}

const { Panel } = Collapse;

function CollectionListPage(props: CollectionListPageProps) {
  const { authState, themeState, web3State, ownershipState, rentalState, collectionState, transactionState, fractionState, userState } = props
  const { collections } = collectionState
  const { theme } = themeState

  const dispatch = useDispatch()

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const [layoutMode, setLayoutMode] = React.useState<LayoutMode>(LayoutMode.Four);

  const onChangeLayoutMode = (e: RadioChangeEvent) => {
    setLayoutMode(e.target.value);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Layout>
      <Seo
        templateTitle='MetaEdu Marketplace'
        description='Pre-built components with awesome default'
      />
      <ONavBar theme={theme} textColor={textColor} ownershipState={ownershipState} rentalState={rentalState} transactionState={transactionState} fractionState={fractionState} web3State={web3State} themeState={themeState} authState={authState} userState={userState} dispatch={dispatch} />
      <div className="justify-end mx-auto lg:w-11/12 md:items-center md:flex pb-5">
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
        <Radio.Group className="ml-5" value={layoutMode} onChange={onChangeLayoutMode}>
          <Radio.Button value={LayoutMode.Four}>4</Radio.Button>
          <Radio.Button value={LayoutMode.Six}>6</Radio.Button>
          <Radio.Button value={LayoutMode.Art}>Art</Radio.Button>
        </Radio.Group>
      </div>

      <main>
        <section
          className={clsx(theme === 'dark' ? 'bg-dark' : 'bg-white', textColor)}
        >
          <div
            className={clsx(
              'layout min-h-screen pt-[20vh]',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <Row>
              <Col span={6}>
                <Collapse defaultActiveKey={['1']} className='text-lg'>
                  <Panel header="Status" key="1">
                    <Row><Checkbox className="text-lg" onChange={onChange}>New</Checkbox></Row>
                    <Row><Checkbox className="text-lg mt-2" onChange={onChange}>Buy Now</Checkbox></Row>
                    <Row><Checkbox className="text-lg mt-2" onChange={onChange}>Rent Now</Checkbox></Row>
                  </Panel>
                  <Panel header="Price" key="2">
                    <p>Halo</p>
                  </Panel>
                  <Panel header="Category" key="3">
                    <p>Hola</p>
                  </Panel>
                </Collapse>
              </Col>
              <Col span={18} className="pl-4">
                <h3 className='text-md md:text-xl ml-3'>106,320,958 items</h3>
                <Row className="mt-4">
                  <Col span={6}>
                    <Card
                      hoverable
                      className="rounded-lg shadow-lg mx-3 p-0"
                      cover={<Image
                        alt='Mountains'
                        src="https://www.artnews.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-23-at-4.43.05-PM-e1629755437533.png?w=366"
                        width="100%"
                        className="rounded-lg scale-100 hover:scale-200 ease-in duration-500"
                        preview={false}
                      />}
                    >
                      <p className='text-sm '>Renakaagusta</p>
                      <h3 className='text-md md:text-xl'>Humor bored Ape</h3>
                      <p className={clsx('text-xl font-semibold mt-1', textColor)}>
                        0.08 ETH
                      </p>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      hoverable
                      className="rounded-lg shadow-lg mx-3 p-0"
                      cover={<Image
                        alt='Mountains'
                        src="https://www.artnews.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-23-at-4.43.05-PM-e1629755437533.png?w=366"
                        width="100%"
                        className="rounded-lg scale-100 hover:scale-200 ease-in duration-500"
                        preview={false}
                      />}
                    >
                      <p className='text-sm '>Renakaagusta</p>
                      <h3 className='text-md md:text-xl'>Humor bored Ape</h3>
                      <p className={clsx('text-xl font-semibold mt-1', textColor)}>
                        0.08 ETH
                      </p>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      hoverable
                      className="rounded-lg shadow-lg mx-3 p-0"
                      cover={<Image
                        alt='Mountains'
                        src="https://www.artnews.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-23-at-4.43.05-PM-e1629755437533.png?w=366"
                        width="100%"
                        className="rounded-lg scale-100 hover:scale-200 ease-in duration-500"
                        preview={false}
                      />}
                    >
                      <p className='text-sm '>Renakaagusta</p>
                      <h3 className='text-md md:text-xl'>Humor bored Ape</h3>
                      <p className={clsx('text-xl font-semibold mt-1', textColor)}>
                        0.08 ETH
                      </p>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      hoverable
                      className="rounded-lg shadow-lg mx-3 p-0"
                      cover={<Image
                        alt='Mountains'
                        src="https://www.artnews.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-23-at-4.43.05-PM-e1629755437533.png?w=366"
                        width="100%"
                        className="rounded-lg scale-100 hover:scale-200 ease-in duration-500"
                        preview={false}
                      />}
                    >
                      <p className='text-sm '>Renakaagusta</p>
                      <h3 className='text-md md:text-xl'>Humor bored Ape</h3>
                      <p className={clsx('text-xl font-semibold mt-1', textColor)}>
                        0.08 ETH
                      </p>
                    </Card>
                  </Col>
                </Row>
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
    collectionState: state.collectionReducer,
    ownershipState: state.ownershipReducer,
    rentalState: state.rentalReducer,
    transactionState: state.transactionReducer,
    fractionState: state.fractionReducer,
    userState: state.userReducer
  }))(CollectionListPage)

interface CollectionListPageProps {
  themeState: ThemesState
  web3State: Web3State
  authState: AuthState
  ownershipState: OwnershipState
  rentalState: RentalState
  collectionState: CollectionState
  transactionState: TransactionState
  fractionState: FractionState
  userState: UserState
}


