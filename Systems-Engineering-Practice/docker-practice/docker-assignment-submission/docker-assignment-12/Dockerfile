FROM nginx:latest
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD curl -f http://localhost || exit 1
