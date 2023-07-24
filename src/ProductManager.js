import fs from 'fs'

class ProductManager {

    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const inf = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(inf)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(obj) {
        try {
            const productsPrev = await this.getProducts()
            if (!obj.title || !obj.description || !obj.price || !obj.thumbnail || !obj.code || !obj.stock) {
                console.log(title, description, price, thumbnail, code, stock)
                return "Error campos vacios"
            }
            const verifyCode = productsPrev.find(c => c.code === obj.code)
            if (verifyCode) {
                return "El codigo se repite"
            }
            let id
            if (!productsPrev.length) {
                id = 1
            }
            else {
                id = productsPrev[productsPrev.length - 1].id + 1
            }
            const product = { id, ...obj }
            productsPrev.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsPrev))
            return product
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const productsPrev = await this.getProducts()
            const productId = productsPrev.find((p) => p.id === id)
            if (!productId) {
                return 'ERROR ID DE PRODUCTO NO ENCONTRADO'
            }
            return productId
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, obj) {
        try {
            const productsPrev = await this.getProducts()
            const productsIndex = productsPrev.findIndex(p => p.id === id)
            if (productsIndex === -1) {
                return 'ERROR ID DE PRODUCTO NO ENCONTRADO'
            }
            const product = productsPrev[productsIndex]
            productsPrev[productsIndex] = { ...product, ...obj }
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(productsPrev)
            )
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const productPrev = await this.getProducts()
            const writeNewList = productPrev.filter((r) => r.id !== id)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(writeNewList)
            )
        } catch (error) {
            return error
        }
    }

}

const productManager = new ProductManager("Products.json")

export default productManager