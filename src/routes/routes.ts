import { Router, Request } from 'express';
import { createBulkProducts, createProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from '../controllers/product-controller';
import multer from 'multer';
import path from 'path';

const router: Router = Router();
const storage = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File, callback: any) {
        const dir = './uploads/';
        callback(null, dir);
    },
    filename: function (req: Request, file: Express.Multer.File, callback: any) {
        callback(null, 'bulk-products' + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

/**
 * Product routes
 */
// Return all products
router.get('/product', getAllProducts);

// Return a single product by id
router.get('/product/:id', getProductById);

// Create a new product
router.post('/product', createProduct);

// Update a single product
router.put('/product', updateProduct);

// Delete a single product
router.delete('/product/:id', deleteProductById);

// Create multiple products using a csv file
router.post('/product/bulk', upload.single('file'), createBulkProducts);

export default router;