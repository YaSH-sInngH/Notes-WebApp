import mongoose from "mongoose";

const Connection = async (URL)=>{
    

    try{
        await mongoose.connect(URL);
        console.log('Database connected successfully');
        
    }catch(error){
        console.log('Error connecting while database:',error);
    }
}

export default Connection;