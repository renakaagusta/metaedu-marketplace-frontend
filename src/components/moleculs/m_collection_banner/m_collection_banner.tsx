import { UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import AAvatar from '@/components/atoms/a_avatar/a_avatar';
import AButton from '@/components/atoms/a_button/a_button';
import AImage from "@/components/atoms/a_image/a_image"
import ALayout from "@/components/atoms/a_layout/a_layout"
import ALink from '@/components/atoms/a_link/a_link';
import AText from "@/components/atoms/a_text/a_text"

import Collection from "@/models/collection.model"

export interface MCollectionBanner {
  collection: Collection
  theme: string
}

export default function MCollectionBanner(props: MCollectionBanner) {
  const { collection, theme } = props

  const router = useRouter()

  return (
    <ALayout key={`collection-${collection.id}`} className={clsx(
      'rounded-xl m-0 p-0 lg:h-[400px] sm:h-[200px] min-h-[200px] relative bg-transparent',
      theme === 'dark' ? 'text-white' : 'text-black'
    )}>
      <AImage
        alt='Mountains'
        src={collection.cover.string}
        width="100%"
        className="rounded-3xl m-0 lg:h-[380px] sm:h-[180px] min-h-[180px] z-0 absolute top-0 left-0 brightness-50"
        preview={false}
      />
      <ALayout className={clsx(
        'rounded-xl bg-transparent m-0 p-0 w-[85vw] absolute bottom-10 left-12 z-30',
        theme === 'dark' ? 'text-white' : 'text-black'
      )}>
        <AImage preview={false} className="rounded-lg border-1 border-width h-[100px] w-[100px]" src={collection.thumbnail.string} />
        <AText className="text-2xl font-bold text-white mt-1">{collection.title.string}</AText>
        <ALink href={`/user/${collection.creator.id}`}>
          <ALayout className="flex flex-row justify-start align-center">
            {(collection.creator.photo == '' && collection.creator.name == '') && <AAvatar icon={<UserOutlined />} />}
            {(collection.creator.photo == '' && collection.creator.name != '') && <AAvatar>{collection.creator.name}</AAvatar>}
            {(collection.creator.photo != '') && <AAvatar src={collection.creator.photo} />}
            <AText className="text-xl text-white font-bold mt-1 ml-2">{collection.creator.name != '' ? collection.creator.name : collection.creator.address}</AText>
          </ALayout>
        </ALink>
        <ALayout className="flex flex-row justify-between align-center bg-transparent">
          <AText className="text-lg mt-1 text-white">
            <span className="font-bold mx-1 mr-2">{collection.numberOfItems.int64}</span>items
          </AText>
          <AButton className='mt-4 mb-4 rounded-lg border-none p-2 text-lg font-bold h-12 bg-white bg-opacity-70 backdrop-blur' onClick={() => router.push(`/collection/${collection.id}`)}>View collection</AButton>
        </ALayout>
      </ALayout>
    </ALayout>
  )
}