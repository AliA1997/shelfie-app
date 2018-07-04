CREATE TABLE shelfie_products (
    -- NOTE DO NEED TO use id where create data for table, since it is autoincrementing everytime your add a product.
    id SERIAL PRIMARY KEY,
    name TEXT,
    imageurl TEXT,
    price DECIMAL
);
