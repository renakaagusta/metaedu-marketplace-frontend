import Link, { LinkProps } from "antd/lib/typography/Link";

export default function ALink(props: LinkProps & React.RefAttributes<HTMLDivElement>) {
  return <Link {...props} />;
}