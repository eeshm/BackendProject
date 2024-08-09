Backend with javascript 


<!-- 
1.Setup database connection using mongoose.connect in db\index.js using async await and in try catch block and export it.
2.then in utils/index.js import dotenv(for importing all env variable at the start of file) and connection from db/index.js and use this with then and catch as it is async await function to run the connection.
3.Then in utils/app.js we imported express, cors, cookieparser ,then defined cors configuration and its origin .Then we defined configuration of json files ,values from urls , and to save images and favicon temporarily if needed in public folder using static. We did all this using app.use(.use is used to setup middlewares and configuration)  
4.then in same file we setup cookie-parser for securely accessing and storing cookies in browsers on which only server can perform crud operations on.


 -->


 <!-- 
 1.Used higher order function in utils/asynchandler.js
 2.Utilit/asynchandler.js -->This asyncHandler function is useful for simplifying the error handling in asynchronous route handlers. Normally, without such a wrapper, you'd have to use try-catch blocks in every route handler to catch errors. This utility function automatically catches any errors and passes them to the next middleware
  -->


<!-- npm packages used:
1.mongoose 
2.express
3.mongoose-aggregate-paginate-v2
4.bcrypt -- for password encryption
5.jsonwebtoken
 -->