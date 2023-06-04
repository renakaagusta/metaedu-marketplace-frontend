import Drawer, { DrawerProps } from "antd/lib/drawer";

export default function MDrawer(props: DrawerProps & React.RefAttributes<HTMLElement>) {
  return <Drawer {...props} />;
}