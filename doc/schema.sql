CREATE TABLE categories (
  id integer NOT NULL PRIMARY KEY,
  name TEXT UNIQUE
);
CREATE TABLE favorites (
    id INTEGER NOT NULL PRIMARY KEY,
    sku INTEGER,
    user_id INTEGER,
    FOREIGN KEY (sku) REFERENCES products,
    FOREIGN KEY (user_id) REFERENCES users
    UNIQUE(user_id, sku)
);
CREATE TABLE products (
	sku INTEGER NOT NULL PRIMARY KEY,
	name VARCHAR(255),
	price REAL,
	imageUrl TEXT,
	category INTEGER,
	subcategory INTEGER,
	availability TEXT,
	stock INTEGER,
	score REAL,
	FOREIGN KEY (category) REFERENCES categories,
	FOREIGN KEY (subcategory) REFERENCES subcategories);
CREATE TABLE subcategories (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT UNIQUE,
  parentid INTEGER,
  FOREIGN KEY (parentid) REFERENCES categories
);
CREATE TABLE users (
	id INTEGER NOT NULL PRIMARY KEY, 
	username TEXT UNIQUE, 
	password TEXT, 
	salt TEXT);