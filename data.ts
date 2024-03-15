var express= require('express')
var bp= require('body-parser')
const swaggerJsdoc= require('swagger-jsdoc')
const swaggerUi= require('swagger-ui-express')

const app= express()

app.use(
    bp.urlencoded({extended:true}))
    app.use(bp.json());
    const options = {
        definition: {
          openapi: "3.1.0",
          info: {
            title: "Node Express API with Swagger",
            version: "0.1.0",
            description:
              "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
              name: "MIT",
              url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
              name: "Node",
              url: "https://Node.com",
              email: "info@email.com",
            },
          },
          servers: [
            {
              url: "http://localhost:4000",
            },
          ],
        },
        apis: ["./routes/*.js"],
      };
      
      const specs = swaggerJsdoc(options);
      app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
      );

app.listen(4000,()=>{
    console.log('server is ready...!');
})
