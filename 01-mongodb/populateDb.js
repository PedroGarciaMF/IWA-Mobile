#! /usr/bin/env node

// not yet used
const userArgs = process.argv.slice(2);

const config = require('config');
const dbHost = config.get('App.dbConfig.host') || 'localhost';
const dbPort = config.get('App.dbConfig.port') || 27017;
const dbName = config.get('App.dbConfig.database') || 'iwa';
const mongoDB = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const Product = require("./models/product");
const User = require("./models/user");

const users = [];
const products = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

main().catch((err) => console.log(err));

async function main() {
    console.log(`[INFO]:: Connecting to MongoDB: ${mongoDB}`);
    await mongoose.connect(mongoDB);
    console.log(`[INFO]:: Dropping existing collections`);
    await mongoose.connection.db.dropCollection('products');
    await mongoose.connection.db.dropCollection('users');
    console.log(`[INFO]:: Creating collections`);
    await createUsers();
    await createProducts();
    console.log("[INFO]:: Closing connection");
    await mongoose.connection.close();
    console.log("[INFO]:: Done")
}

async function userCreate(index, first_name, middle_name, last_name, email, phone_number, is_admin) {
    const username = {
        name: {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
        }
    }
    const userdetail =
        {
            name: {
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
            },
            email: email,
            phone_number: phone_number,
            password: "9d9cba1e29b334cc", // defaults encoding of "password"
            address: {
                street: "1 Somewhere Street",
                city: "London",
                state: "Greater London",
                zip: "SW1",
                country: "United Kingdom"
            },
            is_enabled: true,
            password_reset: false,
            mfa_enabled: false,
            is_admin: is_admin
        };

    const user = new User(userdetail);

    await user.save();
    users[index] = user;
    console.log(`Added user: ${first_name} ${last_name}`);
}

async function productCreate(index, code, name, image, price, on_sale, sale_price, in_stock, time_to_stock, rating, available) {
    const productdetail =
        {
            code: code,
            name: name,
            summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra enim erat, sed tempor mauris viverra in. Donec ante diam, rhoncus dapibus efficitur ut, sagittis a elit. Integer non ante felis. Curabitur nec lectus ut velit bibendum euismod. Nulla mattis convallis neque ac euismod. Ut vel mattis lorem, nec tempus nibh. Vivamus tincidunt enim a risus placerat viverra. Curabitur diam sapien, posuere dignissim accumsan sed, tempus sit amet diam. Aliquam tincidunt vitae quam non rutrum. Nunc id sollicitudin neque, at posuere metus. Sed interdum ex erat, et ornare purus bibendum id. Suspendisse sagittis est dui. Donec vestibulum elit at arcu feugiat porttitor.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra enim erat, sed tempor mauris viverra in. Donec ante diam, rhoncus dapibus efficitur ut, sagittis a elit. Integer non ante felis. Curabitur nec lectus ut velit bibendum euismod. Nulla mattis convallis neque ac euismod. Ut vel mattis lorem, nec tempus nibh. Vivamus tincidunt enim a risus placerat viverra. Curabitur diam sapien, posuere dignissim accumsan sed, tempus sit amet diam. Aliquam tincidunt vitae quam non rutrum. Nunc id sollicitudin neque, at posuere metus. Sed interdum ex erat, et ornare purus bibendum id. Suspendisse sagittis est dui. Donec vestibulum elit at arcu feugiat porttitor.",
            image: image,
            price: price,
            on_sale: on_sale,
            in_stock: in_stock,
            time_to_stock: time_to_stock,
            rating: rating,
            available: available
        };
    const product = new Product(productdetail);
    await product.save();
    products[index] = product;
    console.log(`Added product: ${code}`);
}

async function createUsers() {
    console.log("Adding users");
    await Promise.all([
        userCreate(0, "Admin", "", "User", "admin@localhost.com", "0123456789", true),
        userCreate(1, "Sam", "A", "Shopper", "user1@localhost.com", "0123456789", false),
        userCreate(2, "Sam", "A", "Shopper", "user2@localhost.com", "0123456789", false),
    ]);
}

async function createProducts() {
    console.log("Adding Products");
    await Promise.all([
        productCreate(0, "SWA234-A568-00010", "Solodox 750", "generic-product-4.jpg",
            12.95, false, 0, true, 30,4, true
        ),
        productCreate(1, "SWA534-F528-00115", "Alphadex Plus", "generic-product-1.jpg",
            14.95, true, 9.95, true, 30,5, true
        ),
        productCreate(2, "SWA179-G243-00101", "Dontax", "generic-product-2.jpg",
            8.50, false, 0, true, 30,3, true
        ),
        productCreate(3, "SWA201-D342-00132", "Tranix Life", "generic-product-3.jpg",
            7.95, true, 4.95, true, 14,5, true
        ),
        productCreate(4, "SWA312-F432-00134", "Salex Two", "generic-product-5.jpg",
            11.95, false, 0, true, 14,5, true
        ),
        productCreate(5, "SWA654-F106-00412", "Betala Lite", "generic-product-4.jpg",
            11.95, false, 0, true, 30,5, true
        ),
        productCreate(6, "SWA254-A971-00213", "Stimlab Mitre", "generic-product-6.jpg",
            12.95, false, 0, true, 7,5, true
        ),
        productCreate(7, "SWA754-B418-00315", "Alphadex Lite", "generic-product-7.jpg",
            9.95, false, 0, true, 30,2, true
        ),
        productCreate(8, "SWA432-E901-00126", "Villacore 2000", "generic-product-8.jpg",
            19.95, false, 0, true, 30,2, true
        ),
        productCreate(9, "SWA723-A375-00412", "Kanlab Blue", "generic-product-9.jpg",
            9.95, false, 0, true, 7,5, true
        ),
    ]);
}
