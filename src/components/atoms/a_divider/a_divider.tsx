import Divider, { DividerProps } from "antd/lib/divider";

export default function ADivider(props: DividerProps & React.RefAttributes<HTMLElement>) {
  return <Divider {...props} />;
}