import Radio, { RadioProps } from "antd/lib/radio";

export default function ARadio(props: RadioProps & React.RefAttributes<HTMLElement>) {
  return <Radio {...props} />;
}