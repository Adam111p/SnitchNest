#!/bin/bash


URL="http://localhost:3000/log-event"
ITERATIONS=50 
levels=("DEBUG" "INFO" "WARN" "ERROR" "FATAL")
services=("auth-api" "payment-mw" "order-db-sync" "frontend-ssr" "redis-cache")

echo "Rozpoczynam generowanie $ITERATIONS losowych logów..."
echo "Tak wiem  pewnie mógłbym użyć prisma"
for ((i=1; i<=ITERATIONS; i++))
do

  LEVEL=${levels[$RANDOM % ${#levels[@]}]}
  SERVICE=${services[$RANDOM % ${#services[@]}]}

  DAY=$((RANDOM % 18 + 10))
  HOUR=$((RANDOM % 10 + 10))
  MIN=$((RANDOM % 50 + 10))
  GENERIC_DATE="2025-04-${DAY}T${HOUR}:${MIN}:00Z"


  POD_ID=$((RANDOM % 9000 + 1000))


  curl --location "$URL" \
  --header 'Content-Type: application/json' \
  --data "{
    \"message\": \"Automated test message nr $i: Unexpected behavior in $SERVICE module\",
    \"serviceName\": \"$SERVICE\",
    \"level\": \"$LEVEL\",
    \"podName\": \"$SERVICE-pod-$POD_ID\",
    \"createdAt\": \"$GENERIC_DATE\"
  }" \
  --silent --output /dev/null

  if (( i % 10 == 0 )); then echo "Wysłano $i logów..."; fi
done

echo "Gotowe! Baza została zasilona danymi."