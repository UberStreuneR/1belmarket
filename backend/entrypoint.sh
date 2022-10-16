#!/bin/sh

[ -z $DB_HOST ] && DB_HOST="database"
[ -z $DB_PORT ] && DB_PORT="5432"

echo "Waiting for PostgreSQL..."
while ! nc -z $DB_HOST $DB_PORT; do
    sleep 0.1
done
echo "PostgreSQL started"

echo -e "\nMakemigrations...\n"
python manage.py makemigrations --noinput

echo -e "\nMigrate...\n"
python manage.py migrate --noinput

if [[ -n "$SUPERUSER_EMAIL" ]]; then
    echo -e "\nInitialization with test data...\n"
    python manage.py shell < init_script.py
fi

exec "$@"