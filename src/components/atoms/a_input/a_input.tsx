
import Input, { InputProps, InputRef } from "antd/lib/input/Input";

export default function AInput(props: InputProps & React.RefAttributes<InputRef>) {
  return <Input {...props} />;
}