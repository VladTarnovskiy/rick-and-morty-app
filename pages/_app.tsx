import './globals.css';
import { store } from '@/store/store';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function MyApp({ Component, ...pageProps }: AppProps) {
  // const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
