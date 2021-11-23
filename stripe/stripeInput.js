import { useRef, useImperativeHandle } from 'react'

const StripeInput = ({ component: Component, inputRef, ...props }) => {
	const elementRef = useRef()

	useImperativeHandle( inputRef, () => ({
		focus : () => elementRef.current.focus
	}))

	// return <Component {...props} />
	return <Component {...props} onReady={(element) => elementRef.current = element } />
}
export default StripeInput




