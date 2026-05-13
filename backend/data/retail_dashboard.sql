CREATE DATABASE retail_dashboard;
USE retail_dashboard;

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50),
    order_date DATE,
    ship_mode VARCHAR(50),
    segment VARCHAR(50),
    region VARCHAR(50),
    category VARCHAR(50),
    product_name TEXT,
    sales DECIMAL(10,2),
    quantity INT,
    profit DECIMAL(10,2)
);

