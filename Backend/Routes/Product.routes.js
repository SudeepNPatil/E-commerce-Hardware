import { Router } from 'express';
import Products from '../Models/Product.model.js';
import upload from '../Middlewares/multer.js';
import { uploadToCloudinary } from '../Middlewares/uploadToCloudinary.js';

const router = Router();

router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category);
    // case-insensitive search
    const products = await Products.find({
      category: { $regex: new RegExp(category, 'i') },
    });

    if (!products || products.length === 0) {
      return res.status(200).send({
        message: 'No products found for this category',
        products: [],
      });
    }

    res.status(200).send({
      message: 'Products fetched by category',
      count: products.length,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/Custom/:category/:subcategory', async (req, res) => {
  try {
    const { category, subcategory } = req.params;

    console.log(category, subcategory);

    const products = await Products.find({
      category,
      subcategory,
    });

    console.log(products);

    if (!products || products.length === 0) {
      return res.status(404).send({
        message: 'No products found',
        products: [],
      });
    }

    res.status(200).send({
      message: 'Products fetched successfully',
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:category/:subcategory', async (req, res) => {
  try {
    let { category, subcategory } = req.params;

    // Lowercase everything for consistency
    category = category.toLowerCase();
    subcategory = subcategory.toLowerCase();

    // Rule: laptop OR desktop -> return both
    let categoryList = [];

    if (category === 'laptop' || category === 'desktop') {
      categoryList = ['Laptop', 'Desktop PC'];
    } else {
      categoryList = [category];
    }

    // Case-insensitive search
    const products = await Products.find({
      category: {
        $in: categoryList.map((c) => new RegExp('^' + c + '$', 'i')),
      },
      subcategory: { $regex: new RegExp('^' + subcategory + '$', 'i') },
    });

    if (products.length === 0) {
      return res.status(200).send({
        message: 'No products found',
        products: [],
      });
    }

    res.status(200).send({
      message: 'Products fetched successfully',
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const getproduct = await Products.findById(id);

    if (!getproduct) {
      return res.status(404).send({ message: 'not found' });
    }

    res.status(200).send({ message: 'product info', product: getproduct });
  } catch (err) {
    res.status(500).send({ message: 'internal server error' });
  }
});

router.post('/save-product', upload.single('image'), async (req, res) => {
  try {
    const productData = req.body;

    if (!productData.name || !productData.category || !productData.price) {
      return res.status(400).send({
        message: 'name, category, and price are required',
      });
    }

    let imageUrl = '';

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, 'image');
      console.log('3️⃣ Cloudinary upload done ✅');
    }

    const newProduct = new Products({
      ...productData,
      imageUrl: imageUrl,
    });

    await newProduct.save();

    res.status(201).send({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
