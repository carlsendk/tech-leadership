# Testing Plan

This project lacks automated tests. To ensure reliable deployments, we will introduce both unit and integration tests.

## Frameworks

- **Vitest** for unit testing the utilities and components.
- **Playwright** for end-to-end testing.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the test suite locally:
   ```bash
   npm test
   ```

## Continuous Integration

A GitHub Actions workflow runs `npm test` on every push and pull request. Local commits trigger the same command via a Husky pre-commit hook to prevent committing broken code.


