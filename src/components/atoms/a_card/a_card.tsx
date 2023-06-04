import Card, { CardProps } from "antd/lib/card/Card";

export default function ACard(props: CardProps & React.RefAttributes<HTMLDivElement>) {
  return <Card {...props} />;
}