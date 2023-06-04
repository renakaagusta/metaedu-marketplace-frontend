import Popover, { PopoverProps } from "antd/lib/popover";

export default function MPopover(props: PopoverProps & React.RefAttributes<HTMLElement>) {
  return <Popover {...props} />;
}