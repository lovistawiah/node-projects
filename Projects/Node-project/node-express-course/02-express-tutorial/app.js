const EXPRESS = require('express');
const { products, people } = require('./data')

const APP = EXPRESS();
// APP.use(EXPRESS.static('./navbar-app'))

APP.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1><a href="/api/products">products</a>`)
})
APP.get('/api/products', (req, res) => {
    const newPrduct = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })
    res.json(newPrduct);
})


// APP.get('/api/products/id', (req, res) => {
//     const singleProduct = products.find((product) => product.id === 3);
//     res.json(singleProduct);
// })

// using a query string to use access specific data
APP.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;
    // finding a specific product using productID
    const singleProduct = products.find((product) => product.id === Number(productID));
    if (!singleProduct) {
        return res.status(400).send('Product ID does not Exist');
    } else {
        console.log(singleProduct);
        res.json(singleProduct);
    }
})

// complex query string
APP.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params);
    res.send('hello world');

})

APP.get('/api/v1/query', (req, res) => {
    // destructuring the query strings
    const { search, limit } = req.query;
    // spreading the object
    let sortedProducts = [...products];

    // query search
    if (!search) {
        return res.status(400).send(`search: ${search} is not found`);
    } else if (sortedProducts.length < 1) {
        return res.status(200).json({ succes: true, data: ['product does not match search'] });

    } else {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }

    // query limit
    if (!limit) {
        return res.json(sortedProducts);
    } else {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    // sending the sorted product(s) in json format
    res.status(200).json(sortedProducts)
})

APP.all('*', (req, res) => {
    res.status(400).send("resource not found!");
})


const PORT = 5000;
APP.listen(PORT, () => {
    console.log('listening to this port ');
});
// app.get
// app.delete
// app.post
// app.put
// app.listen
// app.use
// app.all

// console.log(products)


// /last video length - 2:08:53