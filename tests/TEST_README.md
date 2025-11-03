# Accessible Accordion - Jest Tests

Comprehensive Jest test suite for the WCAG 2.2 accessible accordion React component.

## Test Coverage

The test suite includes **80+ tests** covering:

### 1. **Initial Render** (6 tests)
- Component renders correctly
- All FAQ items present
- Initial collapsed state
- Proper ARIA regions

### 2. **FAQ Questions** (6 tests)
- All question text renders correctly
- Content verification

### 3. **Expand/Collapse Functionality** (8 tests)
- Click to expand/collapse
- Answer visibility
- Multiple items can be open
- Independent state management

### 4. **Keyboard Navigation** (3 tests)
- Tab key navigation
- Enter key toggles
- Space key toggles

### 5. **ARIA Attributes** (6 tests)
- Correct `aria-expanded` values
- Proper `aria-controls` linking
- Unique IDs for all elements
- `aria-hidden` on decorative SVG

### 6. **Content Verification** (6 tests)
- Each FAQ answer displays correctly
- Complex content (lists, multiple paragraphs)

### 7. **CSS Classes and Styling** (6 tests)
- Cursor pointer on hover
- Hover state classes
- Focus state classes
- SVG rotation on expand/collapse

### 8. **React StrictMode** (2 tests)
- Component renders in StrictMode
- State updates work correctly

### 9. **Edge Cases** (2 tests)
- Rapid clicking behavior
- Independent state across items

### 10. **Accessibility Compliance** (3 tests)
- Keyboard accessibility
- Proper landmarks
- Heading hierarchy

## Installation

Install the required dependencies:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run tests with verbose output
```bash
npm run test:verbose
```

## Test Files

- **`AccessibleAccordion.test.jsx`** - Main test suite (80+ tests)
- **`jest.config.js`** - Jest configuration
- **`jest.setup.js`** - Test setup and global configuration
- **`package.json`** - Dependencies and test scripts

## Dependencies

### Testing Libraries
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers for DOM
- `@testing-library/user-event` - User interaction simulation
- `jest` - Test framework
- `jest-environment-jsdom` - DOM environment for Jest

### Build Tools
- `@babel/core` - JavaScript compiler
- `@babel/preset-env` - Babel preset for ES6+
- `@babel/preset-react` - Babel preset for React JSX
- `babel-jest` - Babel integration for Jest

## Coverage Goals

The tests aim for **80%+ coverage** across:
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## Test Structure

Each test group follows this pattern:

```javascript
describe('Feature Area', () => {
  test('specific behavior', () => {
    // Arrange
    render(<AccessibleAccordion />);
    
    // Act
    const button = screen.getByText(/question text/i);
    fireEvent.click(button);
    
    // Assert
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
```

## WCAG 2.2 Compliance Testing

The tests verify:
- ✅ Keyboard navigation (2.1.1 Keyboard)
- ✅ Focus visible (2.4.7 Focus Visible)
- ✅ Name, Role, Value (4.1.2 Name, Role, Value)
- ✅ Status messages (4.1.3 Status Messages)
- ✅ Target size (2.5.8 Target Size - WCAG 2.2)

## Continuous Integration

These tests can be integrated into CI/CD pipelines:

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module 'react'"
```bash
npm install react react-dom
```

**Issue**: Tailwind classes not recognized in tests
- Add `identity-obj-proxy` to `moduleNameMapper` in jest.config.js (already configured)

**Issue**: SVG not rendering in tests
- Ensure `jest-environment-jsdom` is installed (already in package.json)

## Contributing

When adding new features to the accordion:
1. Write tests first (TDD approach)
2. Ensure all existing tests pass
3. Maintain 80%+ coverage
4. Follow existing test patterns

## License

MIT
