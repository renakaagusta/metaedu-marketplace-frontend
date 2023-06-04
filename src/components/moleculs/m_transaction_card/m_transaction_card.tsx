import { UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import AAvatar from '@/components/atoms/a_avatar/a_avatar';
import AButton from "@/components/atoms/a_button/a_button";
import ACol from "@/components/atoms/a_col/a_col";
import ALayout from "@/components/atoms/a_layout/a_layout";
import ARow from "@/components/atoms/a_row/a_row";
import AText from "@/components/atoms/a_text/a_text";
import MTokenImage from '@/components/moleculs/m_token_image/m_token_image';

import Transaction from "@/models/transaction.model";
import User from '@/models/user.model';

export enum UpdateType { Sale, Rent }

export interface MTransactionCardProps {
  transaction: Transaction
  user: User
  theme: string
}

export default function MTransactionCard(props: MTransactionCardProps) {

  const { transaction, user, theme } = props

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';


  return <ALayout className={`px-4 flex-column border-3 border-black shadow p-3 mb-3 ${theme === 'dark' ? 'bg-zinc-900 border-transparent' : 'bg-white border-grey-50'}`}>
    <MTokenImage token={transaction.token} />
    <ARow className="mt-1">
      <ACol span={24}><AText className={"text-xl font-bold " + clsx(textColor)}>{transaction.token.title}</AText></ACol>
      <ACol span={24}><AText className={"text-lg font-bold " + clsx(textColor)}>{transaction.amount / 1000000} ETH</AText></ACol>
      <ACol span={24}><AText className={"text-sm  " + clsx(textColor)}>{transaction.quantity}x</AText></ACol>
    </ARow>
    {
      transaction.userFromId === user.id &&
      <ALayout className='flex flex-row bg-transparent'>
        {(transaction.userTo.photo == '' && transaction.userTo.name == '') && <AAvatar icon={<UserOutlined />} />}
        {(transaction.userTo.photo == '' && transaction.userTo.name != '') && <AAvatar>{transaction.userTo.name}</AAvatar>}
        {(transaction.userTo.photo != '') && <AAvatar src={transaction.userTo.photo} />}
        <AText className={`ml-1 ${textColor}`} ellipsis={{ tooltip: '...' }}>{transaction.userTo.name != '' ? transaction.userTo.name : transaction.userTo.address}</AText>
      </ALayout>
    }
    <AButton type='primary' className="mt-3">
      Show detail
    </AButton>
  </ALayout>
}