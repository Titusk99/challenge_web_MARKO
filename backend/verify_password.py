
import psycopg2
import bcrypt

try:
    conn = psycopg2.connect(
        dbname="marko",
        user="marko_user",
        password="admin",
        host="localhost",
        port="5433"
    )
    cur = conn.cursor()
    cur.execute("SELECT password_hash FROM public.users WHERE email = 'admin@admin.com'")
    result = cur.fetchone()
    if result:
        stored_hash = result[0]
        if bcrypt.checkpw(b"admin", stored_hash.encode('utf-8')):
            print("Password verification SUCCESS: 'admin' works.")
        else:
            print("Password verification FAILED: 'admin' does NOT work.")
    else:
        print("User not found.")
    conn.close()
except Exception as e:
    print(f"Error: {e}")
