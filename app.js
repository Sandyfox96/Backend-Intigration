
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./Src/config/db.js");

const updateRoutes = require("./Src/Routes/UpdateRoutes.js");
const publishedRoutes = require ('./Src/Routes/PublishRoutes.js');
const findOneCustomer = require ('./Src/Routes/FindoneRoutes.js');
const deleteCustomer = require('./Src/Routes/DeleteRoutes.js');
const deleteAllCustomer = require('./Src/Routes/DeleteAllRoutes.js');
const createCustomer = require ('./Src/Routes/CreateCRoutes.js');
const findAllCustomer = require ('./Src/Routes/FindAllRoutes.js');
const RegisterRoutes = require("./Src/Routes/RegisterRoutes.js");
const loginRoutes = require("./Src/Routes/loginRoutes.js");

const app = express();
const port = 3000;

// Middleware function use 
app.use(bodyParser.json());

// Test database connection
db.sequelize.authenticate()
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Sync models
db.sequelize.sync({ force: false })
    .then(() => console.log('Database synchronized.'))
    .catch(err => console.error('Database synchronization failed:', err));


// Routes
app.use("/customers", updateRoutes);
app.use("/customers", publishedRoutes);
app.use("/customers", findOneCustomer);
app.use("/customers", deleteCustomer);
app.use("/customers", deleteAllCustomer);
app.use("/customers", createCustomer);
app.use("/customers", findAllCustomer);
app.use("/authregister", RegisterRoutes); 
app.use("/authlogin", loginRoutes);    


// Home route
app.get("/", (req, res) => { res.send("Hello Home"); });

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
