import { LayoutProps } from "antd/lib/layout";
import Layout from "antd/lib/layout/layout";

export default function ALayout(props: LayoutProps & React.RefAttributes<HTMLDivElement>) {
  return <Layout {...props} className={`bg-transparent ${props.className}`} />;
}