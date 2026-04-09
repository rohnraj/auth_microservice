import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './router/authRoutes.js';
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { getUser } from './controllers/authController.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT;

const packageDef = protoLoader.loadSync("proto/user.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.user;

const server = new grpc.Server();
server.addService(userPackage.UserService.service, {
  GetUser: getUser
});

app.use(express.json());
 
app.use('/', authRoutes);
app.use('/', (req, res) => {
  res.send('Hello, World!');
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

server.bindAsync(
  "0.0.0.0:8080",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("User Service running on port 8080");
  }
);