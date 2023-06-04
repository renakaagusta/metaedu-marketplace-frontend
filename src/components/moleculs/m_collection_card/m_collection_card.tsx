import { EyeOutlined, LineChartOutlined, SwapOutlined, UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import AAvatar from "@/components/atoms/a_avatar/a_avatar"
import ACard from "@/components/atoms/a_card/a_card"
import ACol from "@/components/atoms/a_col/a_col"
import AImage from "@/components/atoms/a_image/a_image"
import ALayout from "@/components/atoms/a_layout/a_layout"
import ALink from "@/components/atoms/a_link/a_link"
import ARow from "@/components/atoms/a_row/a_row"
import AText from "@/components/atoms/a_text/a_text"

import Collection from "@/models/collection.model"

export interface MCollectionCard {
  collection: Collection
  theme: string
}

export default function MCollectionCard(props: MCollectionCard) {
  const { collection, theme } = props

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <ALink href={`/collection/${collection.id}`}>
      <ACard
        hoverable
        className={'border-2 rounded-xl m-2 ' + clsx(theme === 'dark' ? 'bg-zinc-900 border-transparent' : 'bg-white border-grey-50', textColor)}
        cover={<AImage alt={collection.title.string} src={collection.thumbnail.string} preview={false} height={200} style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />}
        bodyStyle={{ padding: 18, paddingTop: 10 }}
      >
        <ALayout className={'m-0 p-0 ' + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-white')}>
          <AText className={'font-bold ' + clsx(textColor)}>{collection.title.string}</AText>
          {/* <AText className={'font-medium ' + clsx(textColor)}>{collection.lastPrice / 1000000} ETH</AText> */}
          <ALink href={`/user/${collection.creator.id}`}>
            <ARow className='mt-2 w-full' align='middle'>
              <ACol span={3}>
                {(collection.creator.photo == '' && collection.creator.name == '') && <AAvatar icon={<UserOutlined />} />}
                {(collection.creator.photo == '' && collection.creator.name != '') && <AAvatar>{collection.creator.name}</AAvatar>}
                {(collection.creator.photo != '') && <AAvatar src={collection.creator.photo} />}
              </ACol>
              <ACol span={20}>
                <AText className="text-blue-400 ml-2" ellipsis={{ tooltip: '...' }}>{collection.creator.name != '' ? collection.creator.name : collection.creator.address}</AText>
              </ACol>
            </ARow>
          </ALink>
          <ARow className="mt-2" align="top">
            <ACol span={8}>
              <EyeOutlined />
              <AText className={'ml-2 ' + clsx(textColor)}>{collection.views.int64}</AText>
            </ACol>
            <ACol span={7} offset={1}>
              <SwapOutlined />
              <AText className={'ml-2 ' + clsx(textColor)}>{collection.numberOfTransactions.int64}</AText>
            </ACol>
            <ACol span={7} offset={1}>
              <LineChartOutlined />
              <AText className={'ml-2 ' + clsx(textColor)}>{collection.volumeTransactions.float64}</AText>
            </ACol>
          </ARow>
        </ALayout>
      </ACard>
    </ALink>
  )
}