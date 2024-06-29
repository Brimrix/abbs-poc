ARG PYTHON_IMAGE=python:3.12.4-slim-bookworm
ARG NODE_IMAGE=node:22-bookworm-slim


FROM ${NODE_IMAGE} as dashboard
COPY . .
RUN npm install \
    && npm run build


FROM ${PYTHON_IMAGE} as builder

WORKDIR /app
COPY . .
COPY --from=dashboard /dist /app/dist

RUN apt-get update \
    && apt upgrade \
    && apt-get install curl -y

RUN curl -sSL https://pdm-project.org/install-pdm.py | python -
ENV PATH=/root/.local/bin:$PATH

RUN pdm sync --prod
ENV PATH=/app/.venv/bin:$PATH

RUN pdm run manage.py migrate \
    && pdm run manage.py collectstatic


FROM ${PYTHON_IMAGE} as production

WORKDIR /app
COPY --from=builder /app/ /app
COPY --from=dashboard /dist /app/dist/
ENV PATH=/app/.venv/bin:$PATH


FROM builder as testing
RUN pdm install -d -G test \
    && pdm run manage.py generate
