import { Image, ImageProps } from 'antd';

export default function AImage(props: ImageProps & React.RefAttributes<HTMLElement>) {
  return <Image {...props} />;
}