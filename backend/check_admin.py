
import psycopg2
import os

try:
    conn = psycopg2.connect(
        dbname="marko",
        user="marko_user",
        password="admin",
        host="localhost",
        port="5433"
    )
    cur = conn.cursor()
    cur.execute("SELECT email FROM public.users WHERE email = 'admin@admin.com'")
    user = cur.fetchone()
    if user:
        print("Admin user EXISTS")
    else:
        print("Admin user does NOT exist")
    conn.close()
except Exception as e:
    print(f"Error checking DB: {e}")
