# Typescript Project Starter


- [Typescript Project Starter](#typescript-project-starter)
	- [Prerequisites](#prerequisites)
	- [Building](#building)
		- [Removing all build artifacts](#removing-all-build-artifacts)
	- [Running the tests and linting](#running-the-tests-and-linting)
	- [Running your project for local dev](#running-your-project-for-local-dev)
	- [API](#api)

## Prerequisites

Make sure you have [yarn](https://yarnpkg.com/getting-started/install) installed.
You also need automake install (`brew install make` should do the trick on Mac OS).

**Note** this only supports Yarn v1 (classic) presently.

## Building

``` shell
make
```

To just type check your code

``` shell
make check-types
```

### Removing all build artifacts

``` shell
make clean
```

## Running the tests and linting

``` shell
make test
make lint
```

## Running your project for local dev

``` shell
yarn start:dev
```

## API

| Verb | Path | Description |
| --- | ----------- | -------- |
| `POST` | `/v1/reviews` | Create a new Book review  |
| `PUT` | `/v1/reviews/{id}` | Update an existing Book review |
| `DELETE` | `/v1/reviews/{id}` | Remove an existing Book review |
| `GET` | `/v1/reviews/{id}`  | Retrieve a Book review by id |
| `GET` | `/v1/reviews`  | Retrieve all Book reviews |
