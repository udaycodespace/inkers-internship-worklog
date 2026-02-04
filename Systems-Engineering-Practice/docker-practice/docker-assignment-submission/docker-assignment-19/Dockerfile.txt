# ---------- BUILD ARGS (before FROM) ----------
ARG BASE_IMAGE=python:3.11-slim

# ---------- BASE IMAGE ----------
FROM ${BASE_IMAGE}

# ---------- RE-DECLARE ARGS (after FROM) ----------
ARG BASE_IMAGE
ARG APP_VERSION=1.0.0
ARG APP_ENV=development

# ---------- METADATA ----------
LABEL version=${APP_VERSION}
LABEL environment=${APP_ENV}

# ---------- APP ----------
WORKDIR /app

RUN echo "App Version: ${APP_VERSION}" > app.txt \
 && echo "Environment: ${APP_ENV}" >> app.txt \
 && echo "Base Image: ${BASE_IMAGE}" >> app.txt

CMD ["cat", "app.txt"]
