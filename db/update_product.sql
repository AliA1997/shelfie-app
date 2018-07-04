-- Only use id's when updating or deleting data from database.
-- Using named parameters
UPDATE shelfie_products 
SET name = ${name},
imageurl = ${imageurl},
price = ${price}
WHERE id = ${id};

-- Can also use an array paramters
-- UPDATE shelfie_products 
-- SET name = $1,
-- imageurl = $2,
-- price $3,
-- id = $4;