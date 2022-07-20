import { HYDRATE } from 'next-redux-wrapper'
import { getProducts } from '../productReducer'

const productsMiddleware = store => next => action => {
  if(action.type === HYDRATE) {
  	if(action.payload.product.resolvedUrl === '/') store.dispatch(getProducts(action.payload.product))
  }

  next(action)
}

export default productsMiddleware
