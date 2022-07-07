// const demoMiddleware = store => next => action => {
//   console.log('Hello middleware')

//   next(action)
// }

const demoMiddleware = args => store => next => action => {
  // console.log(args)

  next(action)
}

export default demoMiddleware