import Switch, { SwitchProps } from "antd/lib/switch";

export default function ASwitch(props: SwitchProps & React.RefAttributes<HTMLElement>) {
  return <Switch {...props} />;
}