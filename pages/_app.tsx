import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../src/theme';
import createEmotionCache from '../src/utils/createEmotionCache';
import '../src/styles/global.css';
import { SessionProvider } from 'next-auth/react';
import { Provider } from '../src/context';
import NextNProgress from 'nextjs-progressbar';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  pageProps: { session, ...pageProps },
  Component,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider>
            <NextNProgress />
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
