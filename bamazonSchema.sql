DROP DATABASE bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_sales DECIMAL(10, 2) DEFAULT 0,
    department_name VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Grilled Cheese Sandwitch', 'Produce', 3.50, 50), ('Apples', 'Produce', .50, 200),
('Honey-Lemon tea', 'Produce', 2.75, 25), ('Toilet paper', 'Toiletry', 1.50, 2000), ('Keyboard', 'Electronics', 19.99, 400),
('X-box Controller', 'Electronics', 69.99, 500), ('Office Table', 'Office', 459.99, 85), ('3-Ring Binders', 'Office', 5.99, 1000),
('Thermos', 'To-Go Drinkware', 59.99, 190), ('Puppy Food', 'Pet Supplies', 25.99, 1500)