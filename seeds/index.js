const mongoose = require("mongoose");
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers") 
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database Conneted");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const sendDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60d4bcc3ae4ec814fcae8358',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repellat velit recusandae libero reiciendis officiis vel sapiente laboriosam. Expedita aut inventore dolore officiis vel eveniet, consequatur molestias esse recusandae animi.",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/ds4jmt4id/image/upload/v1625146097/YelpCamp/z89rxgtqwgq3k1cs7wp8.jpg',
                  filename: 'YelpCamp/z89rxgtqwgq3k1cs7wp8'
                },
                {
                  url: 'https://res.cloudinary.com/ds4jmt4id/image/upload/v1625146096/YelpCamp/uf4vmxs89g9pcdvxdy6d.jpg',
                  filename: 'YelpCamp/uf4vmxs89g9pcdvxdy6d'
                }
              ]
        })
        await camp.save();
    }
}

sendDB().then(() =>{
    mongoose.connection.close();
})