DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS emailAuthors CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS tempAprovals CASCADE;
DROP TABLE IF EXISTS abouts CASCADE;


CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255)
);

CREATE TABLE emailAuthors (
	id SERIAL PRIMARY KEY,
	author_name VARCHAR(255),
	article_title TEXT,
	message TEXT,
	author_id INTEGER references authors,
	client_name VARCHAR(255),
	client_email VARCHAR(255)
);

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category VARCHAR(255)
);

CREATE TABLE articles (
	id SERIAL PRIMARY KEY,
	article_title TEXT,
	article_desc TEXT,
	author_id INTEGER references authors,
	category_id INTEGER references categories,
	date DATE NOT NULL default CURRENT_DATE
);

CREATE TABLE tempAprovals (
	id SERIAL PRIMARY KEY,
	article_desc TEXT,
	article_id INTEGER references articles,
	date DATE NOT NULL default CURRENT_DATE
);

CREATE TABLE abouts (
	id SERIAL PRIMARY KEY,
	description TEXT
);