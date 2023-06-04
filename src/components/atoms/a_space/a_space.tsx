import Space, { SpaceProps } from "antd/lib/space";

export default function ASpace(props: SpaceProps & React.RefAttributes<HTMLDivElement>) {
  return <Space {...props} />;
}