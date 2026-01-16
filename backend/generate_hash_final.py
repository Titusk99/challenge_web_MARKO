import bcrypt
hash = bcrypt.hashpw(b"admin", bcrypt.gensalt()).decode()
with open("backend/admin_hash_final.txt", "w") as f:
    f.write(hash)
