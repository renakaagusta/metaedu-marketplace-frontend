import Text, { TextProps } from "antd/lib/typography/Text";

export default function AText(props: TextProps & React.RefAttributes<HTMLDivElement>) {
  return <Text {...props} />;
}