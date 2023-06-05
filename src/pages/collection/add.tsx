import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Radio, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dragger from 'antd/lib/upload/Dragger';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { AuthState } from 'store/auth/interfaces';
import { CollectionState } from 'store/collection/interfaces';
import CollectionActionTypes from 'store/collection/interfaces/actions.interfaces';
import { FractionState } from 'store/fraction/interfaces';
import { OwnershipState } from 'store/ownership/interfaces';
import { RootReducerInterface } from 'store/reducer';
import { RentalState } from 'store/rental/interfaces';
import { ThemesState } from 'store/themes/interfaces';
import { TokenCategoryState } from 'store/token_category/interfaces';
import TokenCategoryActionTypes from 'store/token_category/interfaces/actions.interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import { UserState } from 'store/user/interfaces';
import { Web3State } from "store/web3/interfaces";

import AButton from '@/components/atoms/a_button/a_button';
import ALayout from '@/components/atoms/a_layout/a_layout';
import AText from '@/components/atoms/a_text/a_text';
import Layout from '@/components/moleculs/layout/Layout';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

import { SubmitCollectionPayload } from '@/repositories/collection.repository';
import { AppState } from '@/utils/state';

function CollectionAddPage(props: CollectionAddPageProps) {
  const { authState, themeState, web3State, collectionState, tokenCategoryState, transactionState, fractionState, ownershipState, rentalState, userState } = props
  const { tokenCategoryList } = tokenCategoryState
  const { theme } = themeState

  const dispatch = useDispatch()
  const router = useRouter()

  const [form] = Form.useForm()

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onSubmit = (values: SubmitFormCollectionData) => {
    if (!web3State.contract || !authState.accessToken || !values.cover[0].originFileObj || !values.thumbnail[0].originFileObj) {
      return
    }

    if (collectionState.collectionSubmitState == AppState.Loading) {
      return
    }

    const payload: SubmitCollectionPayload = {
      accessToken: authState.accessToken,
      title: values.title,
      description: values.description,
      categoryId: values.category,
      thumbnail: values.thumbnail[0].originFileObj,
      cover: values.cover[0].originFileObj
    }

    dispatch({
      type: CollectionActionTypes.SUBMIT_COLLECTION,
      payload: payload
    })
  };

  useEffect(() => {
    dispatch({
      type: TokenCategoryActionTypes.GET_TOKEN_CATEGORY_LIST,
      payload: {
        offset: 0,
        limit: 5,
        keyword: '',
        orderBy: 'created_at',
        orderOption: 'DESC'
      }
    })
  }, [])

  useEffect(() => {
    if (collectionState.collectionSubmitState == AppState.LoadComplete && collectionState.collectionSubmittedId) {
      router.push(`/collection/${collectionState.collectionSubmittedId}`)
    }
  }, [collectionState])

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
              'layout min-h-screen py-[16vh]',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <Form
              name="validate_collection_add"
              form={form}
              onFinish={onSubmit}
              className={`${theme} flex flex-col`}
            >
              <AText className={'mt-5 text-lg font-bold ' + clsx(textColor)}>Create new collection</AText>
              <AText className={'text-lg ' + clsx(textColor)}>Thumbnail</AText>
              <AText className={'text-sm ' + clsx(textColor)}>For types supported: JPG, PNG, GIF, SVG</AText>
              <Form.Item name="thumbnail" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please input collection image' }]}>
                <Dragger className={`${theme} mt-3`} style={{ backgroundColor: theme == 'dark' ? 'transparent' : 'white' }} {...uploadProps}>
                  <ALayout className="flex flex-col bg-transparent">
                    <AText className={'ant-upload-drag-icon text-6xl ' + clsx(textColor)}>
                      <UploadOutlined />
                    </AText>
                    <AText className={'ant-upload-text ' + clsx(textColor)}>Click or drag file to this area to upload</AText>
                  </ALayout>
                </Dragger>
              </Form.Item>
              <AText className={'text-lg ' + clsx(textColor)}>Cover</AText>
              <AText className={'text-sm ' + clsx(textColor)}>For types supported: JPG, PNG, GIF, SVG, MP4</AText>
              <Form.Item name="cover" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please input collection image' }]}>
                <Dragger className='mt-3' style={{ backgroundColor: theme == 'dark' ? 'transparent' : 'white' }} {...uploadProps}>
                  <ALayout className="flex flex-col bg-transparent">
                    <AText className={'ant-upload-drag-icon text-6xl ' + clsx(textColor)}>
                      <UploadOutlined />
                    </AText>
                    <AText className={'ant-upload-text ' + clsx(textColor)}>Click or drag file to this area to upload</AText>
                  </ALayout>
                </Dragger>
              </Form.Item>
              <AText className={'text-lg font-bold ' + clsx(textColor)}>Name</AText>
              <Form.Item name="title" rules={[{ required: true, message: 'Please input collection name' }]}>
                <Input className={`mt-1 bg-${theme}`} placeholder="Input name" />
              </Form.Item>
              <AText className={'text-lg font-bold mt-3 ' + clsx(textColor)}>Description</AText>
              <Form.Item name="description" >
                <TextArea className={`mt-1 bg-${theme}`} rows={4} placeholder="Input description" maxLength={300} />
              </Form.Item>
              <AText className={`text-lg font-bold ` + clsx(textColor)}>Category</AText>
              <Form.Item name="category" rules={[{ required: true, message: 'Please input collection name' }]}>
                <Radio.Group className={theme}>
                  {
                    tokenCategoryList?.map((tokenCategory) => <Radio.Button key={`collection-category-${tokenCategory.id}`} value={tokenCategory.id}>{tokenCategory.title}</Radio.Button>)
                  }
                </Radio.Group>
              </Form.Item>
              <AButton className='mt-4 mb-4' htmlType="submit" loading={collectionState.collectionSubmitState == AppState.Loading}>Submit</AButton>
            </Form>
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
    tokenCategoryState: state.tokenCategoryReducer,
    ownershipState: state.ownershipReducer,
    rentalState: state.rentalReducer,
    transactionState: state.transactionReducer,
    fractionState: state.fractionReducer,
    userState: state.userReducer
  }))(CollectionAddPage)

interface CollectionAddPageProps {
  themeState: ThemesState
  web3State: Web3State
  authState: AuthState
  collectionState: CollectionState
  tokenCategoryState: TokenCategoryState
  ownershipState: OwnershipState
  rentalState: RentalState
  transactionState: TransactionState
  fractionState: FractionState
  userState: UserState
}

interface SubmitFormCollectionData {
  title: string,
  description: string,
  category: string,
  thumbnail: Array<UploadFile>,
  cover: Array<UploadFile>,
  supply: number,
  price: number
}