// import { useRef } from 'react'

// import MyInput from '../stripe/stripeInput'

// const About = () => {
// 	const inputRef = useRef('')

// 	const formHandler = (evt) => {
// 		evt.preventDefault()
// 		if(!inputRef.current.value) return inputRef.current.focus()
// 		console.log(inputRef.current.value)
// 	}

// 	return (
// 		<>
// 			<form onSubmit={formHandler}>
// 				<MyInput ref={inputRef} /> <br />

// 				<button type='submit'>Submit</button>
// 			</form>
// 		</>
// 	)
// }
// export default About






// import { forwardRef } from 'react'
// import TextField from '@mui/material/TextField'

// const Input = forwardRef((props, ref) => <input {...props} ref={ref} />)


// const About = () => {

// 	return (
// 		<TextField
// 			label='Username'
// 			fullWidth
// 			InputProps={{
// 				inputComponent: Input,
// 			}}
// 		/>
// 	)
// }
// export default About


// https://mui.com/components/text-fields/#integration-with-3rd-party-input-libraries




import { forwardRef } from 'react'
import TextField from '@mui/material/TextField'
import { CardNumberElement, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import MyInput from '../stripe/stripeInput'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)



const About = () => {

	return (
		<Elements stripe={stripePromise}>

			<TextField
				label='Username'
				fullWidth
				InputProps={{
					inputComponent: MyInput,
					inputProps: { component: CardNumberElement }
				}}
				InputLabelProps={{ shrink: true }}
			/>

		</Elements>
	)
}
export default About




