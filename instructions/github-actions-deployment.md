# GitHub Actions Deployment Setup Guide - Auto-Deploy to Staging After Tests Pass

This guide explains how to set up automatic deployment to staging when tests
pass in GitHub Actions.

## Overview

This setup will automatically:

- Run your test suite when a PR is created or updated
- Deploy to staging **only if tests pass**
- Skip deployment if tests fail
- Provide deployment status in the PR

## Prerequisites

- GitHub Actions workflow already set up for testing (see
  `GITHUB_ACTIONS_SETUP.md`)
- Access to your deployment platform (Forge, Firebase, Vercel, etc.)
- Deployment credentials/secrets configured in GitHub

## General Workflow Structure

The deployment job should:

1. **Depend on** the test job completing successfully
2. **Only run** when tests pass
3. **Build** the application
4. **Deploy** to staging

Here's the basic structure:

```yaml
jobs:
  test:
    # ... your existing test job ...

  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: test # Wait for test job to complete
    if: success() # Only run if test job succeeded
    steps:
      # ... deployment steps ...
```

---

## Option 1: Laravel Forge Deployment

If you're using Laravel Forge (as seen in your GitLab CI), you can deploy via
HTTP webhook.

### Step 1: Get Your Forge Deploy Token

1. Go to your Laravel Forge dashboard
2. Navigate to your site
3. Go to **Deploy Script** or **Deployments** section
4. Copy your deploy webhook URL (format:
   `https://forge.laravel.com/servers/{server_id}/sites/{site_id}/deploy/http?token={token}`)

### Step 2: Add Secret to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FORGE_DEPLOY_TOKEN`
5. Value: Your full deploy webhook URL
6. Click **Add secret**

### Step 3: Update Your Workflow

Add this deployment job to your `.github/workflows/ci.yml`:

```yaml
jobs:
  test:
    # ... your existing test job ...

  deploy-staging:
    name: Deploy to Staging (Forge)
    runs-on: ubuntu-latest
    needs: test
    if:
      success() && github.event_name == 'pull_request' &&
      github.event.pull_request.merged == false
    environment:
      name: staging
      url: https://staging.mjdispensaryapp.com/

    steps:
      - name: Deploy to Forge
        run: |
          curl -X POST "${{ secrets.FORGE_DEPLOY_TOKEN }}"

      - name: Deployment Status
        run: echo "✅ Successfully deployed to staging!"
```

### Alternative: Deploy Only on Merge to Main/Staging Branch

If you want to deploy only when PRs are merged to specific branches:

```yaml
deploy-staging:
  name: Deploy to Staging (Forge)
  runs-on: ubuntu-latest
  needs: test
  if:
    success() && (github.ref == 'refs/heads/staging' || github.ref ==
    'refs/heads/main')

  steps:
    - name: Deploy to Forge
      run: |
        curl -X POST "${{ secrets.FORGE_DEPLOY_TOKEN }}"
```

---

## Option 2: Firebase Hosting Deployment

If you're using Firebase Hosting for your staging environment.

### Step 1: Install Firebase CLI

Add Firebase CLI to your workflow and authenticate:

```yaml
deploy-staging:
  name: Deploy to Staging (Firebase)
  runs-on: ubuntu-latest
  needs: test
  if: success()
  environment:
    name: staging
    url: https://your-staging-project.web.app

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

    - name: Build project
      run: npm run build

    - name: Deploy to Firebase Hosting
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: "${{ secrets.GITHUB_TOKEN }}"
        firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
        channelId: staging
        projectId: your-staging-project-id
```

### Step 2: Get Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the JSON file content
6. Add it to GitHub Secrets as `FIREBASE_SERVICE_ACCOUNT`

### Step 3: Create firebase.json (if not exists)

Create `firebase.json` in your project root:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## Option 3: Vercel Deployment

For Vercel deployments:

### Step 1: Install Vercel CLI Action

```yaml
deploy-staging:
  name: Deploy to Staging (Vercel)
  runs-on: ubuntu-latest
  needs: test
  if: success()
  environment:
    name: staging

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

    - name: Build project
      run: npm run build

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: "--prod"
        scope: ${{ secrets.VERCEL_ORG_ID }}
```

### Step 2: Get Vercel Credentials

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Settings** → **Tokens**
3. Create a new token
4. Add to GitHub Secrets as `VERCEL_TOKEN`
5. Get your Org ID and Project ID from Vercel dashboard
6. Add them as `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

---

## Option 4: Netlify Deployment

For Netlify deployments:

```yaml
deploy-staging:
  name: Deploy to Staging (Netlify)
  runs-on: ubuntu-latest
  needs: test
  if: success()
  environment:
    name: staging

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

    - name: Build project
      run: npm run build

    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v3.0
      with:
        publish-dir: "./dist"
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
        enable-pull-request-comment: false
        enable-commit-comment: true
        overwrites-pull-request-comment: true
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      timeout-minutes: 1
```

### Get Netlify Credentials

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Go to **User settings** → **Applications** → **New access token**
3. Create a token and add to GitHub Secrets as `NETLIFY_AUTH_TOKEN`
4. Get your Site ID from **Site settings** → **General**
5. Add as `NETLIFY_SITE_ID`

---

## Option 5: AWS S3 + CloudFront Deployment

For AWS S3 static hosting:

```yaml
deploy-staging:
  name: Deploy to Staging (AWS S3)
  runs-on: ubuntu-latest
  needs: test
  if: success()
  environment:
    name: staging

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

    - name: Build project
      run: npm run build

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: Deploy to S3
      run: |
        aws s3 sync ./dist s3://your-staging-bucket-name --delete

    - name: Invalidate CloudFront
      run: |
        aws cloudfront create-invalidation \
          --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
          --paths "/*"
```

### AWS Setup

1. Create an IAM user with S3 and CloudFront permissions
2. Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to GitHub Secrets
3. Add `CLOUDFRONT_DISTRIBUTION_ID` to secrets

---

## Option 6: Generic Server Deployment (SSH/SCP)

For deploying to your own server via SSH:

```yaml
deploy-staging:
  name: Deploy to Staging (SSH)
  runs-on: ubuntu-latest
  needs: test
  if: success()
  environment:
    name: staging

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

    - name: Build project
      run: npm run build

    - name: Deploy via SSH
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.STAGING_HOST }}
        username: ${{ secrets.STAGING_USER }}
        key: ${{ secrets.STAGING_SSH_KEY }}
        port: ${{ secrets.STAGING_PORT }}
        source: "dist/*"
        target: "/var/www/staging"

    - name: Restart application
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.STAGING_HOST }}
        username: ${{ secrets.STAGING_USER }}
        key: ${{ secrets.STAGING_SSH_KEY }}
        port: ${{ secrets.STAGING_PORT }}
        script: |
          cd /var/www/staging
          pm2 restart app || npm run preview
```

### SSH Setup

1. Generate an SSH key pair (or use existing)
2. Add public key to your server's `~/.ssh/authorized_keys`
3. Add private key to GitHub Secrets as `STAGING_SSH_KEY`
4. Add host, user, and port to secrets

---

## Complete Example: Updated CI Workflow with Deployment

Here's a complete example updating your existing `.github/workflows/ci.yml` to
include deployment:

```yaml
name: CI/CD

on:
  pull_request:
    branches: [main, staging]
    types: [opened, synchronize, reopened, edited]
  push:
    branches: [main, staging]

permissions:
  contents: write
  pull-requests: write
  issues: write

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [22.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Run tests
        id: run-tests
        run: npm run coverage

      - name: Upload coverage report
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage

      - name: Request changes
        if:
          ${{ steps.run-tests.outcome == 'failure' && github.base_ref == 'main'
          }}
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.pulls.createReview({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
              event: 'REQUEST_CHANGES',
              body: 'Please fix the tests'
            })

      - name: Assign PR to @davit
        if:
          ${{ steps.run-tests.outcome == 'success' && github.base_ref == 'main'
          }}
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.addAssignees({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              assignees: ['davo81']
            })

  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: test
    if:
      success() && (github.ref == 'refs/heads/staging' || (github.event_name ==
      'pull_request' && github.base_ref == 'staging'))
    environment:
      name: staging
      url: https://staging.mjdispensaryapp.com/

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22.x"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      # Choose ONE of the following deployment methods:

      # Option A: Laravel Forge
      - name: Deploy to Forge
        run: |
          curl -X POST "${{ secrets.FORGE_DEPLOY_TOKEN }}"

      # Option B: Firebase (uncomment if using Firebase)
      # - name: Deploy to Firebase
      #   uses: FirebaseExtended/action-hosting-deploy@v0
      #   with:
      #     repoToken: '${{ secrets.GITHUB_TOKEN }}'
      #     firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
      #     channelId: staging
      #     projectId: your-staging-project-id

      - name: Deployment Status
        run: echo "✅ Successfully deployed to staging!"
```

---

## Deployment Strategies

### Strategy 1: Deploy on PR (Preview Deployments)

Deploy every PR to a preview/staging environment:

```yaml
if: success() && github.event_name == 'pull_request'
```

### Strategy 2: Deploy on Merge to Staging Branch

Only deploy when code is merged to the staging branch:

```yaml
if: success() && github.ref == 'refs/heads/staging'
```

### Strategy 3: Deploy on Push to Staging

Deploy on any push to staging branch (including direct pushes):

```yaml
on:
  push:
    branches: [staging]

if: success()
```

### Strategy 4: Manual Deployment Trigger

Allow manual triggering via workflow_dispatch:

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: "Environment to deploy to"
        required: true
        type: choice
        options:
          - staging
          - production
```

---

## Best Practices

### 1. Use GitHub Environments

Create environments in GitHub for better control:

1. Go to **Settings** → **Environments**
2. Create a "staging" environment
3. Add protection rules if needed
4. Reference in workflow: `environment: staging`

### 2. Add Deployment Notifications

Notify your team when deployment completes:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: "Deployment to staging ${{ job.status }}"
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 3. Add Rollback Capability

Keep previous builds for quick rollback:

```yaml
- name: Upload build artifact
  uses: actions/upload-artifact@v4
  with:
    name: build-${{ github.sha }}
    path: dist
    retention-days: 30
```

### 4. Add Health Checks

Verify deployment after deploying:

```yaml
- name: Health check
  run: |
    sleep 10
    curl -f https://staging.mjdispensaryapp.com/ || exit 1
```

### 5. Use Deployment Status Badges

Add status checks that block merging if deployment fails (optional):

1. Go to **Settings** → **Branches**
2. Add branch protection rule
3. Require "Deploy to Staging" status check

---

## Troubleshooting

### Deployment fails but tests pass

- Check deployment logs in Actions tab
- Verify secrets are correctly set
- Ensure deployment credentials have proper permissions
- Check if build artifacts are generated correctly

### Deployment runs even when tests fail

- Verify `needs: test` is set
- Check `if: success()` condition
- Ensure test job is not being skipped

### Secrets not found

- Go to **Settings** → **Secrets and variables** → **Actions**
- Verify secret names match exactly (case-sensitive)
- Check if secrets are scoped to the correct environment

### Build fails during deployment

- Ensure `npm run build` works locally
- Check if all environment variables are set
- Verify build output directory matches deployment config

---

## Security Considerations

1. **Never commit secrets** - Always use GitHub Secrets
2. **Use environment-specific secrets** - Different secrets for
   staging/production
3. **Limit deployment permissions** - Use least privilege principle
4. **Review deployment logs** - Monitor for suspicious activity
5. **Rotate credentials regularly** - Update secrets periodically

---

## Next Steps

1. Choose your deployment method (Forge, Firebase, etc.)
2. Set up required secrets in GitHub
3. Update your workflow file with deployment job
4. Test with a small PR
5. Monitor first few deployments
6. Add notifications if needed
7. Set up production deployment (separate workflow)

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Laravel Forge Documentation](https://forge.laravel.com/docs)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
