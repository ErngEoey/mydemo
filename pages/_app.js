
import '../assets/bootstrap.css'
import '../assets/template/template.css'
import { wrapper } from '../redux/store'
import Head from "next/head"
import { QueryClient, QueryClientProvider } from 'react-query'
// import Layout from '../components/Layout';


function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return <>
    <QueryClientProvider client={queryClient}>
      <Head>
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" /> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'></link>
        <script src="https://apis.google.com/js/api:client.js" async defer></script>
        <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossOrigin="anonymous" async defer></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossOrigin="anonymous" async defer></script>
      </Head>
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </QueryClientProvider>
  </>
}

export default wrapper.withRedux(MyApp)
