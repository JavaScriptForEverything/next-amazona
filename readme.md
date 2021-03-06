# Stripe Next MaterialUI Redux Mongoose JWT(Token) SendMail Cloudinary

<img
	width = "100%"
	src="https://github.com/JavaScriptForEverything/next-amazona/blob/master/public/BannerForGit_Stripe-MaterialUI.png?raw=true"
	alt="BannerForGit_Stripe-MaterialUI.png"
/>
<br />


###### Features Added
	. Serverless API
	. Material UI (User Friendly UI) + Dark Mode
	. Redux (dispatch on ServerSide + on Client-Side)
	. Mongoose (MongoDB)
	. Reset Password by Send Token by Mail (SendMail)
	. Route
		. Protected Route on ServerSide + Client-Side (I prefer ServerSide)
		. Restricted Route: if login then don't go to login(signup)|reset-password page
	. JsonWebToken
	. Stripe Payment Method
	. send Mail (development: mailtrap, in Production: sendGrid)
	. upload image in Cloudinary (PDF in cloudinary download blocked)
	. Pagination + Filter + Search + Rating...
	. Infinite Scrolling instead of Pagination

	. Do next:
		. CRUD Product (By Form or By 3-dot menu)


###### Routes (Pages)
	. Home 		: /
	. About 	: /about
	. Login 	: /login ( /login + /signup)
	. Logout 	:  Client-Side Logout
	. Cart  	: /cart
	. Payment : /shipping
	. Product Details : /product/:slug

	. user:
		. Profile 	: /user/profile
		. Dashboard	: /user/dashboard
		. resetPassword : /user/reset-password (forgot-password + reset-password)
		. updatePassword: /user/update-my-password
