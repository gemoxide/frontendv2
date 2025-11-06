# CCLPI APP

## About

This is a boilerplate project for React apps with Typescript template. It is
configured with:

- Vite JS (for development and HMR)
- TailwindCSS (for UI)
- Reduxt Toolkit (Statement management)
- Axios (for HTTP request)
- Formik (for forms)
- Sass (css pre processor)
- Yup (for form validations)

## Prerequisites

You'll need to have Node 18.16.0 LTS or 16 up. We recommend upgrading to the LTS
version of NodeJS available at [https://nodejs.org/](https://nodejs.org/). You
can also use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux)
or
[nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)
to switch Node versions between different projects.

## Quick Start

### `npm dev`

Runs the app in the development mode. Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the
console.

## Project Structure

```
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── readme.md
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── clients
│   │   │   ├── components
│   │   │   ├── context
│   │   │   ├── helpers
│   │   │   ├── interfaces
│   │   │   ├── layouts
│   │   │   └── services
│   │   ├── index.tsx
│   │   └── modules
│   │
│   ├── favicon.svg
│   ├── index.scss
│   ├── logo.svg
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
