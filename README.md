# Jeba Gradday Project

## How to start developments

### Setup tools

1. Install Node.js
  - https://nodejs.org/en/download/package-manager
  - or https://github.com/nodejs/help/wiki/Installation
2. Install Yarn
  - https://yarnpkg.com/getting-started/install
3. Execute `yarn` at the project root directory to install devDependencies

### Develop with local server

1. Execute `yarn serve` at the project root directory
2. Open https://localhost:8080/
3. Edited files will be automatically applied

### Merge changes to the main branch

GitHub flow: https://docs.github.com/en/get-started/quickstart/github-flow

## Used technologies

- React: https://react.dev/learn
- TypeScript: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html

## Project directories

- `zgd`: project root
  - `src`
    - `components`: Atomic Design root directory: https://atomicdesign.bradfrost.com/table-of-contents/
      - `atoms`: basic building block components
      - `molecules`: componenets grouping two or more atoms held together
      - `organisms`: relatively complex componenets
    - `styles`: [SCSS](https://sass-lang.com/documentation/) style files
    - `images`: static images which can be imported as React Components
