ruokakauppacom-tsoha
====================

Tsoha-implementaatio ruokakauppacomista Sqlite3:ella.

# Riippuvaisuudet
* Node.js
* Sqlite3

# Ohjeet
Palvelin käyttää pääasiallisesti DBPATH, PORT, ja NODE_ENV -ympäristömuuttujia. DBPATH on pakollinen, jolla annetaan Nodelle polku tietokantaan (suositeltu sijainti kansiossa **/db**)
Suorita seuraavasti:

```
git clone https://github.com/narck/ruokakauppacom-tsoha
cd ruokakauppacom-tsoha/
npm install
bower install
grunt build
cd dist/
DBPATH=<path-to-db> PORT=80 NODE_ENV=production node server.js
```

Vastaavasti jos haluat vain testata appia, aja
```
npm install
bower install
DBPATH=<path-to-db> grunt serve
```