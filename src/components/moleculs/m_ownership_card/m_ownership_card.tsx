import { ClockCircleOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { CheckCheckIcon } from 'lucide-react';
import { DateTime } from 'ts-luxon';

import AButton from "@/components/atoms/a_button/a_button";
import ACol from "@/components/atoms/a_col/a_col";
import AInput from '@/components/atoms/a_input/a_input';
import ALayout from "@/components/atoms/a_layout/a_layout";
import ARow from "@/components/atoms/a_row/a_row";
import ASwitch from "@/components/atoms/a_switch/a_switch";
import AText from "@/components/atoms/a_text/a_text";
import MTokenImage from '@/components/moleculs/m_token_image/m_token_image';

import Ownership from "@/models/ownership.model";
import Rental from '@/models/rental.model';

export enum UpdateType { SaleOpenedStatus, SalePrice, RentOpenedStatus, RentCost }

export interface MOwnershipCardProps {
  ownership: Ownership
  rental?: Rental
  salePrice: number
  rentCost: number
  theme: string
  onUpdate: (ownership: Ownership, type: UpdateType) => void
  onChange: (type: UpdateType, value: number) => void
  onDetail: (id: string) => void
  onFraction: (ownership: Ownership) => void
}

export default function MOwnershipCard(props: MOwnershipCardProps) {

  const { ownership, rental, salePrice, rentCost, theme, onChange, onUpdate, onDetail, onFraction } = props

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const update = (type: UpdateType, value?: number) => {
    if (type === UpdateType.SaleOpenedStatus) {
      ownership.availableForSale = !ownership.availableForSale
    }

    if (type === UpdateType.RentOpenedStatus) {
      ownership.availableForRent = !ownership.availableForRent
    }

    if (type === UpdateType.SalePrice && value) {
      ownership.salePrice = value * 1000000
    }

    if (type === UpdateType.RentCost && value) {
      ownership.rentCost = value * 1000000
    }

    onUpdate(ownership, type)
  }

  return <ALayout className={`px-4 flex-column border-3 border-black shadow p-3 mb-3 ${theme === 'dark' ? 'bg-zinc-900 border-transparent' : 'bg-white border-grey-50'}`}>
    <MTokenImage token={ownership.token} />
    <ARow className="mt-1">
      <ACol span={24}><AText className={"text-xl font-bold " + clsx(textColor)}>{ownership.token.title}</AText></ACol>
      <ACol span={24}><AText className={"text-lg font-bold " + clsx(textColor)}>{ownership.salePrice / 1000000} ETH</AText></ACol>
      <ACol span={24}><AText className={"text-sm  " + clsx(textColor)}>{ownership.quantity}x</AText></ACol>
    </ARow>
    <ARow className="mt-2">
      <ACol span={5}>
        <ASwitch disabled={rental !== undefined} checked={ownership.availableForSale} onChange={() => update(UpdateType.SaleOpenedStatus)} />
      </ACol>
      <ACol>
        <AText className={"text-sm font-bold  " + clsx(textColor)}>Open for sale</AText>
      </ACol>
    </ARow>
    {
      ownership.token.supply === 1 && <ARow className="mt-2">
        <ACol span={5}>
          <ASwitch disabled={rental !== undefined} checked={ownership.availableForRent} onChange={() => update(UpdateType.RentOpenedStatus)} />
        </ACol>
        <ACol>
          <AText className={"text-sm font-bold  " + clsx(textColor)}>Open for rent</AText>
        </ACol>
      </ARow>
    }
    <AText className={`mt-2 ${textColor}`}>Sale Price</AText>
    <AInput placeholder='Sale price' defaultValue={salePrice / 1000000} onChange={(e) => onChange(UpdateType.SalePrice, Number(e.target.value))} disabled={!ownership.availableForSale || rental !== undefined} suffix={salePrice !== ownership.salePrice ? <AButton icon={<CheckCheckIcon className={clsx('text-3xl', textColor)} />} className="bg-transparent border-none icon" onClick={() => update(UpdateType.SalePrice, salePrice)} /> : undefined} />
    {ownership.token.supply === 1 && <>
      <AText className={`mt-2 ${textColor}`}>Rent Cost/day</AText>
      <AInput placeholder='Rent cost' defaultValue={rentCost / 1000000} onChange={(e) => onChange(UpdateType.RentCost, Number(e.target.value))} disabled={!ownership.availableForRent || rental !== undefined} suffix={rentCost !== ownership.rentCost ? <AButton icon={<CheckCheckIcon className={clsx('text-3xl', textColor)} />} className="bg-transparent border-none icon" onClick={() => update(UpdateType.RentCost, rentCost)} /> : undefined} />
    </>}
    {(!rental && ownership.token.supply === 1) && <AButton type='primary' className="mt-3" onClick={() => onFraction(ownership)}>
      Fraction
    </AButton>}
    {rental && <>
      <AText className={`mt-2 ${textColor}`}>Rental period</AText>
      <ARow className="mt-1">
        <ACol span={24}><ClockCircleOutlined className="text-lg text-red-500" /><AText className="text-lg text-red-500 font-bold ml-2">{DateTime.fromISO(rental.timestamp.time).toFormat('HH:mm, dd LLLL yyyy')}</AText></ACol>
      </ARow>
    </>}
    <AButton type='primary' className="mt-3" onClick={() => onDetail(ownership.tokenId)}>
      Show detail
    </AButton>
  </ALayout>
}