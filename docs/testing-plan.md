# Testing Plan

This project now includes a growing automated test suite to ensure reliable deployments.
Unit tests cover URL helpers and custom markdown plugins, while end-to-end tests are planned for the future.

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

### Existing Tests

- URL helper utilities (`tests/url.test.ts`)
- Markdown plugin for Mermaid diagrams (`tests/add-mermaid-class.test.ts`)

## Continuous Integration

A GitHub Actions workflow runs `npm test` on every push and pull request. Local commits trigger the same command via a Husky pre-commit hook to prevent committing broken code.


