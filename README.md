# Playwright Automation Framework — expandtesting.com

![Playwright Tests](https://github.com/NimishaPathak/playwright-expandtesting-framework/actions/workflows/playwright.yml/badge.svg)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Framework: Playwright](https://img.shields.io/badge/Framework-Playwright-2EAD33)](https://playwright.dev/)

A robust, enterprise-ready test automation framework built with **Playwright** and **JavaScript**, designed to test both UI and API functionalities of [expandtesting.com](https://practice.expandtesting.com/).

---

## 🚀 Key Features

- **Page Object Model (POM)**: Organized and maintainable structure using a centralized `POManager`.
- **Custom Fixtures**: Extended Playwright fixtures to automatically inject page objects and block tracking/ads for faster execution.
- **Dual Testing Support**: Complete coverage for both **UI** and **API** endpoints.
- **Environment Management**: Robust configuration using `dotenv` and `zod` for type-safe environment variables.
- **Advanced Reporting**: Rich, interactive reports using **Allure** and standard Playwright HTML reporters.
- **CI/CD Integrated**: Ready-to-use GitHub Actions workflow for automated testing on every push.
- **Code Quality**: Built-in **ESLint** and **Prettier** for consistent code style and bug prevention.

---

## 🛠️ Tech Stack

- **Engine**: [Playwright](https://playwright.dev/)
- **Language**: JavaScript (ES Modules)
- **Reporting**: [Allure Playwright](https://github.com/allure-framework/allure-js), HTML Reporter
- **Validation**: [Zod](https://zod.dev/) (Environment Schema)
- **Linting/Formatting**: ESLint, Prettier
- **CI/CD**: GitHub Actions

---

## 📂 Project Structure

```text
.
├── .github/workflows/       # CI/CD pipelines
├── configs/                 # Environment configurations (.env files)
├── fixtures/                # Custom Playwright fixtures (injects POM, blocks ads)
├── pages/                   # Page Object classes
│   └── Components/          # Reusable UI components
├── scripts/                 # Utility scripts (e.g., Allure environment setup)
├── test-data/               # JSON files for data-driven testing
├── tests/
│   ├── api/                 # API test suites (Health, Users, Notes, etc.)
│   └── ui/                  # UI test suites (Login, etc.)
└── playwright.config.js     # Main Playwright configuration
```

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/NimishaPathak/playwright-expandtesting-framework.git
   cd playwright-expandtesting-framework
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers:**
   ```bash
   npx playwright install --with-deps
   ```

### Configuration
1. Navigate to the `configs/` directory.
2. Create a `dev.env` file (you can use `dev.env.example` as a template).
3. Update the credentials and base URLs as needed.

---

## 🧪 Running Tests

### UI Execution
| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests in headed (visible) mode |
| `npm run test-ui` | Open Playwright UI Mode (interactive) |

### API Execution
Run specific API tests using tags or directory paths:
```bash
npx playwright test tests/api
```

---

## 📊 Reporting

We use **Allure** for advanced reporting. To generate and open the report:

1. **Generate and Open:**
   ```bash
   npm run allure:report
   ```
   *This command runs scripts to inject environment data into Allure before generating the final report.*

2. **Generate Only:**
   ```bash
   npm run allure:generate
   ```

---

## 🧹 Linting & Formatting

Keep the codebase clean:
- **Lint:** `npx eslint .`
- **Format:** `npx prettier --write .`

---

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License
Distributed under the ISC License. See `LICENSE` for more information.