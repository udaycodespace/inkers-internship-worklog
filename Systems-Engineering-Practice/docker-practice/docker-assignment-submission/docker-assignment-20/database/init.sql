CREATE TABLE demo (
    id SERIAL PRIMARY KEY,
    message TEXT
);

INSERT INTO demo (message) VALUES ('Hello from PostgreSQL!');
