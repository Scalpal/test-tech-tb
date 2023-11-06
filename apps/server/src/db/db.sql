-- Création de la table products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  lastname VARCHAR(255),
  firstname VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES users(id),
  total NUMERIC(10, 2) NOT NULL
);

CREATE TABLE orders_products_relation (
  orderId INT NOT NULL REFERENCES orders(id),
  productId INT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1,
  PRIMARY KEY (orderId, productId)
);

-- Insertion de 20 échantillons de produits de mode
INSERT INTO products (name, price, stock) VALUES 
    ('T-shirt Blanc', 19.99, 100),
    ('Jean Slim Noir', 49.99, 75),
    ('Chaussures de Sport', 89.99, 50),
    ('Veste en Cuir', 199.99, 25),
    ('Robe d''Été', 29.99, 60),
    ('Cravate en Soie', 24.99, 40),
    ('Sac à Main', 59.99, 30),
    ('Chapeau Panama', 34.99, 20),
    ('Écharpe en Laine', 29.99, 45),
    ('Ceinture en Cuir', 39.99, 70),
    ('Montre Classique', 149.99, 15),
    ('Bottes en Cuir', 99.99, 40),
    ('Lunettes de Soleil', 79.99, 50),
    ('Chemise à Carreaux', 44.99, 55),
    ('Pull-over Gris', 64.99, 35),
    ('Short en Jean', 39.99, 60),
    ('Sandales d''Été', 49.99, 40),
    ('Bijoux Fantaisie', 14.99, 85),
    ('Pantalon Chino', 54.99, 50),
    ('Blouse Florale', 39.99, 40);

INSERT INTO users (lastname, firstname, email, password) VALUES (
  'test', 'test', 'test@gmail.com', 'test123*'
)

INSERT INTO orders (userId, total) VALUES (1, 10)
