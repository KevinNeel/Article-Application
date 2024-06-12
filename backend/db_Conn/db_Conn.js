import mongoose from 'mongoose'

const db_Connect = ()=> {
    mongoose.connect(process.env.DATABASE_URI).then(()=>{
        console.log('DB Connection Successful');
    }).catch((err)=>{
        console.log("Unsuccessfull Connection", err);
    })
}

export default db_Connect