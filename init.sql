USE laravel;

INSERT INTO categories (name) VALUES
    ('Electrodomesticos'),
    ('Ropa'),
    ('Hogar');

INSERT INTO products (name, stock, category_id) VALUES
    ('Telefono Inteligente', 100, 1),
    ('Lavadora', 10, 1),
    ('Pantalon', 200, 2),
    ('Camisa', 150, 2),
    ('Cama', 10, 3),
    ('Silla', 15, 3);