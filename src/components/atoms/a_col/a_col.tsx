import Col, { ColProps } from "antd/lib/grid/col";

export default function ACol(props: ColProps & React.RefAttributes<HTMLDivElement>) {
  return <Col {...props} />;
}