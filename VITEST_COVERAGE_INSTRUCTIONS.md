# Vitest Coverage Setup Guide

This guide provides step-by-step instructions for setting up Vitest with code
coverage in your React + TypeScript project. This setup is designed to be easily
adaptable to other projects.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running Tests with Coverage](#running-tests-with-coverage)
5. [Writing Tests for This Codebase](#writing-tests-for-this-codebase)
6. [Understanding Coverage Reports](#understanding-coverage-reports)
7. [Customization](#customization)
8. [CI/CD Integration](#cicd-integration)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before setting up Vitest coverage, ensure you have:

- Node.js (v16 or higher recommended)
- npm or yarn package manager
- A React + TypeScript project using Vite
- Basic understanding of testing concepts

---

## Installation

### Step 1: Install Required Dependencies

Install Vitest and the coverage provider:

```bash
npm install --save-dev vitest @vitest/coverage-v8
```

Or with yarn:

```bash
yarn add -D vitest @vitest/coverage-v8
```

### Step 2: Install Testing Utilities (if not already installed)

For React Testing Library integration:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Or with yarn:

```bash
yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

---

## Configuration

### Step 1: Update `vite.config.ts`

Add Vitest configuration to your `vite.config.ts` file. Here's a complete
example:

```typescript
/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment
    globals: true,
    environment: "jsdom",
    testTimeout: 10000,

    // Setup files (optional but recommended)
    setupFiles: ["./vitest.setup.ts"],

    // Coverage configuration
    coverage: {
      // Coverage provider (v8 is recommended for better performance)
      provider: "v8",

      // Reporters: text (console), json, html (browser), lcov (CI tools)
      reporter: ["text", "json", "html", "lcov"],

      // Files to exclude from coverage
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/**",
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/fakers/**", // Test data generators
        "**/types/**", // Type definitions
        "**/interfaces/**", // Interface definitions
        "**/enums/**", // Enum definitions
        "**/constants/**", // Constants
        "**/main.tsx", // Entry point
        "**/index.tsx", // Barrel exports
        "**/vite-env.d.ts", // Vite type definitions
        "**/auto-imports.d.ts", // Auto-generated imports
      ],

      // Files to include in coverage
      include: ["src/**/*.{ts,tsx}"],

      // Coverage thresholds (set to 0 initially, adjust as needed)
      thresholds: {
        lines: 0, // Percentage of lines covered
        functions: 0, // Percentage of functions covered
        branches: 0, // Percentage of branches covered
        statements: 0, // Percentage of statements covered
      },
    },
  },
});
```

### Step 2: Create `vitest.setup.ts`

Create a setup file to configure test environment and global utilities:

```typescript
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});
```

### Step 3: Update `tsconfig.json`

Ensure your `tsconfig.json` includes Vitest types:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
    // ... other options
  }
}
```

### Step 4: Update `package.json` Scripts

Add test and coverage scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "coverage": "vitest run --coverage",
    "coverage:watch": "vitest --coverage",
    "coverage:ui": "vitest --ui --coverage"
  }
}
```

---

## Running Tests with Coverage

### Basic Commands

**Run tests in watch mode:**

```bash
npm run test
```

**Run tests once:**

```bash
npm run test:run
```

**Generate coverage report:**

```bash
npm run coverage
```

**Generate coverage in watch mode:**

```bash
npm run coverage:watch
```

**Open Vitest UI with coverage:**

```bash
npm run coverage:ui
```

### Coverage Report Locations

After running coverage, you'll find reports in:

- **HTML Report**: `coverage/index.html` (open in browser for interactive view)
- **JSON Report**: `coverage/coverage-final.json`
- **LCOV Report**: `coverage/lcov.info` (for CI/CD tools)
- **Text Report**: Displayed in terminal

---

## Writing Tests for This Codebase

This section shows you how to write simple tests following the patterns used in
this codebase.

### Test File Naming

- Place test files next to the component you're testing
- Name them: `*.test.tsx` or `*.test.ts`
- Example: `index.view.tsx` → `index.test.tsx`

### Simple Component Test Example

Here's a basic test for a simple component:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { mockAnimationsApi } from "jsdom-testing-mocks";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router";
import MyComponent from "./index.view";

describe("MyComponent", () => {
  const mockHandleClick = vi.fn();

  beforeEach(() => {
    mockAnimationsApi();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render the component", () => {
    render(
      <BrowserRouter>
        <MyComponent handleClick={mockHandleClick} />
      </BrowserRouter>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
```

### Using Fakers for Test Data

Use fakers from `src/app/core/fakers/` to create test data:

```typescript
import { createFakeCoupon } from "../../../../core/fakers/coupon.faker";
import { createMultipleFakeProducts } from "../../../../core/fakers/product.faker";

// Create a single item
const coupon = createFakeCoupon();

// Create multiple items
const products = createMultipleFakeProducts(5);
```

### Simple Form Test Example

Here's a simple example for testing a form:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { mockAnimationsApi } from "jsdom-testing-mocks";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router";
import { FormikProps, useFormik } from "formik";
import FormView from "./index.view";
import { createFakeCoupon } from "../../../../core/fakers/coupon.faker";

describe("Coupon Form", () => {
  const mockHandleSubmit = vi.fn();

  beforeEach(() => {
    mockAnimationsApi();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render the form", () => {
    // Create a simple wrapper for Formik
    const Wrapper = () => {
      const formik = useFormik({
        initialValues: { title: "", code: "" },
        onSubmit: mockHandleSubmit,
      });

      return (
        <BrowserRouter>
          <FormView formik={formik} />
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    expect(screen.getByTestId("input-title")).toBeInTheDocument();
    expect(screen.getByTestId("input-code")).toBeInTheDocument();
  });

  it("should fill and submit the form", () => {
    const Wrapper = () => {
      const formik = useFormik({
        initialValues: { title: "", code: "" },
        onSubmit: mockHandleSubmit,
      });

      return (
        <BrowserRouter>
          <FormView formik={formik} />
        </BrowserRouter>
      );
    };

    render(<Wrapper />);

    // Fill the form
    fireEvent.change(screen.getByTestId("input-title"), {
      target: { value: "Test Coupon" },
    });
    fireEvent.change(screen.getByTestId("input-code"), {
      target: { value: "TEST123" },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
```

### Simple List/Page Test Example

Here's a simple example for testing a page that shows a list:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { mockAnimationsApi } from "jsdom-testing-mocks";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router";
import ProductsView from "./index.view";
import { createMultipleFakeProducts } from "../../../../core/fakers/product.faker";

describe("Products Page", () => {
  const mockHandleCreate = vi.fn();
  const mockHandleDelete = vi.fn();
  const mockProducts = createMultipleFakeProducts(3);

  beforeEach(() => {
    mockAnimationsApi();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render the products page", () => {
    render(
      <BrowserRouter>
        <ProductsView
          products={mockProducts}
          handleCreate={mockHandleCreate}
          handleDelete={mockHandleDelete}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("should call handleCreate when create button is clicked", () => {
    render(
      <BrowserRouter>
        <ProductsView
          products={mockProducts}
          handleCreate={mockHandleCreate}
          handleDelete={mockHandleDelete}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Create Product"));
    expect(mockHandleCreate).toHaveBeenCalled();
  });
});
```

### Common Test Patterns

**1. Test that something is visible:**

```typescript
it("should show the title", () => {
  render(<MyComponent />);
  expect(screen.getByText("My Title")).toBeInTheDocument();
});
```

**2. Test a button click:**

```typescript
it("should call function when button is clicked", () => {
  const mockFn = vi.fn();
  render(<MyComponent handleClick={mockFn} />);

  fireEvent.click(screen.getByText("Click Me"));
  expect(mockFn).toHaveBeenCalled();
});
```

**3. Test form input:**

```typescript
it("should update input value", () => {
  render(<MyForm />);

  const input = screen.getByTestId("input-name");
  fireEvent.change(input, { target: { value: "John" } });

  expect(input).toHaveValue("John");
});
```

### Important Notes

1. **Always use these in every test file:**

   - `mockAnimationsApi()` in `beforeEach`
   - `cleanup()` in `afterEach`
   - `vi.clearAllMocks()` in `afterEach`

2. **Wrap components in `BrowserRouter`** if they use routing

3. **Use `data-testid` attributes** to find elements:

   ```typescript
   // In your component
   <input data-testid="input-title" />;

   // In your test
   screen.getByTestId("input-title");
   ```

4. **Use fakers** from `core/fakers/` instead of creating data manually

### Additional Resources

- Review existing test files in the codebase for more examples
- Check `src/app/core/fakers/` for available faker utilities
- See `src/app/core/interfaces/` for TypeScript interfaces
- Refer to
  [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)

---

## Understanding Coverage Reports

### Coverage Metrics

1. **Lines**: Percentage of executable lines covered
2. **Functions**: Percentage of functions called
3. **Branches**: Percentage of conditional branches executed (if/else, switch
   cases)
4. **Statements**: Percentage of statements executed

### Reading the HTML Report

1. Open `coverage/index.html` in your browser
2. Navigate through the file tree to see coverage for each file
3. Click on a file to see:
   - Line-by-line coverage (green = covered, red = not covered)
   - Function coverage
   - Branch coverage

### Setting Coverage Thresholds

Update thresholds in `vite.config.ts` to enforce minimum coverage:

```typescript
thresholds: {
  lines: 80,        // Require 80% line coverage
  functions: 75,    // Require 75% function coverage
  branches: 70,     // Require 70% branch coverage
  statements: 80,   // Require 80% statement coverage
}
```

You can also set per-file thresholds:

```typescript
thresholds: {
  global: {
    lines: 80,
    functions: 75,
    branches: 70,
    statements: 80,
  },
  // Per-file thresholds
  './src/app/core/**': {
    lines: 90,
    functions: 85,
    branches: 80,
    statements: 90,
  },
}
```

---

## Customization

### Excluding Files from Coverage

Add patterns to the `exclude` array in `vite.config.ts`:

```typescript
exclude: [
  "**/mocks/**", // Mock files
  "**/__tests__/**", // Test directories
  "**/*.stories.{ts,tsx}", // Storybook files
  "**/vendor/**", // Third-party code
];
```

### Including Specific Files Only

Modify the `include` array:

```typescript
include: [
  "src/app/**/*.{ts,tsx}",
  "src/components/**/*.{ts,tsx}",
  // Exclude utilities or helpers if needed
];
```

### Custom Reporters

Add or remove reporters:

```typescript
reporter: [
  "text", // Console output
  "json", // JSON file
  "html", // HTML report
  "lcov", // LCOV format (for CI)
  "text-summary", // Summary only
];
```

### Environment-Specific Configuration

You can create separate config files:

**vitest.config.ts:**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // ... your test config
  },
});
```

Then update `vite.config.ts` to import from the separate config if needed.

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests and Coverage

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
```

### GitLab CI Example

Create `.gitlab-ci.yml`:

```yaml
test:
  image: node:18
  stage: test
  script:
    - npm ci
    - npm run coverage
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/coverage-final.json
```

### Uploading Coverage Reports

Popular coverage services:

1. **Codecov**: https://codecov.io
2. **Coveralls**: https://coveralls.io
3. **SonarQube**: https://www.sonarqube.org

---

## Troubleshooting

### Issue: Coverage shows 0% or incorrect percentages

**Solution:**

- Ensure `include` patterns match your source files
- Check that files aren't excluded by patterns in `exclude`
- Verify source maps are enabled in build config

### Issue: "Cannot find module" errors

**Solution:**

- Check that `@vitest/coverage-v8` is installed
- Ensure `provider: 'v8'` is set in coverage config
- Try deleting `node_modules` and reinstalling

### Issue: Coverage report not generating

**Solution:**

- Run with `--coverage` flag: `vitest run --coverage`
- Check that reporters are specified: `reporter: ['text', 'html']`
- Verify output directory permissions

### Issue: Tests timeout with coverage

**Solution:**

- Increase `testTimeout` in config
- Exclude large files or directories from coverage
- Use `--reporter=verbose` to see which tests are slow

### Issue: TypeScript errors in test files

**Solution:**

- Ensure `/// <reference types="vitest" />` is at top of `vite.config.ts`
- Add `"types": ["vitest/globals"]` to `tsconfig.json`
- Check that `@types/node` is installed

---

## Best Practices

1. **Start with low thresholds** and gradually increase them
2. **Focus on critical paths** first (core business logic)
3. **Don't aim for 100% coverage** - focus on meaningful tests
4. **Exclude generated files** and third-party code
5. **Review coverage reports regularly** to identify untested code
6. **Set up CI/CD** to enforce coverage thresholds
7. **Use coverage to guide testing**, not as the only metric

---

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vitest Coverage Guide](https://vitest.dev/guide/coverage.html)
- [Testing Library Documentation](https://testing-library.com/)
- [V8 Coverage Provider](https://github.com/vitest-dev/vitest/tree/main/packages/coverage-v8)

---

## Quick Reference

### Common Commands

```bash
# Run tests
npm run test

# Run tests once
npm run test:run

# Generate coverage
npm run coverage

# Watch mode with coverage
npm run coverage:watch

# Open UI
npm run test:ui
```

### Configuration Files

- `vite.config.ts` - Main Vitest configuration
- `vitest.setup.ts` - Test environment setup
- `tsconfig.json` - TypeScript configuration
- `package.json` - Scripts and dependencies

### Coverage Output

- `coverage/index.html` - Interactive HTML report
- `coverage/coverage-final.json` - JSON report
- `coverage/lcov.info` - LCOV report for CI

---

## Support

If you encounter issues not covered in this guide:

1. Check the [Vitest GitHub Issues](https://github.com/vitest-dev/vitest/issues)
2. Review the [Vitest Documentation](https://vitest.dev/)
3. Consult your team's testing guidelines

---

**Last Updated**: 2024 **Vitest Version**: 3.1.2 **Coverage Provider**:
@vitest/coverage-v8
