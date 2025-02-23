#!/bin/bash
# Wait for MongoDB to start up
echo "Waiting for MongoDB to start..."
until mongosh --eval "print('waiting for connection')" &>/dev/null; do
  sleep 1
done

echo "MongoDB started successfully."

mongosh <<EOF
use admin

# Create the root user (if it doesn't already exist)
db.createUser({
  user: "${MONGO_ROOT_USER}",
  pwd: "${MONGO_ROOT_PASSWORD}",
  roles: [{ role: "root", db: "admin" },
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }]
});

db = db.getSiblingDB('radar_app')
db.createCollection('users')
db.createCollection('technologies')
# Create the backend user with privileges
use radar_app
db.createUser({
  user: "${MONGO_BACKEND_USER}",
  pwd: "${MONGO_BACKEND_PASSWORD}",
  roles: [{ role: "readWrite", db: "radar_app" }]
})
EOF
# import default data
mongoimport --db radar_app --collection users --file /app/users.json;
mongoimport --db radar_app --collection technologies --file /app/technologies.json;