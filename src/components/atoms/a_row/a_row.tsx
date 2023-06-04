import Row, { RowProps } from "antd/lib/grid/row";

export default function ARow(props: RowProps & React.RefAttributes<HTMLDivElement>) {
  return <Row {...props} />;
}