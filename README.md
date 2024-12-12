# LUMA AI 

This repo contains the files for the take home test.


## Backend

A Node server written in TypeScript using a SQLite database (data.db) containing all relevant data, including users posts and addresses.
The server exposes several RESTful API endpoints:

User Endpoints:
- `GET /users` -  Returns a list of users with pagination support. (e.g., /users?pageNumber=0&pageSize=10).
- `GET /users/count` - Returns the total number of users.
Post Endpoint:
- `GET /posts` - Returns posts filtered by a specific user ID, using the userId query parameter (e.g., /posts?userId={userId}).
- `POST /posts` - Creates a new post.
- `DELETE /{id}` - Deletes a post

The backend is also uses zod to validate the request received. 


## Frontend

The frontend is written in React (Typescript) and utilizes the following library: 
- React Query : Data fetching and caching
- TanStack Router: Routing
- React Table: Data table
- Zod: Data (search) validation


There are 2 screens

`/` - Home screen: Shows a list of users in a table
`/users/$id` - User screen: Shows a list of posts for a specific user
  - You are able to create a new post
  - You are able to delete a post

## Run the app

Copy .env.example in the frontend folder into a new .env file and run 

```
pnpm install 
```

to install the app 

```
pnpm dev
```
to run the app


Go to http://localhost:5173 to see the app

