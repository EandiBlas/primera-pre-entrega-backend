import express from 'express'
import productManager from './ProductManager.js';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(8080, () => {
    console.log('Escuchando Port 8080')
})

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query
        const product = await productManager.getProducts();
        if (limit) {
            const productFilter = await product.slice(0,limit)
            res.status(200).json({ message: 'Products Filter', productFilter })
        } else {
            res.status(200).json({ message: 'Products', product })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(+pid)
        res.status(200).json({ message: 'Productos', product })
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.post('/products', async (req, res) => {
    console.log(req.body);
    try {
        const product = await productManager.addProduct(req.body)
        res.status(200).json({ message: 'Product created', Product: product })
    } catch (error) {
        res.status(500).json({ error })
    }
})
