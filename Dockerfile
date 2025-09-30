FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5001

RUN npm run swagger:generate

CMD npx prisma migrate deploy && npx prisma db seed && npm start
