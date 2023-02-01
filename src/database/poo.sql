-- Active: 1675270439070@@127.0.0.1@3306
CREATE TABLE characters (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    origin TEXT NOT NULL
);

INSERT INTO characters (id, name, origin)
VALUES ("c001", "Rick Sanchez", "Rick And Morty"),
("c002", "Capitão America", "Os Vingadores"),
("c003", "Lindinha", "As Meninas Super Poderosas");