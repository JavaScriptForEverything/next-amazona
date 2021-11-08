// import { wrapper } from '../store'

// const App = ({ Component, pageProps }) => <Component {...pageProps} />
// export default wrapper.withRedux(App)


import store from '../store'
import { Provider } from 'react-redux'

const App = ({ Component, pageProps }) => (
	<Provider store={store}>
		<Component {...pageProps} />
	</Provider>
)
export default App









