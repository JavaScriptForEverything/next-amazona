// import { forwardRef } from 'react'

// const MyInput = forwardRef( (props, ref) => {

// 	return <input {...props} ref={ref} />

// })
// export default MyInput




// import { forwardRef } from 'react'

// const StripeInput = forwardRef( ({ component: Component, props }, ref) => {

// 	return <Component {...props} ref={ref} />
// })
// export default StripeInput









import { forwardRef, useRef, useImperativeHandle } from 'react'


const StripeInput = forwardRef(({component: Component, inputRef, ...props }, ref) => {
	const elementRef = useRef()

	useImperativeHandle( ref, () => ({
		focus : () => elementRef.current.focus
	}))

  // return <Component {...other} />;
	return <Component {...props} onReady={(element) => elementRef.current = element } />
});

export default StripeInput
