//page 1
> List of brands
http://localhost:9120/brands(all brands)
http://localhost:9120/brands?brandId=1(searching particular brand)

> Categories to shop
http://localhost:9120/category(all categories)
http://localhost:9120/category?categoryId=2(searching particular category to shop)


//page 2
> Clothes or Accessories having brand name
http://localhost:9120/products?brandId=2

> Clothes or Accessories having cost
http://localhost:9120/filter/1?lcost=200&hcost=500

//page 3
> Details of Cloth or Accessory(brand, size, rating)
http://localhost:9120/products/5

//page 4
> Details of Cloth or Accessory selected
http://localhost:9120/products/5

> Place Order
http://localhost:9120/placeOrder
{
    "orderId": 5,
    "name":"Priyanka",
    "email":"priyanka@gmail.com",
    "address":"Home 25",
    "phone":9999999999,
    "cost":811,
    "menuItem":[
        23,
        56,
        78
    ]
}

{
    "orderId":2,
    "name":"Amit",
    "email":"amit@gmail.com",
    "address":"Hom 65",
    "phone":"8989898989",
    "cost":612,
    "menuItem":[
        45,
        34,
        41
    ]
}

//Page 5
> List of all orders
http://localhost:9120/orders

> Update details
http://localhost:9120/updateOrder
{
    "_id":"64940c85d567e42ebad381da",
    "status":"Out for delivery"
}

> Delete orders
http://localhost:9120/deleteOrder
{
    "_id":"64940db2d567e42ebad381db"
}
