import '../styles/globals.css'
import type { AppProps } from 'next/app'
import PageProjectProvider from '../store/context/project-context'
import {backGroundStyles} from '../components/Styles'
import backgroundImg from '../public/background.png'  
import Image from 'next/image'

function MyApp({ Component, pageProps }: AppProps) {

  const classes = backGroundStyles();
  return(
  <div className={classes.root}>
    <PageProjectProvider>
      <Component {...pageProps} />
    </PageProjectProvider>
  </div>
  )
}
export default MyApp
