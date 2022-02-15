<p align="center">
  <img src="https://avatars.githubusercontent.com/u/68288528?s=200&v=4" alt="Loomi" width="80" />
</p>

<h1 align="center">Node Leap</h1>

<p align="center">
  Node Leap is a node boilerplate that follows best practicles of software design and agile
</p>

### Userful links

## Requeriments
- Docker and Docker compose

## 💻 Running

### Local

**`(nano | vi | vim| nvim ) .env`**
> Create .env follow the env/.env.local.example

**`npm ci`**
> Install js dependencies

**`npx husky prepare`**
> Add husky scripts

**`sudo docker-compose --profile local up -d`**
> Run docker with profile local

**`npm run start:dev`**

**`npm run start:dev`**
> Access http://localhost:{ENV.PORT} to see the swagger documentation

### Development

**`(nano | vi | vim| nvim ) .env`**
> Create .env follow the env/.env.dev.example

**`sudo docker-compose --profile dev up -d && sudo docker-compose logs -f`**
> Run docker with profile dev
> Access http://localhost:{ENV.PORT} to see the swagger documentation

### Production

**`(nano | vi | vim| nvim ) .env`**
> Create .env follow the env/.env.prod.example

**`sudo docker-compose --profile prod up -d && sudo docker-compose logs -f`**
> Run docker with profile prod
> Access http://localhost:{ENV.PORT} to see the swagger documentation

### Generate new domain for entity
**`npm run plop`**
> To generate files in domains
> Type the entity name (ex: TesteRatinho, Batata, AuthUser)

**`npm run prisma:migration 'add-{name of Entity}-table'`**
> To create a migration and update the prisma client

> Add your entity paths to `/src/main/infra/swagger/index.ts`
> Add your entity routes to `/src/main/infra/express/routes.ts`

## 💻 Testing

### UNIT

> Don't need of the project run to test!

**`npm run test:unit`**
> To run tests in time of development with hot-reload

**`npm run test:ci`**
> To run all tests of the project and generate coverage

## ☁️ Deploying

`TODO: describe cloud stack and deploy procedures`

#
Made with ❤️ by **Loomi**
