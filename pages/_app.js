import Router from 'next/router';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import OutLet from '../components/OutLet'
import nProgress from 'nprogress';



function MyApp({ Component, pageProps }) {
  nProgress.configure({showSpinner: false})

  Router.events.on('routeChangeStart', () => {
    nProgress.start()
  })

  Router.events.on('routeChangeComplete', () => {
    nProgress.done()
  })

  
  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </Head>
      <ChakraProvider>
        <OutLet>
          <Component {...pageProps} />
        </OutLet>
      </ChakraProvider>
    </>
  )
}

export default MyApp
