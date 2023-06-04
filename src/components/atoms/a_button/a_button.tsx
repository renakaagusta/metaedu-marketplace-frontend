import Button, { ButtonProps } from "antd/lib/button/button";

export default function AButton(props: ButtonProps & React.RefAttributes<HTMLElement>) {
  return <Button {...props} />;
}