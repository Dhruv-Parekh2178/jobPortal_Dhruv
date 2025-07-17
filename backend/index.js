import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import applicationRoute from './routes/applicationroute.js';
import companyRoute from './routes/companyroute.js';
import jobRoute from './routes/jobroute.js';
import userRoute from './routes/userroute.js';
import connectDB from './utils/db.js';


dotenv.config({})
const app= express();



//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


// const corsOptions={
//     // origin: 'http://localhost:5173',
//        origin: 'https://jp-frontend-cx49.onrender.com/',
//     credentials: true,
// }

// const corsOptions = {
//     origin: ['http://localhost:5173', 'https://job-portal-hooo.vercel.app/'], 
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
// };

// app.use(cors(corsOptions));
// const corsOptions = {
//     origin: ['http://localhost:5173', 'https://job-portal-hooo.vercel.app'], // ❌ removed trailing slashes
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ ensure OPTIONS is included
// };

// app.use(cors(corsOptions));

//   // ✅ Handle preflight requests globally

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://job-portal-hooo.vercel.app',
        'https://job-portal-hooo-cuwjo4o89-ashish1554s-projects.vercel.app',
         'https://job-portal-hooo-s7su2a06t-ashish1554s-projects.vercel.app' // ✅ Correct Vercel frontend
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use(cors({
  origin: true, // allow all origins
  credentials: true
}));

app.options('*', cors(corsOptions));


//api

app.use('/api/users',userRoute)
app.use('/api/company',companyRoute)
app.use('/api/job',jobRoute)
app.use('/api/application',applicationRoute)
app.get('/api',(req,res)=>{
    res.json({message:'API is running'})
})
app.get("/", (req, res) => {
    res.send("API is running...");
});

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    connectDB()
    console.log(`server is running at ${port}`)
})
