import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
import AddOrders from '../models/orders.js';
import Earning from '../models/earning.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const addOrders = async (req, res) => {


    const {mobile, status, address,GPS, cart, seller, writecake, DeliveryDateTime, deliveryBoy } = req.body;
    //console.log(req.body);

    const adddedorders = new AddOrders({mobile, seller, status, address,GPS, cart, createdAt: new Date().toISOString(), writecake, DeliveryDateTime, deliveryBoy })

    try {
        await adddedorders.save();

        res.status(201).json(adddedorders);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const addEarning = async (req, res) => {


    const {mobile, status, address,GPS, cart, createdAt, seller, writecake, DeliveryDateTime, deliveryBoy } = req.body;
    //console.log(req.body);

    const adddedorders = new Earning({mobile, seller, status, address,GPS, cart, createdAt, writecake, DeliveryDateTime, deliveryBoy })

    try {
        await adddedorders.save();

        res.status(201).json(adddedorders);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const getOrders = async (req, res) => { 
    try {
        const allorders = await AddOrders.find();
                
        res.status(200).json(allorders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOrdersById = async (req, res) => { 
    const { id } = req.params;
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
   
    try {
       
        const allorders = await AddOrders.find({mobile: id});
                
        res.status(200).json(allorders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOrdersBySeller = async (req, res) => { 
    const { id } = req.params;
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    //console.log(id);
    try {
        if(id === 'suman' || id === 'sender' || id === 'sender2' || id === 'sender3'){
            const allorders = await AddOrders.find();       
            return res.status(200).json(allorders);

        }
        const allorders = await AddOrders.find({seller: id});
                
        res.status(200).json(allorders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} //getEarningBySeller

export const getEarningBySeller = async (req, res) => { 
    const { id } = req.params;
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    //console.log(id);
    try {
        if(id === 'suman' || id === 'sender' || id === 'sender2' || id === 'sender3'){
            const allorders = await Earning.find();       
            return res.status(200).json(allorders);

        }
        const allorders = await Earning.find({seller: id});
                
        res.status(200).json(allorders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await AddOrders.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
} 

export const deleteSoldOrder = async (req, res) => {
    const { id } = req.params;
    //console.log("sold"+id);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Earning.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const updateOrder = async (req, res) => {
    
    const { id } = req.params;
    const { _id, mobile, status, address, GPS, cart, createdAt, __v, DeliveryDateTime, writecake, seller, deliveryBoy} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { _id, mobile, status, address, GPS, cart, createdAt, __v, DeliveryDateTime, writecake, seller, deliveryBoy };
    //console.log(updatedPost);

    await AddOrders.findByIdAndUpdate(id, updatedPost, { new: true });
    
    res.json(updatedPost);
}

export const updatePost = async (req, res) => {
    
    const { id } = req.params;
    const { createdAt, creator, like, message, name, selectedFile, tags, title, __v} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { createdAt: new Date().toISOString(), creator, like, message, name, selectedFile, tags, title, __v, _id: id };
    //console.log(updatedPost);

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
    res.json(updatedPost);
}

