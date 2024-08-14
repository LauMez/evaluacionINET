CREATE DATABASE dbVentas;

USE dbVentas;

CREATE TABLE Client (
  clientID BINARY(16) PRIMARY KEY
);

CREATE TABLE Sale (
  saleID BINARY(16) PRIMARY KEY
);

CREATE TABLE Personal_Information (
  clientID BINARY(16) PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  dni VARCHAR(50) NOT NULL
);

CREATE TABLE Account (
  accountID BINARY(16) PRIMARY KEY,
  userID BINARY(16) NOT NULL,
  email varchar(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE Shipping_Information (
  clientID BINARY(16) PRIMARY KEY,
  city VARCHAR(50) NOT NULL,
  post_code INT NOT NULL,
  street VARCHAR(50) NOT NULL,
  number INT NOT NULL,
  piso INT
);

CREATE TABLE Cart (
  cartID BINARY(16) PRIMARY KEY,
  clientID BINARY(16) NOT NULL
);

CREATE TABLE Selected_Product (
  selected_productID BINARY(16) PRIMARY KEY,
  cartID BINARY(16) NOT NULL,
  productID BINARY(16) NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE Product (
  productID BINARY(16) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL
);

CREATE TABLE Stock (
  productID BINARY(16) PRIMARY KEY,
  quantity INT NOT NULL
);

CREATE TABLE Payment_Order (
  orderID BINARY(16) PRIMARY KEY,
  status VARCHAR(100) NOT NULL,
  creation_date DATETIME NOT NULL,
  delivery_date DATETIME
);

CREATE TABLE Buyer_Information (
  buyer_infoID BINARY(16) PRIMARY KEY,
  orderID BINARY(16) NOT NULL,
  clientID BINARY(16) NOT NULL
);

CREATE TABLE Purchased_Product (
  purchased_productID BINARY(16) PRIMARY KEY,
  orderID BINARY(16) NOT NULL,
  productID BINARY(16) NOT NULL
);

CREATE TABLE Payment (
  paymentID BINARY(16) PRIMARY KEY,
  orderID BINARY(16) NOT NULL,
  payment_method VARCHAR(100) NOT NULL,
  total_price FLOAT NOT NULL
);