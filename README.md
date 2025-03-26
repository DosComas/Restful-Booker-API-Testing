# Restful Booker API Testing

This project is an API test automation suite for the Restful Booker API, built using **Mocha**, **Chai**, and **Supertest**. It allows automated testing of endpoints such as booking creation, retrieval, updates, and deletions.

The suite generates detailed HTML reports using **Mochawesome** and integrates environment-based configuration via **dotenv** to manage user login data.

# Setup Instructions

## Prerequisites
- Node.js (>= 16.x)
- NPM (comes with Node.js)

## 1. Install Dependencies

Run the following command to install all required packages:

```
npm install
```

## 2. Configure Environment Variables

Rename `.env.example` to `.env` and update values as needed.

Alternatively, manually set the API key:

```
set VALID_USER=your-username
set VALID_PASS=your-password
```

## 3. Run Tests

To execute tests, use:

```
npm test
```


## 4. View Reports

To view the results, open the following file in your browser:

```
test-results/mochawesome.html
```

# Dependencies

- `mocha` - Test framework

- `chai` - Assertion library

- `supertest` - HTTP assertions

- `mochawesome` - HTML and JSON reporting

- `@faker-js/faker` - Fake data generator

- `dotenv` - Environment variable management