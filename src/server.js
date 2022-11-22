import express from 'express';
import { json, urlencoded } from 'express';
import productosRouter from './routes/productos.route.js';
import baseRoute from './routes/base.route.js';
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

const PORT = 8080;


app.use('/api/productos',productosRouter);
app.use("/",baseRoute);

app.listen(PORT, (err) => {
  
  if(err) {
    console.log(err);
  }
  else {
    console.log(`Listening on port ${PORT} desde el server.js`);
  }

});
