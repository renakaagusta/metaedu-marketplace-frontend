import Title, { TitleProps } from "antd/lib/typography/Title";

export default function ATitle(props: TitleProps & React.RefAttributes<HTMLDivElement>) {
  return <Title {...props} />;
}