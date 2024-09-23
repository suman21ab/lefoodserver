import express from 'express';

import { getPosts, createPost, updatePost, addOrders, getOrders, updateOrder, deleteOrder, getOrdersById, getOrdersBySeller, addEarning, getEarningBySeller, deleteSoldOrder} from '../controllers/posts.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/', getPosts);
router.post('/',auth, createPost);

router.post('/orders', addOrders);
router.post('/earning', addEarning);

router.get('/orders', getOrders);
router.get('/orders/:id', getOrdersById);
router.get('/sellerorders/:id', getOrdersBySeller);//
router.get('/earningbyseller/:id', getEarningBySeller);



router.patch('/:id',auth, updatePost);
router.patch('/orders/:id',updateOrder);
router.delete('/orders/:id', deleteOrder);
router.delete('/sold/:id', deleteSoldOrder);


export default router;