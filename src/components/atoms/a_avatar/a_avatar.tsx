import Avatar, { AvatarProps } from "antd/lib/avatar/avatar";

export default function AAvatar(props: AvatarProps & React.RefAttributes<HTMLDivElement>) {
  return <Avatar {...props} />;
}