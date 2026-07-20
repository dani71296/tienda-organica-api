const mongodb = require('../db/connection');
const { ObjectId } = require('mongodb');

// 1. GET ALL
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db('tienda_organica').collection('meats_dairy').find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message || 'An error occurred while retrieving products.' });
    }
};

// 2. GET SINGLE BY ID
const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid product id to find a product.' });
        }
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('tienda_organica').collection('meats_dairy').find({ _id: productId });
        const lists = await result.toArray();

        if (lists.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    } catch (error) {
        res.status(500).json({ message: error.message || 'An error occurred while retrieving the product.' });
    }
};

// 3. POST (CREATE)
const createProduct = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            unit: req.body.unit,
            stock: req.body.stock
        };
        const response = await mongodb.getDb().db('tienda_organica').collection('meats_dairy').insertOne(product);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the product.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'An error occurred while creating the product.' });
    }
};

// 4. PUT (UPDATE)
const updateProduct = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid product id to update a product.' });
        }
        const productId = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            price: req.body.price,
            unit: req.body.unit,
            stock: req.body.stock
        };
        const response = await mongodb.getDb().db('tienda_organica').collection('meats_dairy').replaceOne({ _id: productId }, product);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the product.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'An error occurred while updating the product.' });
    }
};

// 5. DELETE
const deleteProduct = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Must use a valid product id to delete a product.' });
        }
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('tienda_organica').collection('meats_dairy').deleteOne({ _id: productId });
        if (response.deletedCount > 0) {
            res.status(200).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the product.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'An error occurred while deleting the product.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};