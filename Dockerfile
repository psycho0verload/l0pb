# Author: Jonathan Starck (jonathan@starck.info)
# Dockerfile (c) 2024
# Desc: description
# Created:  2024-06-05T07:01:31.465Z
# Modified: 2024-06-06T09:40:05.105Z
ARG traefik=beaufort
FROM traefik:$traefik

# Install curl if not available
RUN apk update && apk add --no-cache curl

# Copy configuration files
COPY /config/traefik/local/traefik.yml /traefik.yml
COPY /config/traefik/local/dynamic_conf.yml /dynamic_conf.yml

# Create the /certs directory
RUN mkdir -p /etc/certs

# Download certificates
RUN curl -o /etc/certs/me-cert.pem https://l0pb.me/certs/l0pb.me/cert.pem
RUN curl -o /etc/certs/me-key.pem https://l0pb.me/certs/l0pb.me/key.pem

RUN curl -o /etc/certs/dev-cert.pem https://l0pb.dev/certs/l0pb.dev/cert.pem
RUN curl -o /etc/certs/dev-key.pem https://l0pb.dev/certs/l0pb.dev/key.pem