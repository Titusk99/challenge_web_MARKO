
import psycopg2

try:
    conn = psycopg2.connect(
        dbname="marko",
        user="marko_user",
        password="admin",
        host="localhost",
        port="5433"
    )
    cur = conn.cursor()
    cur.execute("SELECT count(*) FROM public.categories")
    count = cur.fetchone()[0]
    print(f"Categories count: {count}")
    conn.close()
except Exception as e:
    print(f"Error checking DB: {e}")
