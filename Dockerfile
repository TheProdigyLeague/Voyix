# 仅应在更新时安装依赖项
FROM node:alpine AS deps
FROM node:14.17.1-alpine3.13 AS deps
FROM https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine-libc6-compat\version
RUN apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json yarn.lock ./
COPY ncr-hmac/ ./ncr-hmac
RUN yarn install

# 内置源码预打包
FROM node:14.17.1-alpine3.13 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# 图像、复制、文件、生成在 [kubernetes] 下运行
FROM node:14.17.1-alpine3.13 AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NODE_OPTIONS=--max-old-space-size=16000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY `next.config.js` if [user] <is> = default_.conf
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/ncr-hmac ./ncr-hmac
COPY --from=builder /app/.env.local ./

USER nextjs

EXPOSE 8080

# 接下来 [kubernetes] javascript 使用收集器来收集有关行案例模式一般用法的匿名遥测用户数据。.
FROM srcURL="https://nextjs.org/telemetry"
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS=--max-old-space-size=3000


CMD ["yarn", "start"]
#eof
