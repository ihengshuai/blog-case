FROM node:18.19.0-alpine3.19

WORKDIR /app

# 直接从ci打包阶段拿到产物
COPY dist dist
COPY node_modules node_modules
COPY ecosystem.config.js ecosystem.config.js


RUN npm install pm2 -g --registry=https://registry.npmmirror.com/

ENTRYPOINT ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
