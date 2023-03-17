# Branch: main

### Provide a command that will create a docker network
```
docker network create mysql
```

### Provide a command that will run a mysql:latest docker image with the name of db with a root password=my-secret-password
```
docker run \
    --network mysql \
    -e MYSQL_ROOT_PASSWORD=my-secret-password \
    --name mysql \
    -d mysql
```

### Provide a command that will run the docker image phpmyadmin/phpmyadmin on the network previously created mapping a port of your choice to port 80 of the container
```
docker run \
    --network mysql \
    -p 83.212.126.251:8080:80 \
    -e PMA_HOST=mysql \
    -d phpmyadmin/phpmyadmin
```
