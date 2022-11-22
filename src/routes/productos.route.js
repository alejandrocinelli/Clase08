import { Router } from "express";

const router = Router();

const productos = [
    {
        title: "Arroz",
        price: "100",
        thumbnail: "url al logo  ",
        id: 1,
      }
];

router.route("/").get((req,res) => {
    
    const response = { 
        data: productos,
        status : 200,
    }
    res.json(response);

})
.post((req,res) => {
        
        const {title,price,thumbnail} = req.body;
        const id = productos.length + 1;
        const newProducto = {title,price,thumbnail,id};
        productos.push(newProducto);
        const response = {
            data: productos,
            status: 201,
        }
        res.json(response);
});

router.route("/:id").get((req,res) => {
    const {id} = req.params;
    const producto = productos.find((producto) => producto.id === Number(id));
    const response = producto ? {data: producto, status: "success"} : {data: null, status: "error"};
    const statusCode = producto ? 200 : 404;
    res.status(statusCode).json(response);
})
.put((req,res) => {
    const {id} = req.params;
    const {title,price,thumbnail} = req.body;
    const productoId = productos.find((producto) => producto.id === Number(id));
   
    if(!productoId) {
        res.status(404).json({data: null, status: "error"});
        return;
    }
    else {
        productoId.title = title;
        productoId.price = price;
        productoId.thumbnail = thumbnail;
        productoId.id = Number (id);
        
            };
        res.status(200).json({data: productos, status: "success"});
    }
)
.delete((req,res) => {
    const {id} = req.params;
    const productoDeleteIndex = productos.findIndex((producto) => producto.id === Number(id));
    const deleteProd = productos[productoDeleteIndex];
    if(!deleteProd) {
        res.status(404).json({data: null, status: "error"});
        return;
    }
    else {
        productos.splice(productoDeleteIndex,1);
        res.status(200).json({data: productos, status: "success"});
    }
});


export default router;