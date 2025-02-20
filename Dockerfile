ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-bookworm

ARG PNPM_VERSION=10.4.0
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

RUN chown -R node:node /app

USER node

ENV PNPM_HOME /home/node/.local/share/pnpm
ENV PATH /app/node_modules/.bin:$PNPM_HOME:$PATH

ARG NESTJS_VERSION=11.0.2
RUN pnpm add -g "@nestjs/cli@^${NESTJS_VERSION}"
