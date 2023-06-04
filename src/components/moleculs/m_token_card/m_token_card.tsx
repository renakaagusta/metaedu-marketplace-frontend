import { EyeOutlined, LineChartOutlined, SwapOutlined, UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import AAvatar from "@/components/atoms/a_avatar/a_avatar"
import ACard from "@/components/atoms/a_card/a_card"
import ACol from "@/components/atoms/a_col/a_col"
import ALayout from "@/components/atoms/a_layout/a_layout"
import ALink from "@/components/atoms/a_link/a_link"
import ARow from "@/components/atoms/a_row/a_row"
import AText from "@/components/atoms/a_text/a_text"
import MTokenImage from '@/components/moleculs/m_token_image/m_token_image';

import Token from "@/models/token.model"

export interface MTokenCard {
  token: Token
  theme: string
}

export default function MTokenCard(props: MTokenCard) {
  const { token, theme } = props

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <ALink href={`/token/${token.id}`}>
      <ACard
        hoverable
        className={'border-2 rounded-xl m-2 ' + clsx(theme === 'dark' ? 'bg-zinc-900 border-transparent' : 'bg-white border-grey-50', textColor)}
        cover={<ALayout className="border-t-xl max-w-full"><MTokenImage token={token} height={180} rounded="rounded-t-xl" /></ALayout>}
        bodyStyle={{ padding: 18, paddingTop: 10 }}
      >
        <ALayout className={'m-0 p-0 ' + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-white')}>
          <AText className={'font-semibold ' + clsx(textColor)}>{token.title}</AText>
          <AText className={`text-xs font-bold ${textColor}`}>{token?.sourceId !== '00000000-0000-0000-0000-000000000000' ? '(Fraction)' : ''}{token?.fractionId !== '00000000-0000-0000-0000-000000000000' ? '(Parent)' : ''}</AText>
          <AText className={'font-medium ' + clsx(textColor)}>{token.lastPrice / 1000000} ETH</AText>
          <ALink href={`/user/${token.creator.id}`}>
            <ARow className='mt-2 w-full' align='middle'>
              <ACol span={3}>
                {(token.creator.photo == '' && token.creator.name == '') && <AAvatar icon={<UserOutlined />} />}
                {(token.creator.photo == '' && token.creator.name != '') && <AAvatar>{token.creator.name}</AAvatar>}
                {(token.creator.photo != '') && <AAvatar src={token.creator.photo} />}
              </ACol>
              <ACol span={20}>
                <AText className="text-blue-400 ml-3" ellipsis={{ tooltip: '...' }}>{token.creator.name != '' ? token.creator.name : token.creator.address}</AText>
              </ACol>
            </ARow>
          </ALink>
          <ARow className="mt-2" align="top">
            <ACol span={8}>
              <EyeOutlined />
              <AText className={'ml-1 text-xs ' + clsx(textColor)}>{token.views}</AText>
            </ACol>
            <ACol span={5} offset={1}>
              <SwapOutlined />
              <AText className={'ml-1 text-xs ' + clsx(textColor)}>{token.numberOfTransactions}</AText>
            </ACol>
            <ACol span={9} offset={1}>
              <LineChartOutlined />
              <AText className={'ml-1 text-xs ' + clsx(textColor)}>{(token.volumeTransactions / 1000000).toFixed(1)} ETH</AText>
            </ACol>
          </ARow>
        </ALayout>
      </ACard>
    </ALink>
  )
}