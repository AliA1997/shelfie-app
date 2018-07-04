-- Can used named parameter, in which order doesn't matter
INSERT INTO shelfie_products (name, imageurl, price) VALUES (${name}, ${imageurl}, ${price});
-- OR can use an array, but has to be in order 
-- INSERT INTO shelfie_products (name, imageurl, price) VALUES ($1, $2, $3);
---CAN select all products after inserting it.
--SELECT * FROM shelfie_products;