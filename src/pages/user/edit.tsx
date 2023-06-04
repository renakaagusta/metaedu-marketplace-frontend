import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, message, UploadFile, UploadProps } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { AuthState } from 'store/auth/interfaces';
import { FractionState } from 'store/fraction/interfaces';
import { OwnershipState } from 'store/ownership/interfaces';
import { RootReducerInterface } from 'store/reducer';
import { RentalState } from 'store/rental/interfaces';
import { ThemesState } from 'store/themes/interfaces';
import { TransactionState } from 'store/transaction/interfaces';
import { UserState } from 'store/user/interfaces';
import UserActionTypes from 'store/user/interfaces/actions.interfaces';
import { Web3State } from "store/web3/interfaces";

import AButton from '@/components/atoms/a_button/a_button';
import ALayout from '@/components/atoms/a_layout/a_layout';
import ASpin from '@/components/atoms/a_spin/a_spin';
import AText from '@/components/atoms/a_text/a_text';
import OFooter from '@/components/organigrams/o_footer/o_footer';
import ONavBar from '@/components/organigrams/o_navbar/o_navbar';
import Seo from '@/components/organigrams/o_seo/o_seo';

import { UpdateMyUserDataPayload } from '@/repositories/user.repository';
import { AppState } from '@/utils/state';

function ProfileEditPage(props: ProfileEditPageProps) {
  const { authState, themeState, web3State, userState, ownershipState, rentalState, transactionState, fractionState } = props
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }

  const onSubmit = (values: SubmitFormUserData) => {
    if (!web3State.contract || !authState.accessToken || !userState.myUserData) {
      return
    }

    if (userState.updateMyUserDataState == AppState.Loading) {
      return
    }

    const payload: UpdateMyUserDataPayload = {
      id: userState.myUserData.id,
      name: values.name,
      email: values.email,
      photo: values.photo ? values.photo[0].originFileObj : undefined,
      cover: values.cover ? values.cover[0].originFileObj : undefined,
      accessToken: authState.accessToken
    }

    dispatch({
      type: UserActionTypes.UPDATE_MY_USER_DATA,
      payload: payload
    })
  };

  useEffect(() => {
    if (!authState.accessToken) {
      return
    }

    dispatch({
      type: UserActionTypes.GET_MY_USER_DATA,
      payload: {
        accessToken: authState.accessToken
      }
    })
  }, [authState.accessToken])

  useEffect(() => {
    if (userState.updateMyUserDataState == AppState.LoadComplete) {
      router.push(`/user/${userState.myUserData?.id}`)
    }
  }, [userState])

  return (
    <ALayout className={theme}>
      <Seo
        templateTitle='MetaEdu Marketplace'
        description='Pre-built components with awesome default'
      />
      <ONavBar theme={theme} textColor={textColor} web3State={web3State} themeState={themeState} authState={authState} ownershipState={ownershipState} rentalState={rentalState} transactionState={transactionState} fractionState={fractionState} userState={userState} dispatch={dispatch} />
      <main>
        <section
          className={clsx(theme === 'dark' ? 'bg-dark' : 'bg-white', textColor)}
        >
          <ASpin spinning={userState.myUserDataState == AppState.Loading}>
            <ALayout
              className={clsx(
                'layout min-h-screen py-[12vh] bg-transparent',
                theme === 'dark' ? 'text-white' : 'text-black'
              )}
            >
              {
                (userState.myUserDataState == AppState.LoadComplete && userState.myUserData) && <Form
                  name="validate_user_add"
                  form={form}
                  initialValues={{
                    name: userState.myUserData?.name,
                    email: userState.myUserData?.email
                  }}
                  onFinish={onSubmit}
                  className="flex flex-col"
                >
                  <AText className={'mt-10 text-lg font-bold ' + clsx(textColor)}>Edit Profile</AText>
                  <AText className={'text-lg ' + clsx(textColor)}>Custom your profile</AText>
                  <AText className={'text-lg font-bold mt-5 ' + clsx(textColor)}>Profile Photo</AText>
                  <Form.Item name="photo" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Dragger className={`${theme} mt-3`} style={{ backgroundColor: theme == 'dark' ? 'transparent' : 'white' }} {...uploadProps}>
                      <ALayout className="flex flex-col bg-transparent">
                        <AText className={'ant-upload-drag-icon text-6xl ' + clsx(textColor)}>
                          <UploadOutlined />
                        </AText>
                        <AText className={'ant-upload-text ' + clsx(textColor)}>Click or drag file to this area to upload</AText>
                      </ALayout>
                    </Dragger>
                  </Form.Item>
                  <AText className={'text-lg font-bold mt-5 ' + clsx(textColor)}>Profile Cover</AText>
                  <Form.Item name="cover" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Dragger className={`${theme} mt-3`} style={{ backgroundColor: theme == 'dark' ? 'transparent' : 'white' }} {...uploadProps}>
                      <ALayout className="flex flex-col bg-transparent">
                        <AText className={'ant-upload-drag-icon text-6xl ' + clsx(textColor)}>
                          <UploadOutlined />
                        </AText>
                        <AText className={'ant-upload-text ' + clsx(textColor)}>Click or drag file to this area to upload</AText>
                      </ALayout>
                    </Dragger>
                  </Form.Item>
                  <AText className={'text-lg font-bold ' + clsx(textColor)}>Name</AText>
                  <Form.Item name="name">
                    <Input className={`mt-1 bg-${theme}`} placeholder="Input name" />
                  </Form.Item>
                  <AText className={'text-lg font-bold mt-3 ' + clsx(textColor)}>Email</AText>
                  <Form.Item name="email" rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid email',
                    }]}>
                    <Input className={`mt-1 bg-${theme}`} placeholder="Input email" />
                  </Form.Item>
                  <AButton className='mt-4 mb-4' htmlType="submit" loading={userState.updateMyUserDataState == AppState.Loading}>Submit</AButton>
                </Form>
              }
            </ALayout>
          </ASpin>
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
    ownershipState: state.ownershipReducer,
    transactionState: state.transactionReducer,
    fractionState: state.fractionReducer,
    userState: state.userReducer,
  }))(ProfileEditPage)

interface ProfileEditPageProps {
  themeState: ThemesState
  web3State: Web3State
  authState: AuthState
  userState: UserState
  ownershipState: OwnershipState
  rentalState: RentalState
  transactionState: TransactionState
  fractionState: FractionState
}

interface SubmitFormUserData {
  name: string,
  email: string,
  photo: Array<UploadFile>,
  cover: Array<UploadFile>,
}