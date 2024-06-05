# Heidi Health Frontend Assessment

## Overview
This is a simple voice to text application developed in React + Vite that allows users to record their voice and convert it to text. The application uses the browser's built-in speech recognition API to convert the user's voice to text.

Recording is implemented using the `MediaRecorder` API.
Speech to text is implemented using the `Web Speech` API.

This application used Tailwind CSS and ShadcnUI for styling and design.

Global state management are utilised by Zustand.

## Tests
This application uses Vitest, which is fully compatible with Jest and React Testing Library. Three component tests are written, located at `src/__test__`

1. `header.test.tsx`
This checks the rendering and anchors of the header component.

2. `record-handler.test.tsx`
This checks the recording functionality of the application

3. `voice-handler.test.tsx`
This checks the states are updated correctly each iteration of the voice recognition.

## Commands

I used pnpm as package manager, so you can run the following commands:

### Install Dependencies
```bash
pnpm install
```

### ESLint
```bash
pnpm run lint
```

### Run the application
```bash
pnpm run dev
```

### Run the tests
```bash
pnpm run test
```

### Build the application
```bash
pnpm run build
```

## CI
This application uses GitHub Actions for CI/CD. The workflow is located at `.github/workflows/main.yml`

In the CI, the following tasks are checked:
- Linting
- Type-check
- Tests