const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Rink = require('../models/rink');

mongoose.connect('mongodb://localhost:27017/puckFinder', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Rink.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const playerCount = Math.floor(Math.random() * 20);
        const rink = new Rink({
            //YOUR USER ID
            author: '5ff98d6f21ff2886093246ab',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            // image: 'https://source.unsplash.com/collection/3140340',
            playerCount,
            // price,
            // geometry: {
            //     type: "Point",
            //     coordinates: [
            //         cities[random1000].longitude,
            //         cities[random1000].latitude,
            //     ]
            // },
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1555710853-1f4c02bb95a6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                    filename: 'PuckFinder/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://images.unsplash.com/photo-1607250149983-6a6b91d7e999?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                    filename: 'PuckFinder/ruyoaxgf72nzpi4y6cdi'
                },
                {
                    url: 'https://res.cloudinary.com/dmmbzjpzz/image/upload/v1610568647/PuckFinder/btuomgmwmje93tladq64.jpg',
                    filename: 'PuckFinder/btuomgmwmje93tladq64'
                },
                {
                    url: 'https://res.cloudinary.com/dmmbzjpzz/image/upload/v1610567541/PuckFinder/hpraeyqhncnurcgvnpz1.jpg',
                    filename: 'PuckFinder/hpraeyqhncnurcgvnpz1'
                }
            ]
        })
        await rink.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})