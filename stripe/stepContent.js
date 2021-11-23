import FormShipping from './formShipping'
import FormPayment from './formPayment'
import FormDetails from './formDetails'
import Success from './success'


const StepContent = ({ step, loading }) => {
	switch(step) {
		case 0: return <FormShipping />
		case 1: return <FormDetails />
		case 2: return <FormPayment />
		case 3: return  loading ? '' : <Success />

		default: return ''
	}
}
export default StepContent
