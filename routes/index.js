var express = require('express');
var router = express.Router();

const Product = require('../models/productModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

let products = [
  {
    id: 1,
    name: 'Test1',
    description: 'lorem5 ncjdksnc djsnjsn dsk nds',
    defaultPrice: 150,
    price: 150,
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    defaultQuantity: 1,
    quantity: 0,
    category: []
  },
  {
    id: 2,
    name: 'Test2',
    description: 'lorem5 ncjdksnc djsnjsn dsk nds',
    defaultPrice: 170,
    price: 170,
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    defaultQuantity: 1,
    quantity: 0,
    category: []
  },
  {
    id: 3,
    name: 'Test3',
    description: 'lorem5 ncjdksnc djsnjsn dsk nds',
    defaultPrice: 220,
    price: 220,
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    defaultQuantity: 1,
    quantity: 0,
    category: []
  },
  {
    id: 4,
    name: 'Test4',
    description: 'lorem5 ncjdksnc djsnjsn dsk nds',
    defaultPrice: 340,
    price: 340,
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    defaultQuantity: 1,
    quantity: 0,
    category: []
  },
  {
    id: 5,
    name: 'Test5',
    description: 'lorem5 ncjdksnc djsnjsn dsk nds',
    defaultPrice: 100,
    price: 100,
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    defaultQuantity: 1,
    quantity: 0,
    category: []
  },
  {
    id: 6,
    name: 'Test6',
    description: 'lorem5 ncjdksnc djsnjsn dsk nds',
    defaultPrice: 90,
    price: 90,
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    defaultQuantity: 1,
    quantity: 0,
    category: []
  }
]

router.post('/products', (req, res) => {

  let test = {
    id: 1,
    name: 'Test1',
    description: 'lorem5 ncjdksnc djsnjsn dsk nds',
    defaultPrice: 150,
    price: 150,
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    defaultQuantity: 1,
    quantity: 0,
    category: []
  }
  const product = new Product({
    id: test.id,
    name: test.name,
    description: test.description,
    defaultPrice: test.defaultPrice,
    price: test.price,
    img: test.img,
    defaultQuantity: test.defaultQuantity,
    quantity: test.quantity,
    category: test.category
  })
  product.save()
    .then(result => {
      res.status(201).json({
        message: 'New Product Created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error'
      });
    });

});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: 'You successfully fetched products',
      products
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error
    });
  }
});

router.get('/product/:id', (req, res) => {
  try {
    const { id } = req.params;
    let product = products.find((item => {
      return item.id == id
    }))
    console.log(id, 'params')
    res.status(201).json({
      message: 'Your Product Fetched Successfully',
      result: product,
      ok: true
    })
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
})


module.exports = router;
