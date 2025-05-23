# Contributing to HubSpot Deal-Contact Association Extension

🎉 First off, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to the HubSpot Deal-Contact Association Extension. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the existing issues to avoid duplicates. When you are creating a bug report, please include as many details as possible:

- **Use the bug report template** when creating new issues
- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and **explain which behavior you expected to see**
- **Include screenshots** if possible
- **Include error messages** from browser console, HubSpot logs, etc.

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use the feature request template**
- **Use a clear and descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the enhancement
- **Describe the current behavior** and **explain which behavior you expected to see**
- **Explain why this enhancement would be useful**

### Your First Code Contribution 🚀

Unsure where to begin contributing? You can start by looking through these issues:

- **good first issue** - issues that should only require a few lines of code
- **help wanted** - issues that are more involved than beginner issues

### Pull Requests 🔧

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- HubSpot Developer Account
- HubSpot CLI (`npm install -g @hubspot/cli`)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/tsbs-1/hubspot-deal-contact-association.git
   cd hubspot-deal-contact-association
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your HubSpot credentials
   ```

4. **Authenticate with HubSpot CLI**
   ```bash
   hs auth
   ```

5. **Start development server**
   ```bash
   npm start
   ```

## Pull Request Process

### PR Title Format

Use conventional commit format for PR titles:

- `feat: add new feature`
- `fix: resolve bug in component`
- `docs: update API documentation`
- `test: add unit tests for service`
- `refactor: improve code structure`
- `style: fix formatting issues`
- `chore: update dependencies`

## Style Guidelines

### JavaScript/React Code Style

- Use **ES6+ features** where appropriate
- Use **functional components** with hooks instead of class components
- Use **camelCase** for variables and functions
- Use **PascalCase** for React components
- Use **SCREAMING_SNAKE_CASE** for constants
- Use **single quotes** for strings
- Use **2 spaces** for indentation

## Testing Guidelines

### Testing Requirements

- **Unit tests** for all components, hooks, and utilities
- **Integration tests** for critical user flows
- **Minimum 80% code coverage**
- **Test both happy path and error cases**
- **Mock external dependencies** (HubSpot API, etc.)

## Questions?

If you have questions about contributing, please:

1. Check existing [Issues](https://github.com/tsbs-1/hubspot-deal-contact-association/issues)
2. Create a new issue with the "question" label

Thank you for contributing! 🙌