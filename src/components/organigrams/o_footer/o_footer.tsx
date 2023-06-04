
import clsx from "clsx";

import ALayout from "@/components/atoms/a_layout/a_layout";
import ALink from "@/components/atoms/a_link/a_link";
import AText from "@/components/atoms/a_text/a_text";

export interface OFooterProps {
  textColor: string,
  theme: string,
  toolbar?: React.ReactNode
}

export default function OFooter(props: OFooterProps) {
  const { theme, textColor } = props

  return <ALayout className={"text-left lg:text-left text-gray-600 " + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
    <ALayout className={"mx-6 py-10 text-center md:text-left " + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
      <ALayout className={'grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ' + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
        <ALayout className={"flex justify-start " + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
          <AText className={"uppercase font-semibold mb-4 flex items-center justify-center md:justify-start " + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
            MetaEdu Marketplace
          </AText>
          <AText className={clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
            Here you can use rows and columns to organize your footer content. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit.
          </AText>
        </ALayout>
        <ALayout className={clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
          <AText className={"uppercase font-semibold mb-4 flex items-center justify-center md:justify-start " + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
            Social Media
          </AText>
          <ALink href="#!" className="mb-4">
            <AText className={textColor}>Facebook</AText>
          </ALink>
          <ALink href="#!" className="mb-4">
            <AText className={textColor}>Twitter</AText>
          </ALink>
          <ALink href="#!" className="mb-4">
            <AText className={textColor}>Link</AText>
          </ALink>
        </ALayout>
        <ALayout className={clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
          <AText className={"uppercase font-semibold mb-4 flex items-center justify-center md:justify-start " + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
            Useful links
          </AText>
          <ALink href="#!" className="mb-4">
            <AText className={textColor}>Stats</AText>
          </ALink>
          <ALink href="#!" className="mb-4">
            <AText className={textColor}>Docs</AText>
          </ALink>
        </ALayout>
      </ALayout>
    </ALayout>
    <ALayout className={'text-center p-6 ' + clsx(theme === 'dark' ? 'bg-zinc-900' : 'bg-gray', textColor)}>
      <span>© 2023 Copyright:</span>
      <ALink href="#!" className="mb-4">
        <AText className={`font-bold ${textColor}`}>MetaEdu Marketplace</AText>
      </ALink>
    </ALayout>
  </ALayout >
}