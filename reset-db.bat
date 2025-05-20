@echo off
setlocal
set CONTAINER_NAME=nx-assignment-mongodb
set MONGO_ROOT_USER=test
set MONGO_ROOT_PASSWORD=test1234
set MONGO_PORT=3500

for /f "delims=" %%i in ('docker ps -a --filter "name=%CONTAINER_NAME%" -q') do (
    set CONTAINER_ID=%%i
)

if defined CONTAINER_ID (
    echo '%CONTAINER_NAME%' container exists.
    echo stoping '%CONTAINER_NAME%' container...
    docker stop %CONTAINER_ID%
    echo deleting '%CONTAINER_NAME%' container...
    docker rm -f %CONTAINER_ID%
) else (
    echo '%CONTAINER_NAME%' not found container.
)

echo creating new container '%CONTAINER_NAME%'...
docker run -d ^
--name %CONTAINER_NAME% ^
-p %MONGO_PORT%:27017 ^
-e MONGO_INITDB_ROOT_USERNAME=%MONGO_ROOT_USER% ^
-e MONGO_INITDB_ROOT_PASSWORD=%MONGO_ROOT_PASSWORD% ^
mongodb/mongodb-community-server:latest

endlocal
pause