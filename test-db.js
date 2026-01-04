const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://martynas96:5xtIjAX19Z2tCckb@cluster0.pysibqi.mongodb.net/?appName=Cluster0";

async function testConnection() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Successfully connected to MongoDB Atlas!');
        console.log('Database name:', mongoose.connection.name);
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
    }
}

testConnection();