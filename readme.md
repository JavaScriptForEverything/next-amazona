# Complete Project By Next.js (serverless API)

<img
	width = "100%"
	src="https://github.com/JavaScriptForEverything/next-amazona/blob/refactor/public/images/BannerForGithub.png?raw=true"
	alt="BannerForGit_Stripe-MaterialUI.png"
/>
<br />


###### Features Added
	. Form:
		. Generate form Dynamically
		. FormValidate Dynamical Form Dynamically 	(Advanced Form)
		. Show message of Error or success of form submit
		. Reset Password by Sending Email


	. Redux: (@reduxjs/toolkit)
		. Best way to setup redux store
		. create reducer by createSlice without duplicate code all around
		. Server-Side dispatch and Client-Side dispatch
		. Sharing state between page navigations.
		. Global Alert message handled by redux store


	. Authorization & Redirection
		. Used JsonWebToken to authenticate via cookie (securely)
		. Authenticate user both in Server-Side and Client-Side
		. Protecte /user/profile when not loged in
		. Protecte /login /signup... when loged in.
		. Redirect user again on both in Server-Side and Client-Side


	. Error Handling:
		. Global Error handling
		. Route Error handling


	. Image:
		. Generate dataRUL so show preview of image upload
		. Save image in public directory
		. Resize image before save
		. Remove image if request failed after image upload


	. Payment Gateway
		. Stripe: (paymentIntents) 	:


	. Custom Components:
		. Carousel 		: (By NextJS <Image /> Component)
		. Global Alert


	. Serverless API
	. Mongoose (MongoDB)
	. Material UI (User Friendly UI) + Dark Mode
	. Pagination + Filter + Search + Rating...
	. Infinite Scrolling instead of Pagination
	. send Mail (development: mailtrap, in Production: sendGrid)
	. Utility functions:

	. Do next:
		. CRUD Product (By Form or By 3-dot menu)



###### Routes (Pages)
	. Home 		: /
	. About 	: /about
	. signup 	: /signup
	. Login 	: /login 
	. Logout 	: OnClick={logoutHandler}
	. Cart  	: /cart
	. Payment : /shipping
	. Product Details : /product/:slug

	. user:
		. Profile 	: /user/profile
		. Dashboard	: /user/dashboard
		. resetPassword : /user/reset-password (forgot-password + reset-password)
		. updatePassword: /user/update-my-password

