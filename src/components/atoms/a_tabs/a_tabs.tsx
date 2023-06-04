import Tabs, { TabsProps } from "antd/lib/tabs";

export default function ATabs(props: TabsProps & React.RefAttributes<HTMLElement>) {
  return <Tabs {...props} />;
}