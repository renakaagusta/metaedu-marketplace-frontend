import Spin, { SpinProps } from "antd/lib/spin";

export default function ASpin(props: SpinProps & React.RefAttributes<HTMLDivElement>) {
  return <Spin {...props} />;
}