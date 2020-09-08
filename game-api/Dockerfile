FROM node:12.18.3-alpine3.12
ENV NODE_ENV production
ENV SOURCE_DIR /usr/app/dist
ENV NODE_MODULES_DIR /usr/app/node_modules


RUN mkdir -p SOURCE_DIR \
  && mkdir -p NODE_MODULES_DIR

WORKDIR ${SOURCE_DIR}

COPY ./dist/ $SOURCE_DIR/
COPY ./node_modules/ $NODE_MODULES_DIR/

CMD ["node", "main.js"]
