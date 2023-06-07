import clsx from 'clsx';

import ACard from '@/components/atoms/a_card/a_card';
import AImage from '@/components/atoms/a_image/a_image';
import ALayout from '@/components/atoms/a_layout/a_layout';
import ALink from '@/components/atoms/a_link/a_link';
import AText from '@/components/atoms/a_text/a_text';

import TokenCategory from '@/models/token_category.model';
export interface MTokenCategoryCard {
  tokenCategory: TokenCategory;
  theme: string;
}

export default function MTokenCategoryCard(props: MTokenCategoryCard) {
  const { tokenCategory, theme } = props;

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <ALink href={`/token?category_id=${tokenCategory.id}`}>
      <ACard
        hoverable
        className={
          'm-2 rounded-xl border-2 ' +
          clsx(
            theme === 'dark'
              ? 'border-transparent bg-zinc-900'
              : 'border-grey-50 bg-white',
            textColor
          )
        }
        cover={
          <AImage
            alt={tokenCategory.title}
            src={tokenCategory.icon}
            preview={false}
            height={200}
            style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
          />
        }
        bodyStyle={{ padding: 18, paddingTop: 10 }}
      >
        <ALayout
          className={
            'm-0 p-0 ' + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-white')
          }
        >
          <AText className={'font-bold ' + clsx(textColor)}>
            {tokenCategory.title}
          </AText>
        </ALayout>
      </ACard>
    </ALink>
  );
}
