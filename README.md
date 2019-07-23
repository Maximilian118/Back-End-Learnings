A collection of files used to facilitate my learning of Backend languages and practices.

Need to learn / goals:

- [X] Node.js.
- [X] Express.
- [ ] GraphQL.
- [ ] Python.
- [ ] TypeScript.
- [X] MongoDB.
- [ ] MySQL.

Projects:

- [X] A comprehensive restful Express CRUD API with authentication and protected routs.
- [X] A Twitter bot API with a CLI user interface.

GraphQL Learning Points:

- [X] Authentication Middleware.
- [X] Schemas and Resolvers Syntax.
- [X] Initializing Graphql with Express.
- [X] Using Graphiql.

Node.JS / Express Learning Points:

- [X] Password encryption with Bcrypt.
- [X] Authentication with Jsonwebtoken.
- [X] FileFilters / Mimetypes.
- [X] Nodemon, Multer and Morgan packages.
- [X] Using MongoDB with Mongoose.
- [X] Environment Variables.
- [X] .Then().Catch() & Async Await Syntax.
- [X] Error filters.
- [X] Rout Protection.
- [X] CORS management.
- [X] App.use().
- [X] Res, Req, Next Syntax.
- [X] Export & Require.

General Learning Points:

- [X] BASH / Linux.
- [X] Middleware.
- [X] Communication with Databases.
- [X] Create a CRUD app.
- [X] Working with a VM / Ubuntu.
- [X] Asynchronous JS.

Dependencies:
-  "bcrypt": "^3.0.6", // To allow hashing of data. (native C++)
-  "bcryptjs": "^2.4.3", // Pure JS version of bcrypt. Slower but less hassle.
-  "express": "^4.17.1", // Node.js framework.
-  "express-graphql": "^0.9.0", // Use Graphql Schemas with Express.
-  "graphql": "^14.4.2", // Create Graphql Schemas.
-  "jsonwebtoken": "^8.5.1", // To generate and receive JWT (JSON Web Tokens).
-  "moment": "^2.24.0", // Manages dates and times in JS.
-  "mongodb": "^3.2.6", // Database drivers.
-  "mongoose": "^5.5.12", // To allow easy communication with MongoDB.
-  "mongoose-unique-validator": "^2.0.3", // Allows proper use of objectId.
-  "morgan": "^1.9.1", // Updates CLI with server request information.
-  "multer": "^1.4.1", // Parse formData bodies to facilitate the transference of files.
-  "parcel-bundler": "^1.12.3", // A bundler.
-  "twit": "^2.2.11", // Twitter API functions.
-  "uuid": "^3.3.2" // Create ID's.

DevDependencies:
-  "nodemon": "^1.19.0" // Monitors and restarts a local server when a change is made.