# Testing Plan

This project uses **Vitest** for unit tests and **Playwright** for end-to-end testing.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. After cloning, enable Husky hooks:
   ```bash
   npm run prepare
   ```

## Running Tests

Execute all tests with:

```bash
npm test
```

## Continuous Integration

GitHub Actions run `npm test` on every push and pull request via `.github/workflows/test.yml`.

Future improvements may include additional Playwright tests and coverage reporting.
