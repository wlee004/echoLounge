import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SocketProvider } from './socketProvider'

function MyApp({ Component, pageProps }) {
    return (
        <SocketProvider>
            <Component {...pageProps} />
        </SocketProvider>
    )
}

export default MyApp
