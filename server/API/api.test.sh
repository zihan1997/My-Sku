#!/usr/bin/env bash
echo "test api vis curl"

echo " "
echo "test 1"
curl --location --request POST 'localhost:3001/api/register' \
     --header 'Content-Type: application/json' \
     --data-raw '{
         "username": "testShell",
         "password": "test"
     }'

# body from above
# {"username":"testShell",
# "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RTaGVsbCIsImlhdCI6MTY1NTI4MjUzNSwiZXhwIjoxNjU1MjgzMTM1fQ.vkoRJvNDWO_12Q5_fGaz1ZXJ7Rlo0fY5wT0yPA6s1n0"}
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RTaGVsbCIsImlhdCI6MTY1NTI4NTUwNSwiZXhwIjoxNjU1Mjg2MTA1fQ.aQo1R7TiWCGeSRdpfBig6uckKMqpTO3Nx8I5tGitExo

sleep 1

echo " "
echo " "
echo "test login (which can be used to refresh token"
curl --location --request POST 'localhost:3001/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "testShell",
    "password": "test"
}'

sleep 1

#
echo " "
echo " "
echo "test GET /products"
curl --location --request GET 'localhost:3001/api/products' \
--header "Authorization: Bearer $token" \
--data-raw ''

sleep 1

#
echo " "
echo " "
echo "GET /products/id/:id"
curl --location --request GET 'localhost:3001/api/products/id/62a40ad1c876285a6481e82c' \
--header "Authorization: Bearer $token"

sleep 1

#
echo " "
echo " "
echo "GET by code"
curl --location --request GET 'localhost:3001/api/products/code/125' \
--header "Authorization: Bearer $token"

sleep 1

echo " "
echo " "
echo "create new Product"
curl --location --request POST 'localhost:3001/api/products' \
--header "Authorization: Bearer $token" \
--header 'Content-Type: application/json' \
--data-raw '{
    "code": 114,
    "name": "Postman test",
    "quantity": 1,
    "price": 2,
    "date": "2022-05-12T16:00:00.000Z"
}'
sleep 1
#
echo " "
echo " "
echo "update the product"
curl --location --request PATCH 'localhost:3001/api/products/code/114' \
--header "Authorization: Bearer $token" \
--header 'Content-Type: application/json' \
--data-raw '{
    "code": 114,
    "name": "Postman update",
    "quantity": 3,
    "price": 10,
    "date": "2022-06-15T16:00:00.000Z"
}'

sleep 1

echo " "
echo " "
echo "delete the product"
curl --location --request DELETE 'localhost:3001/api/products/code/114' \
--header "Authorization: Bearer $token"