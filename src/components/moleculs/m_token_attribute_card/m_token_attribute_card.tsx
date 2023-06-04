import clsx from 'clsx';

import ALayout from "@/components/atoms/a_layout/a_layout";
import AText from "@/components/atoms/a_text/a_text";

import { Attribute } from "@/models/token.model";

export interface MTokenAttributeCard {
  attribute: Attribute
  theme: string
}

export default function MTokenAttributeCard(props: MTokenAttributeCard) {
  const { attribute, theme } = props

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <ALayout className={'p-4 border-2 rounded-xl m-2 flex align-middle ' + clsx(theme === 'dark' ? 'bg-zinc-900 border-transparent' : 'bg-white border-grey-50', textColor)}>
      <AText className={`text-sm text-center ${textColor}`}>{attribute.traitType}</AText>
      <AText className={`text-base text-center font-bold ${textColor}`}>{attribute.value}</AText>
    </ALayout>
  )
}