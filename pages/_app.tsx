import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { ProviderProps } from '../types';
import { YamProvider, Web3Provider, Web3ModalProvider, NavigationContextProvider } from '../contexts';
import NavBar from '../components/layout/NavBar';
import Drawer from '../components/layout/Drawer';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// React.useEffect(() => {
//   // Remove the server-side injected CSS.
//   const jssStyles = document.querySelector('#jss-server-side');
//   if (jssStyles) {
//     jssStyles.parentElement.removeChild(jssStyles);
//   }
// }, []);

const Providers = (props: ProviderProps) => {
  return (
      <Web3ModalProvider>
        <ThemeProvider theme={theme}>
          <YamProvider>
            <Web3Provider>
                <NavigationContextProvider>
                  <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    {props.children}
                  </SnackbarProvider>
                </NavigationContextProvider>
            </Web3Provider>
          </YamProvider>
        </ThemeProvider>
      </Web3ModalProvider>
  )
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers {...pageProps}>
        <Box sx={{display: 'flex'}}>
          <NavBar />
          <Drawer />
          <Component sx={{ flexGrow: 1 }} {...pageProps}/>
        </Box>
      </Providers>
    </CacheProvider>
  );
}
