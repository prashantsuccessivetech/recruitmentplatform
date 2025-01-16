const express = require("express");
const routers = express.Router();
const path = require("path");
require("dotenv").config();

//modules
const ADMIN_PARENT_ROUT = require("./Auth/routes/auth.routes");

const COMPANY_PARENT_ROUT = require("./company/route/company.routers");

const JOB_PARENT_ROUT = require("./job/route/job.routers");

//TESTING SERVER

routers.get('/',(req,res)=>{
    res.status(200).send("It's Up and working............!!! 🍺🍺");
    res.end();
})

routers.use('/auth', ADMIN_PARENT_ROUT);
routers.use('/company', COMPANY_PARENT_ROUT);
routers.use('/job', JOB_PARENT_ROUT);

// routers.call('*',function (req,res){
//     console.log("ERROR POINT MAIN JS",res)
//     res.status(404).send("404............!!!! Not Found");
//     res.end();
// })

module.exports = routers;