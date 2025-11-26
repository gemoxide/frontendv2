# GitHub Actions Setup Guide - Running Tests on PR

This guide explains how to set up GitHub Actions to automatically run tests when
a Pull Request is created.

## Overview

GitHub Actions will automatically:

- Run your test suite when a PR is opened or updated
- Report test results in the PR
- Block PRs from merging if tests fail (optional)

## Prerequisites

- A GitHub repository
- Tests configured in your project (already set up with Vitest)
- Node.js and npm installed (for local testing)

## Step-by-Step Setup

### Step 1: Create the GitHub Actions Workflow Directory

1. In your repository root, create the following directory structure:

   ```
   .github/
   └── workflows/
   ```

   You can do this via command line:

   ```bash
   mkdir -p .github/workflows
   ```

### Step 2: Create the Workflow File

Create a new file named `test.yml` (or `test.yaml`) in the `.github/workflows/`
directory.

### Step 3: Add the Workflow Configuration

Copy the following workflow configuration into `.github/workflows/test.yml`:

```yaml
name: Run Tests

on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches:
      - main
      - develop

jobs:
  test:
    name: Run Test Suite
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Upload test results (optional)
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-${{ matrix.node-version }}
          path: |
            coverage/
            test-results/
          retention-days: 7
```

### Step 4: Alternative Simplified Workflow (Single Node Version)

If you prefer a simpler workflow that runs on a single Node.js version:

```yaml
name: Run Tests

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  test:
    name: Run Test Suite
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

### Step 5: Commit and Push

1. Add the workflow file to git:

   ```bash
   git add .github/workflows/test.yml
   git commit -m "Add GitHub Actions workflow for running tests on PR"
   git push
   ```

2. Once pushed, GitHub Actions will automatically start running on new PRs.

## Advanced Configuration Options

### Option 1: Add Coverage Reporting

To generate and upload coverage reports:

```yaml
- name: Run tests with coverage
  run: npm run coverage

- name: Upload coverage to Codecov (optional)
  uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/coverage-final.json
```

### Option 2: Add Build Check

To also verify the project builds successfully:

```yaml
- name: Build project
  run: npm run build
```

### Option 3: Require Tests to Pass Before Merging

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Add a branch protection rule for your main branch
4. Enable **Require status checks to pass before merging**
5. Select the "Run Test Suite" check

### Option 4: Run Tests on Multiple Operating Systems

To test across different platforms:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [18.x, 20.x]
runs-on: ${{ matrix.os }}
```

### Option 5: Cache Dependencies for Faster Runs

The workflow already includes dependency caching via `cache: 'npm'` in the
setup-node action, which will speed up subsequent runs.

## Workflow Triggers Explained

- `pull_request` with `types: [opened, synchronize, reopened]`:

  - `opened`: Runs when a PR is first created
  - `synchronize`: Runs when new commits are pushed to the PR branch
  - `reopened`: Runs when a closed PR is reopened

- `push` to specific branches:
  - Runs tests on pushes to main/develop branches (optional)

## Viewing Test Results

1. Go to your PR on GitHub
2. Click on the **Checks** tab at the top of the PR
3. You'll see the status of your test runs
4. Click on a check to see detailed logs

## Troubleshooting

### Tests fail in CI but pass locally

- Ensure your `package-lock.json` is committed
- Check that all dependencies are listed in `package.json`
- Verify environment variables are set in GitHub Secrets if needed

### Workflow not running

- Ensure the workflow file is in `.github/workflows/` directory
- Check that the file has `.yml` or `.yaml` extension
- Verify the YAML syntax is correct (use a YAML validator)
- Check the Actions tab in your GitHub repository for error messages

### Slow test runs

- Enable dependency caching (already included in the example)
- Consider running tests in parallel if using a matrix strategy
- Review and optimize slow tests

## Example Complete Workflow with All Features

Here's a comprehensive example that includes tests, build check, and coverage:

```yaml
name: CI

on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches:
      - main
      - develop

jobs:
  test:
    name: Test Suite
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Generate coverage
        run: npm run coverage
        continue-on-error: true

      - name: Build project
        run: npm run build

      - name: Upload coverage artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
          retention-days: 30
```

## Next Steps

1. Create the workflow file as described above
2. Test it by creating a test PR
3. Monitor the Actions tab to ensure everything works
4. Consider adding branch protection rules to require passing tests
5. Optionally set up coverage reporting services (Codecov, Coveralls, etc.)

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vitest Documentation](https://vitest.dev/)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
