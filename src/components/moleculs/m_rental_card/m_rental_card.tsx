import { ClockCircleOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { DateTime } from "ts-luxon";

import AButton from "@/components/atoms/a_button/a_button";
import ACol from "@/components/atoms/a_col/a_col";
import AImage from "@/components/atoms/a_image/a_image";
import ALayout from "@/components/atoms/a_layout/a_layout";
import ARow from "@/components/atoms/a_row/a_row";
import AText from "@/components/atoms/a_text/a_text";

import Rental from "@/models/rental.model";

export enum UpdateType { Sale, Rent }

export interface MRentalCardProps {
  rental: Rental
  theme: string
}

export default function MRentalCard(props: MRentalCardProps) {

  const { rental, theme } = props

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const stillInPeriod = DateTime.fromISO(rental.timestamp.time) > DateTime.now()

  return <ALayout className={`px-4 flex-column border-3 border-black shadow p-3 mb-3 ${theme === 'dark' ? 'bg-zinc-900 border-transparent' : 'bg-white border-grey-50'}`}>
    <AImage className="rounded-lg" src={rental.token.image} />
    <ARow className="mt-1">
      <ACol span={24}><AText className={"text-xl font-bold " + clsx(textColor)}>{rental.token.title}</AText></ACol>
      <ACol span={24}><ClockCircleOutlined className={`text-lg ${stillInPeriod ? 'text-green-500' : 'text-red-500'}`} /><AText className={"text-lg font-bold ml-2 " + clsx(stillInPeriod ? 'text-green-500' : 'text-red-500')}>{DateTime.fromISO(rental.timestamp.time).toFormat('HH:mm, dd LLLL yyyy')}</AText></ACol>
    </ARow>
    <AButton type='primary' className="mt-3">
      Show detail
    </AButton>
  </ALayout>
}