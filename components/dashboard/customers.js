import { useSelector } from 'react-redux'

import ViewComponent from './customer/view'
import InsertComponent from './customer/insert'


const Customers = () => {
	const { view } = useSelector(state => state.dialog)

	return view ? <ViewComponent /> : <InsertComponent />

}
export default Customers


