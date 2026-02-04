FROM ubuntu:20.04
RUN apt update && apt upgrade -y
RUN apt install -y python3 python3-pip
WORKDIR /app
COPY app.py .
CMD ["python3", "app.py"]
