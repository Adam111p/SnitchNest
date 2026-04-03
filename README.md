# The Snitch

## Założenia technologiczne

- wybór bazy danych postgreSQL 

> 1.  Stwórz bazę danych
>     
>     ```sql
>     CREATE DATABASE snitch_db;
>     ```
>     
> 2.  Stwórz użytkownika
>     
>     ```sql
>     CREATE USER snitch_user WITH PASSWORD '5u4er_102_5EC6ET_pass!';
>     ```
>     
> 3.  Nadaj uprawnienia właściciela do bazy
>     
>     ```sql
>     GRANT ALL PRIVILEGES ON DATABASE snitch_db TO snitch_user;
>     ```
>     
> 4.  Nadaj uprawnienia do schematu public
>     
>     ```sql
>     \c snitch_db
>     ALTER SCHEMA public OWNER TO snitch_user;
>     ALTER USER snitch_user CREATEDB;
>     ```
>     

Dodałem do backendu skrypt żeby zasilić bazę  initBase.sh. Dzieki temu e to skrypt można zaszaleć z ilością i sprawdzić wydajność.  
Oczywiście zadziała z postawionym backendem i skonfigurowaną bazą jw.

Starałem się nie wymyślać koła na nowo i użyłem raczej topowych rozwiązań.

Prisma ułatwi utrzymanie struktury danych przy rozwijaniu, oczywiście ma sporo innych zalet.   
<br/>

Nie w powerShellu z powodów religijnych ;)    
<br/><br/><br/>