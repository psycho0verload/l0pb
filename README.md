<!--
Author: Jonathan Starck (jonathan@starck.info)
README.md (c) 2024
Desc: description
Created:  2024-06-07T15:29:50.092Z
Modified: 2024-06-07T19:44:12.707Z
-->
<details>
<summary>README (deutsch)</summary>

# L0pb - Loopback für deine lokale Entwicklung!

Willkommen zum L0pb-Projekt! L0pb bietet eine einfache Möglichkeit, eine Loopback-Verbindung zu deinem Localhost zu erstellen. Diese README erklärt den Sinn und Nutzen des Projekts und verweist auf die dazugehörige Webseite [l0pb.me](https://l0pb.me).

## Warum L0pb?

L0pb.me ist ein Service, der eine Loopback-Verbindung zu Localhost ermöglicht. Alle `*.l0pb.dev` und `*.l0pb.me`-Domains verweisen grundsätzlich auf `127.0.0.1`, den `localhost`. Dies ist ähnlich wie bei Diensten wie traefik.me oder nip.io. Dadurch wird die lokale Entwicklung, einschließlich der Verwendung von Zertifikaten, erheblich vereinfacht.

### Vorteile von L0pb:

- **Einfache Einrichtung**: Keine komplexe Konfiguration erforderlich.
- **HTTPS-Unterstützung**: Dank Let’s Encrypt ist ein Wildcard-Zertifikat für `*.l0pb.dev` und `*.l0pb.me` verfügbar.
- **Flexibel und Sicher**: Traefik als Reverse Proxy für die Verwaltung von mehreren Projekten gleichzeitig.

## Lokale Entwicklung

L0pb ist für die einfache lokale Entwicklung konzipiert. Es wird lediglich das l0pb-traefik Image benötigt, ein angepasstes und vorkonfiguriertes Traefik-Image. 

### Beispielkonfiguration

Hier ist ein Beispiel, wie du L0pb lokal nutzen kannst:

```yaml
services:
  traefik:
    container_name: l0pb-traefik
    hostname: l0pb-traefik
    image: psycho0verload/l0pb-traefik
    labels:
      traefik.docker.network: proxy
      traefik.enable: "true"
      traefik.http.routers.traefik.entrypoints: websecure
      traefik.http.routers.traefik.rule: Host(`traefik.l0pb.me`) || Host(`traefik.l0pb.dev`)
      traefik.http.routers.traefik.service: api@internal
      traefik.http.routers.traefik.tls: "true"
      traefik.http.services.traefik.loadbalancer.sticky.cookie.httpOnly: "true"
      traefik.http.services.traefik.loadbalancer.sticky.cookie.secure: "true"
    networks:
      proxy:
        ipv4_address: 172.30.255.254
    ports:
      - mode: host
        target: 80
        published: "80"
        protocol: tcp
      - mode: host
        target: 443
        published: "443"
        protocol: tcp
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./log/traefik/:/var/log/traefik/
  mailhog:
    image: mailhog/mailhog
    hostname: l0pb-mailhog
    container_name: l0pb-mailhog
    restart: unless-stopped
    labels:
      traefik.docker.network: proxy
      traefik.enable: "true"
      traefik.http.routers.mailhog.entrypoints: websecure
      traefik.http.routers.mailhog.rule: Host(`mailhog.l0pb.me`) || Host(`mailhog.l0pb.dev`)
      traefik.http.routers.mailhog.tls: "true"
      traefik.http.routers.mailhog.service: mailhog
      traefik.http.services.mailhog.loadbalancer.server.port: "8025"
    networks:
      proxy:
networks:
  proxy:
    name: proxy
    driver: bridge
    ipam:
      config:
      - subnet: 172.30.0.0/16
    attachable: true
```

Speichere die `docker-compose.yml` Datei in einem Verzeichnis und starte sie mit dem Befehl:

```bash
docker compose up -d
```

Überprüfe, ob das Projekt funktioniert, indem du die URLs [https://traefik.l0pb.dev](https://traefik.l0pb.dev) oder [https://traefik.l0pb.me](https://traefik.l0pb.me) aufrufst.

## Weitere Informationen

Besuche [l0pb.me](https://l0pb.me) für mehr Details und die vollständige Dokumentation.

</details>
<details>
<summary>README (english)</summary>

# L0pb - Loopback for Your Local Development!

Welcome to the L0pb project! L0pb offers a simple way to create a loopback connection to your localhost. This README explains the purpose and benefits of the project and refers to the corresponding website [l0pb.me](https://l0pb.me).

## Why L0pb?

L0pb.me is a service that enables a loopback connection to localhost. All `*.l0pb.dev` and `*.l0pb.me` domains fundamentally point to `127.0.0.1`, the `localhost`. This is similar to services like traefik.me or nip.io. This greatly simplifies local development, including the use of certificates.

### Advantages of L0pb:

- **Easy Setup**: No complex configuration required.
- **HTTPS Support**: A wildcard certificate for `*.l0pb.dev` and `*.l0pb.me` is available thanks to Let’s Encrypt.
- **Flexible and Secure**: Traefik as a reverse proxy for managing multiple projects simultaneously.

## Local Development

L0pb is designed for simple local development. All you need is the l0pb-traefik image, a customized and preconfigured Traefik image.

### Example Configuration

Here's an example of how you can use L0pb locally:

```yaml
services:
  traefik:
    container_name: l0pb-traefik
    hostname: l0pb-traefik
    image: psycho0verload/l0pb-traefik
    labels:
      traefik.docker.network: proxy
      traefik.enable: "true"
      traefik.http.routers.traefik.entrypoints: websecure
      traefik.http.routers.traefik.rule: Host(`traefik.l0pb.me`) || Host(`traefik.l0pb.dev`)
      traefik.http.routers.traefik.service: api@internal
      traefik.http.routers.traefik.tls: "true"
      traefik.http.services.traefik.loadbalancer.sticky.cookie.httpOnly: "true"
      traefik.http.services.traefik.loadbalancer.sticky.cookie.secure: "true"
    networks:
      proxy:
        ipv4_address: 172.30.255.254
    ports:
      - mode: host
        target: 80
        published: "80"
        protocol: tcp
      - mode: host
        target: 443
        published: "443"
        protocol: tcp
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./log/traefik/:/var/log/traefik/
  mailhog:
    image: mailhog/mailhog
    hostname: l0pb-mailhog
    container_name: l0pb-mailhog
    restart: unless-stopped
    labels:
      traefik.docker.network: proxy
      traefik.enable: "true"
      traefik.http.routers.mailhog.entrypoints: websecure
      traefik.http.routers.mailhog.rule: Host(`mailhog.l0pb.me`) || Host(`mailhog.l0pb.dev`)
      traefik.http.routers.mailhog.tls: "true"
      traefik.http.routers.mailhog.service: mailhog
      traefik.http.services.mailhog.loadbalancer.server.port: "8025"
    networks:
      proxy:
networks:
  proxy:
    name: proxy
    driver: bridge
    ipam:
      config:
      - subnet: 172.30.0.0/16
    attachable: true
```

Save the `docker-compose.yml` file in a directory and start it with the command:

```bash
docker compose up -d
```

Check if the project is working by visiting [https://traefik.l0pb.dev](https://traefik.l0pb.dev) or [https://traefik.l0pb.me](https://traefik.l0pb.me).

## More Information


Visit [l0pb.me](https://l0pb.me) for more details and the full documentation.
</details>
