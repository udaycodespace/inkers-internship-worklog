FROM ubuntu:22.04
# Install SSH server
RUN apt-get update && \
    apt-get install -y openssh-server && \
    mkdir /var/run/sshd
# Create user and set password
RUN useradd -m dockeruser && \
    echo "dockeruser:password123" | chpasswd
# Allow password authentication
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
# Expose SSH port
EXPOSE 22
# Start SSH service
CMD ["/usr/sbin/sshd", "-D"]
