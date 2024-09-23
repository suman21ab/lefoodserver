import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);





const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


app.use('/posts', postRoutes);
app.use('/user', userRoutes);




const CONNECTION_URL = "mongodb+srv://sumankumar21041999:social123@cluster1.vigicqk.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  //.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  //.catch((error) => console.log(`${error} did not connect to database`));

mongoose.set('useFindAndModify', false);

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://spicy2.vercel.app",
    // credentials: true,
  },
});

//let orders = [];
let users = [];

const addUser = (userId, socketId) => {
  //console.log(socketId);
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });

};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('A user connected');

   // Send existing orders to the new client
   //socket.emit('initialOrders', orders);
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(userId + socket.id);
  });

  // Listen for new orders from the client
  socket.on('newOrder', (order) => {
    //orders.push(order);
    // Broadcast the new order to all connected clients
    const user = getUser(order.seller);
    const user2 = getUser("sender");
    const user3 = getUser("sender2");
    const user4 = getUser("sender3");

    io.to(user?.socketId).emit('orderUpdated', order);
    io.to(user2?.socketId).emit('orderUpdated', order);
    io.to(user3?.socketId).emit('orderUpdated', order);
    io.to(user4?.socketId).emit('orderUpdated', order);
  });

  socket.on('deleteOrder', (order) => {
   
    const user = getUser(order.seller);
    const user2 = getUser("sender");
    const user3 = getUser("sender2");
    const user4 = getUser("sender3");

    io.to(user?.socketId).emit('orderDeleted', order._id);
    io.to(user2?.socketId).emit('orderDeleted', order._id);
    io.to(user3?.socketId).emit('orderDeleted', order._id);
    io.to(user4?.socketId).emit('orderDeleted', order._id);
  });

  socket.on('updateStatus', (order) => {
   
    const user2 = getUser("sender");
    const user = getUser(order.seller);
    const user3 = getUser("sender2");
    const user4 = getUser("sender3");

    io.to(user2?.socketId).emit('statusUpdated', order);
    io.to(user?.socketId).emit('statusUpdated', order);
    io.to(user3?.socketId).emit('statusUpdated', order);
    io.to(user4?.socketId).emit('statusUpdated', order);
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    console.log('User disconnected');
  });
});






