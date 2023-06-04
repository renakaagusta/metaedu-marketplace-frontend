import { AppProps } from 'next/app';
import { wrapper } from 'store';

import 'antd/dist/antd.css';
import '@/styles/globals.css';
import '@/styles/colors.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
