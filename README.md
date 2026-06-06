# URL Shortener

A demo URL shortener that stores an auto-incremented integer ID against the full URL in PostgreSQL. When a short URL is visited, the ID is decoded and used to look up the original URL, which is then returned as a redirect.

## How it works

- A new URL is stored in Postgres and assigned an auto-incremented integer ID.
- That ID is encoded to a base62 string (standard alphabet: `0-9, a-z, A-Z`) to form the short code returned to the user.
- The short code is **not persisted** — it is re-derived on every lookup by decoding the base62 string back to the integer ID and querying the database. This saves storage space by avoiding a redundant column.

## Limitations

- **No authentication** — any caller can create a short URL; there is no concept of users or ownership.
- **Codes are immutable** — once a short code is issued it cannot be updated or deleted. The `update` and `delete` methods exist in the repository layer but are not exposed by any route, making codes permanent by design.
- **Locked into base62** — because the short code is never stored, the encoding scheme cannot be changed after URLs have been issued. Any change would silently break all existing short links.
- This project is intended for **demo purposes only** and is not production-ready.

## Stack

- Node.js / TypeScript
- PostgreSQL (via Prisma ORM)

