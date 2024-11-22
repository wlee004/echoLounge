import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SocketContext, socket } from './socket'

function MyApp({ Component, pageProps }) {
    return (
        <SocketContext.Provider value={socket}>
            <Component {...pageProps} />
        </SocketContext.Provider>
    )
}

export default MyApp
