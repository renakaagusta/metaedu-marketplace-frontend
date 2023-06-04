import Tag, { TagProps } from "antd/lib/tag";

export default function ATag(props: TagProps & React.RefAttributes<HTMLDivElement>) {
  return <Tag {...props} />;
}