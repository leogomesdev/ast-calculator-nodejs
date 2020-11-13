# Calculator
A calculator (console application) built with Node.js

## Description
This applications allows the user to input verbal math expressions and get the results.

Available operators:
- plus
- minus
- into
- times
- divided

Samples:

|       Input       | Result |
|:-----------------:|:------:|
| 1 plus 3 minus 4  | 0      |
| 1 plus (3 into 4) | 13     |
| 1 plus 1          | 2      |
| 1000 minus 1      | 999    |
| 3 into 4          | 12     |
| 4 times 4         | 16     |
| 20 divided 5      | 4      |

## Main technologies used

- [Node.js](https://nodejs.org/en): JavaScript runtime built on Chrome's V8 engine
- [TypeScript](https://www.typescriptlang.org): Typed JavaScript at Any Scale
- [Jest](https://jestjs.io) for unit tests
- [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to enforce code styling
- [Husky](https://github.com/typicode/husky) to force syntax checking before commits

## Requirements

### For local usage:

- [Node.js](https://nodejs.org) (v14+)
- [npm](https://www.npmjs.com)

### For local usage with Docker:

- [Docker Engine](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)

## Running

### With Docker

- Be sure you have [Docker](https://docs.docker.com/get-docker) and [docker-compose](https://docs.docker.com/compose) installed.
- Run:

```bash
docker-compose up
```

```bash
docker exec -it calculator bash
```

### Without Docker

Be sure to install the [requirements](#requirements).
If using [nvm](github.com/nvm-sh/nvm), you can easily run:
  ```bash
  $ nvm use
  ```

- Install dependencies and start the application:
  ```bash
  $ npm install

  # development
  $ npm run start:dev
  ```

## Running unit tests

```bash
   npm run test
```