# docker-practice.md

## ⭐ 1. Definition of Docker
Docker is a platform that lets you pack an application and everything it needs (dependencies, libraries, environment) into a lightweight box called a container and run it anywhere.

Basically:
> "If it runs on your laptop, it will run on any server exactly the same."

---

## ⭐ 2. Simple Example (Maggie Style)
Imagine making Maggie.

Normally:
- You need stove, pan, water, masala, noodles, etc.
- Friend’s home may not have a pan or stove.

Docker container = a box that already has everything inside it.  
Pan ✔ Stove ✔ Water ✔ Masala ✔ Noodles ✔

No matter where you take it — home, hostel, Himalayas —  
you get the same Maggie every time.

---

## ⭐ 3. Docker Life Cycle
1. Create Image  
2. Run Container  
3. Use Container  
4. Stop Container  
5. Start Container  
6. Remove Container  
7. Remove Image  

---

## ⭐ 4. Docker Commands (with usage + examples)

# IMAGES COMMANDS

### 1. List all local images
```
docker images
```

### 2. Delete an image
```
docker rmi nginx
```

### 3. Remove unused images
```
docker image prune
```

### 4. Build a new image
```
docker build -t myapp:v1 .
```

---

# CONTAINER COMMANDS

### 5. List all containers
```
docker ps -a
```

### 6. List running containers
```
docker ps
```

### 7. Run container
```
docker run nginx
```

### 8. Run in background
```
docker run -d nginx
```

### 9. Run with name
```
docker run --name mynginx nginx
```

### 10. Port binding
```
docker run -p 8080:80 nginx
```

### 11. Environment variable
```
docker run -e USER=uday ubuntu
```

### 12. Start / Stop
```
docker start mynginx
docker stop mynginx
```

### 13. Inspect container
```
docker inspect mynginx
```

### 14. Delete container
```
docker rm mynginx
```

---

# TROUBLESHOOTING

### 15. Logs
```
docker logs mynginx
```

### 16. Exec shell
```
docker exec -it mynginx /bin/bash
```

---

# DOCKER HUB

### 17. Pull image
```
docker pull nginx
```

### 18. Push image
```
docker push username/myapp
```

### 19. Login
```
docker login
```

### 20. Search images
```
docker search redis
```

---

# VOLUMES

### 21. List volumes
```
docker volume ls
```

### 22. Create volume
```
docker volume create myvol
```

### 23. Remove volume
```
docker volume rm myvol
```

### 24. Mount named volume
```
docker run --volume myvol:/data nginx
```

### 25. Bind mount
```
docker run --volume C:/myfolder:/data
```

### 26. Prune volumes
```
docker volume prune
```

---

# NETWORK COMMANDS

### 27. List networks
```
docker network ls
```

### 28. Create network
```
docker network create mynet
```

### 29. Remove network
```
docker network rm mynet
```

### 30. Prune networks
```
docker network prune
```

---

# Advantages of Docker
- Fast  
- Lightweight  
- Portable  
- Easy deployments  
- Efficient resource usage  
- Better isolation  
- Great for microservices  

---

# Disadvantages
- Learning curve  
- Troubleshooting can be tricky  
- Heavy GUI apps not ideal  
- Networking is complex  
- Data not permanent without volumes  

---

# Real-Life Applications
- Servers (Nginx, Apache)
- Microservices
- ML model deployment
- Databases
- CI/CD
- Local development
- Multi-app hosting

---

# Docker vs VM

## VM = full house  
Heavy, slow, independent OS.

## Docker = mini kitchen kit  
Lightweight, fast, uses host OS.

IRL:
- VM: Build entire house to make Maggie.
- Docker: Bring a portable mini-kitchen.

