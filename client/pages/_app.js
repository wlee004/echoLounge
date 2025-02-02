import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { SocketProvider } from '../components/socketProvider'

function MyApp({ Component, pageProps }) {
    return (
        <SocketProvider>
            <Component {...pageProps} />
        </SocketProvider>
    )
}

export default MyApp
