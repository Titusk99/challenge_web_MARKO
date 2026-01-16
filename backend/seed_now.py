
import psycopg2

sql_commands = [
    """
    INSERT INTO public.categories (name, slug, gender) VALUES
    ('Coats & Jackets', 'women-coats-jackets', 'Women'),
    ('Dresses', 'women-dresses', 'Women'),
    ('Tops & Shirts', 'women-tops-shirts', 'Women'),
    ('Pants', 'women-pants', 'Women'),
    ('Knitwear', 'women-knitwear', 'Women'),
    ('Skirts', 'women-skirts', 'Women'),
    ('Shoes', 'women-shoes', 'Women'),
    ('Bags', 'women-bags', 'Women')
    ON CONFLICT (slug) DO NOTHING;
    """,
    """
    INSERT INTO public.categories (name, slug, gender) VALUES
    ('Suits & Blazers', 'men-suits-blazers', 'Men'),
    ('Shirts', 'men-shirts', 'Men'),
    ('Trousers', 'men-trousers', 'Men'),
    ('Jeans', 'men-jeans', 'Men'),
    ('Outerwear', 'men-outerwear', 'Men'),
    ('Shoes', 'men-shoes', 'Men'),
    ('Accessories', 'men-accessories', 'Men')
    ON CONFLICT (slug) DO NOTHING;
    """,
    """
    INSERT INTO public.categories (name, slug, gender) VALUES
    ('Bags', 'acc-bags', 'Accessories'),
    ('Jewelry', 'acc-jewelry', 'Accessories'),
    ('Watches', 'acc-watches', 'Accessories'),
    ('Sunglasses', 'acc-sunglasses', 'Accessories'),
    ('Hats', 'acc-hats', 'Accessories')
    ON CONFLICT (slug) DO NOTHING;
    """
]

try:
    conn = psycopg2.connect(
        dbname="marko",
        user="marko_user",
        password="admin",
        host="localhost",
        port="5433"
    )
    cur = conn.cursor()
    for command in sql_commands:
        cur.execute(command)
    conn.commit()
    print("Categories seeded successfully.")
    conn.close()
except Exception as e:
    print(f"Error seeding DB: {e}")
