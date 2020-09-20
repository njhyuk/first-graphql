## Description

```graphql
query reserveStatus {
  getReservesByWeek {
    id
    startedAt
    endedAt
    user {
      name
      team
    }
    room {
      name
      size
    }
  }

  getEmptyRooms(
    startedAt: "2019-10-30T02:04:00.000Z"
    endedAt: "2019-10-30T02:05:00.000Z"
  ) {
    name
    size
  }
}

mutation create {
  createReserve(
    reserve: {
      userId: 1
      roomId: 2
      startedAt: "2019-10-30T02:04:00.000Z"
      endedAt: "2019-10-30T02:05:00.000Z"
    }
  ) {
    id
    startedAt
    endedAt
    user {
      name
      team
    }
    room {
      name
      size
    }
  }
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
