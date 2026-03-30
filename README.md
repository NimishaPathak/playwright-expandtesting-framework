![Playwright Tests](https://github.com/NimishaPathak/playwright-expandtesting-framework/actions/workflows/playwright.yml/badge.svg)

# Playwright Automation Framework — expandtesting.com

A test automation framework built with Playwright and JavaScript,
following the Page Object Model design pattern.

## Tech Stack
- Playwright
- JavaScript (ES Modules)
- Page Object Model (POM)
- Custom Fixtures
- dotenv config management

## Setup
1. Clone the repo
2. Run `npm install`
3. Copy `configs/dev.env.example` to `configs/dev.env`
4. Fill in your credentials
5. Run `npx playwright test`

## Project Structure
tests/ui/         → UI test suites
pages/            → Page Object classes
pages/Components/ → Reusable page components
fixtures/         → Custom Playwright fixtures
configs/          → Environment configuration
test-data/        → JSON test data files

## Test Suites
### UI Tests
| Suite | Scenarios |
|-------|-----------|
| Login | Valid login, Invalid username, Invalid password, Empty fields |

### API Tests
- Coming soon