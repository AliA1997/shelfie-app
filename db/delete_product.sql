--MAKE SURE TO HAVE THE WHERE CLAUSE, IF NOT WILL DELETE ALL DATA IN DATABASE
--- NO Need an object since just one parameter.
DELETE FROM shelfie_products WHERE id = $1;
--- array parameters.
-- DELETE FROM shelfie_products WHERE id = $1;

