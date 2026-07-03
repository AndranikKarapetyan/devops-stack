# DevOps Stack

Démo d'orchestration multi-conteneurs : frontend statique servi par Nginx, API Node.js, base PostgreSQL. CI GitHub Actions qui build les images à chaque push.

## Architecture

```
Client → Nginx (:8080) ─┬─ / (frontend statique)
                         └─ /api/* → API Node.js (:3000) → PostgreSQL (:5432)
```

## Stack

- Nginx (reverse proxy + fichiers statiques)
- Node.js / Express (API tasks)
- PostgreSQL
- Docker Compose (orchestration)
- GitHub Actions (CI : build des images + validation du compose)

## Lancer le projet

```bash
docker compose up --build
```

App disponible sur `http://localhost:8080`.

## Pourquoi ce projet

Complète les projets `task-api` (API + auth + BDD) et `habit-tracker` (front) en montrant la partie orchestration/déploiement : reverse proxy, réseau inter-conteneurs, healthchecks, pipeline CI.
