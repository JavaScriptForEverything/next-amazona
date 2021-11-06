import { wrapper } from '../store'

const App = ({ Component, pageProps }) => <Component {...pageProps} />
export default wrapper.withRedux(App)









