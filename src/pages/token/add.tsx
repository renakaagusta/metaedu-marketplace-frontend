import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, message, Radio, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UploadChangeParam } from 'antd/lib/upload';
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
import { TokenState } from 'store/token/interfaces';
import TokenActionTypes from 'store/token/interfaces/actions.interfaces';
import { TokenCategoryState } from 'store/token_category/interfaces';
import TokenCategoryActionTypes from 'store/token_category/interfaces/actions.interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import { UserState } from 'store/user/interfaces';
import { Web3State } from "store/web3/interfaces";

import AButton from '@/components/atoms/a_button/a_button';
import ALayout from '@/components/atoms/a_layout/a_layout';
import AText from '@/components/atoms/a_text/a_text';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

import { SubmitTokenPayload } from '@/repositories/token.repository';
import { AppState } from '@/utils/state';

function TokenAddPage(props: TokenAddPageProps) {
  const { authState, themeState, web3State, tokenState, tokenCategoryState, collectionState, transactionState, fractionState, ownershipState, rentalState, userState } = props
  const { tokenCategoryList } = tokenCategoryState
  const { collections } = collectionState
  const { theme } = themeState

  const dispatch = useDispatch()
  const router = useRouter()

  const [form] = Form.useForm()

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    onChange(info: UploadChangeParam<UploadFile>) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useEffect(() => {
    if (!userState.myUserData) {
      return
    }

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

    dispatch({
      type: CollectionActionTypes.GET_COLLECTION_LIST,
      payload: {
        offset: 0,
        limit: 5,
        keyword: '',
        creatorId: userState.myUserData.id,
        orderBy: 'created_at',
        orderOption: 'DESC'
      }
    })
  }, [userState.myUserData])

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onSubmit = async (values: TokenFormData) => {
    if (!web3State.contract || !authState.accessToken || !values.dragger[0].originFileObj) {
      return
    }

    if (tokenState.tokenSubmitState == AppState.Loading) {
      return
    }

    let payload: SubmitTokenPayload = {
      accessToken: authState.accessToken,
      title: values.title,
      description: values.description,
      categoryId: values.category,
      collectionId: undefined,
      image: values.dragger[0].originFileObj,
      imageName: values.dragger[0].originFileObj.name,
      supply: Number(values.supply),
      price: Number(values.price) * 1000000,
      attributes: values.attributes,
      contract: web3State.contract
    }

    if (values.collection) {
      payload = {
        ...payload,
        collectionId: values.collection
      }
    }

    dispatch({
      type: TokenActionTypes.SUBMIT_TOKEN,
      payload: payload
    })
  };

  useEffect(() => {
    if (tokenState.tokenSubmitState == AppState.LoadComplete && tokenState.tokenSubmittedId) {
      router.push(`/token/${tokenState.tokenSubmittedId}`)
    }
  }, [tokenState])

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
              'layout min-h-screen py-[12vh]',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <Form
              name="token_form"
              form={form}
              onFinish={onSubmit}
              className="flex flex-col"
            >
              <AText className={'mt-5 text-lg font-bold ' + clsx(textColor)}>Create new item</AText>
              <AText className={'text-lg ' + clsx(textColor)}>Image, Video, or 3D Model</AText>
              <AText className={'text-sm ' + clsx(textColor)}>For types supported: JPG, PNG, GIF, SVG, MP4, GLB</AText>
              <Form.Item className={theme} name="dragger" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please input token image' }]}>
                <Dragger className={`mt-3 ${textColor}`} style={{ backgroundColor: theme == 'dark' ? 'transparent' : 'white' }} {...uploadProps}>
                  <ALayout className="flex flex-col bg-transparent">
                    <AText className={'ant-upload-drag-icon text-6xl ' + clsx(textColor)}>
                      <UploadOutlined />
                    </AText>
                    <AText className={'ant-upload-text ' + clsx(textColor)}>Click or drag file to this area to upload</AText>
                  </ALayout>
                </Dragger>
              </Form.Item>
              <AText className={'text-lg font-bold ' + clsx(textColor)}>Name</AText>
              <Form.Item name="title" rules={[{ required: true, message: 'Please input token name' }]}>
                <Input className={`mt-1 bg-${theme} ${textColor}`} placeholder="Input name" />
              </Form.Item>
              <AText className={'text-lg font-bold mt-3 ' + clsx(textColor)}>Description</AText>
              <Form.Item name="description" >
                <TextArea className={`mt-1 bg-${theme} ${textColor}`} rows={4} placeholder="Input description" maxLength={300} />
              </Form.Item>
              <AText className={'text-lg font-bold ' + clsx(textColor)}>Initial price</AText>
              <Form.Item name="price" rules={[{ required: true, message: 'Please input token price' }]}>
                <Input className={`mt-1 bg-${theme} ${textColor}`} placeholder="Input price" />
              </Form.Item>
              <AText className={'text-lg font-bold ' + clsx(textColor)}>Category</AText>
              <Form.Item name="category" rules={[{ required: true, message: 'Please input token name' }]}>
                <Radio.Group>
                  {
                    tokenCategoryList?.map((tokenCategory) => <Radio.Button className={`bg-${theme} ${textColor}`} key={`token-category-${tokenCategory.id}`} value={tokenCategory.id}>{tokenCategory.title}</Radio.Button>)
                  }
                </Radio.Group>
              </Form.Item>
              {
                (collections?.length ?? 0) > 0 && <>
                  <AText className={'text-lg font-bold ' + clsx(textColor)}>Collection</AText>
                  <Form.Item name="collection" rules={[{ required: false }]}>
                    <Radio.Group>
                      {
                        collections?.map((collection) => <Radio.Button className={`bg-${theme} ${textColor}`} key={`token-category-${collection.id}`} value={collection.id}>{collection.title.string}</Radio.Button>)
                      }
                    </Radio.Group>
                  </Form.Item></>
              }
              <AText className={'text-lg font-bold mt-3 ' + clsx(textColor)}>Supply</AText>
              <Form.Item name="supply" rules={[{ required: true, message: 'Please input token supply' }]}>
                <Input className={`mt-1 bg-${theme} ${textColor}`} placeholder="Input supply" />
              </Form.Item>
              <AText className={'text-lg font-bold mt-3 ' + clsx(textColor)}>Attributes</AText>
              <Form.Item name="attributes" rules={[
                {
                  validator(_, value) {
                    try {
                      const attributes: Array<Record<string, string>> = JSON.parse(value)

                      attributes.forEach((attribute) => {
                        if (attribute.traitType || typeof attribute.traitType !== 'string') {
                          return Promise.reject('Invalid attributes format');
                        }

                        if (attribute.value || typeof attribute.traitType !== 'string') {
                          return Promise.reject('Invalid attributes format');
                        }
                      })

                      return Promise.resolve();
                    } catch (e) {
                      return Promise.reject('Invalid attributes format');
                    }
                  },
                },
              ]}>
                <TextArea className={`mt-1 bg-${theme} ${textColor}`} rows={4} placeholder="Input attributes" />
              </Form.Item>
              <AButton className={`mt-4 mb-4 ${textColor}`} htmlType="submit" loading={tokenState.tokenSubmitState == AppState.Loading}>Submit</AButton>
            </Form>
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
    tokenCategoryState: state.tokenCategoryReducer,
    collectionState: state.collectionReducer,
    ownershipState: state.ownershipReducer,
    rentalState: state.rentalReducer,
    transactionState: state.transactionReducer,
    fractionState: state.fractionReducer,
    userState: state.userReducer
  }))(TokenAddPage)

interface TokenAddPageProps {
  themeState: ThemesState
  web3State: Web3State
  authState: AuthState
  tokenState: TokenState
  tokenCategoryState: TokenCategoryState
  collectionState: CollectionState
  ownershipState: OwnershipState
  rentalState: RentalState
  transactionState: TransactionState
  fractionState: FractionState
  userState: UserState
}

interface TokenFormData {
  title: string,
  description: string,
  category: string,
  collection?: string,
  dragger: Array<UploadFile>,
  supply: number,
  price: number,
  attributes: string
}