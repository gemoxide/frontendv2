# Coding Best Practices Guide

This guide outlines the coding standards, syntax, and semantic best practices
used in this codebase. These practices ensure code consistency, maintainability,
and readability.

---

## Table of Contents

1. [TypeScript Best Practices](#typescript-best-practices)
2. [React Component Patterns](#react-component-patterns)
3. [Props and Interfaces](#props-and-interfaces)
4. [React Hooks](#react-hooks)
5. [Service Layer Patterns](#service-layer-patterns)
6. [Error Handling](#error-handling)
7. [Testing Best Practices](#testing-best-practices)
8. [Code Organization](#code-organization)
9. [Naming Conventions](#naming-conventions)
10. [Performance Optimization](#performance-optimization)

---

## TypeScript Best Practices

### Use Strict Typing

Always provide explicit types for function parameters, return values, and
variables.

**✅ Good:**

```typescript
const calculateTotal = (items: number[]): number => {
  return items.reduce((sum, item) => sum + item, 0);
};

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};
```

**❌ Bad:**

```typescript
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item, 0);
};

const user = {
  id: 1,
  name: "John Doe",
};
```

### Prefer Interfaces for Object Shapes

Use `interface` for object shapes that might be extended, and `type` for unions,
intersections, or computed types.

**✅ Good:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
}

type Status = "pending" | "approved" | "rejected";
type UserWithStatus = User & { status: Status };
```

**❌ Bad:**

```typescript
type User = {
  id: number;
  name: string;
};

type AdminUser = User & {
  permissions: string[];
};
```

### Use Proper Event Handler Types

Always type event handlers correctly using React's built-in types.

**✅ Good:**

```typescript
interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}
```

**❌ Bad:**

```typescript
interface ButtonProps {
  onClick: (e: any) => void;
  onChange: (e: any) => void;
}
```

### Avoid `any` Type

Use `unknown` or proper types instead of `any`. If you must use `any`, add a
comment explaining why.

**✅ Good:**

```typescript
const parseData = (data: unknown): User => {
  if (typeof data === "object" && data !== null && "id" in data) {
    return data as User;
  }
  throw new Error("Invalid data format");
};
```

**❌ Bad:**

```typescript
const parseData = (data: any): User => {
  return data;
};
```

---

## React Component Patterns

### Component Declaration

Use `React.FC<Props>` for functional components with explicit prop types.

**✅ Good:**

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
```

**❌ Bad:**

```typescript
const Button = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### Default Props with Destructuring

Always provide default values in the function parameters, not in the component
body.

**✅ Good:**

```typescript
interface CardProps {
  title: string;
  variant?: "primary" | "secondary";
  showBorder?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  variant = "primary",
  showBorder = true,
}) => {
  // Component logic
};
```

**❌ Bad:**

```typescript
const Card: React.FC<CardProps> = ({ title, variant, showBorder }) => {
  const cardVariant = variant || "primary";
  const hasBorder = showBorder !== undefined ? showBorder : true;
  // Component logic
};
```

### PropsWithChildren Pattern

Use `PropsWithChildren` when your component accepts children.

**✅ Good:**

```typescript
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  title: string;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  title,
  className = "",
  children,
}) => {
  return (
    <div className={className}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
```

**❌ Bad:**

```typescript
interface ContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
```

### Conditional Rendering

Use clear, readable conditional rendering patterns.

**✅ Good:**

```typescript
const UserProfile: React.FC<UserProfileProps> = ({ user, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <EmptyState message="User not found" />;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

**❌ Bad:**

```typescript
const UserProfile: React.FC<UserProfileProps> = ({ user, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : user ? (
        <>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </>
      ) : (
        <EmptyState message="User not found" />
      )}
    </div>
  );
};
```

---

## Props and Interfaces

### Interface Naming

Name interfaces with descriptive names. For component props, use `Props` or
`ComponentNameProps`.

**✅ Good:**

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

interface UserFormProps {
  user: User;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}
```

**❌ Bad:**

```typescript
interface Props {
  label: string;
}

interface IButtonProps {
  label: string;
}
```

### Optional vs Required Props

Clearly mark optional props with `?` and provide sensible defaults.

**✅ Good:**

```typescript
interface InputProps {
  name: string; // Required
  label?: string; // Optional
  placeholder?: string; // Optional
  required?: boolean; // Optional with default
  disabled?: boolean; // Optional with default
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder = "Enter text",
  required = false,
  disabled = false,
}) => {
  // Component logic
};
```

### Union Types for Variants

Use union types for component variants or status values.

**✅ Good:**

```typescript
interface BadgeProps {
  variant: "success" | "warning" | "error" | "info";
  size?: "small" | "medium" | "large";
}

const Badge: React.FC<BadgeProps> = ({ variant, size = "medium" }) => {
  const variantClasses = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <span className={`${variantClasses[variant]} ${size}`}>
      {/* Content */}
    </span>
  );
};
```

---

## React Hooks

### useState Best Practices

Initialize state with proper types and use functional updates when the new state
depends on the previous state.

**✅ Good:**

```typescript
const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

**❌ Bad:**

```typescript
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1); // Can cause stale closure issues
  };
};
```

### useEffect with Cleanup

Always clean up subscriptions, timers, and event listeners in useEffect.

**✅ Good:**

```typescript
const WindowSize: React.FC = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      Window size: {windowSize.width}x{windowSize.height}
    </div>
  );
};
```

**❌ Bad:**

```typescript
useEffect(() => {
  window.addEventListener("resize", handleResize);
  // Missing cleanup - memory leak!
}, []);
```

### useMemo for Expensive Calculations

Use `useMemo` to memoize expensive calculations.

**✅ Good:**

```typescript
const ProductList: React.FC<ProductListProps> = ({ products, filter }) => {
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <div>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

**❌ Bad:**

```typescript
const ProductList: React.FC<ProductListProps> = ({ products, filter }) => {
  // This recalculates on every render, even when products/filter haven't changed
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### useCallback for Function Props

Use `useCallback` when passing functions as props to memoized components.

**✅ Good:**

```typescript
const ParentComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return <ChildComponent onClick={handleClick} />;
};

const ChildComponent = React.memo<{ onClick: () => void }>(({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
});
```

**❌ Bad:**

```typescript
const ParentComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  // New function created on every render
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return <ChildComponent onClick={handleClick} />;
};
```

### Custom Hooks

Extract reusable logic into custom hooks with descriptive names starting with
`use`.

**✅ Good:**

```typescript
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// Usage
const MyComponent: React.FC = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      Size: {width}x{height}
    </div>
  );
};
```

---

## Service Layer Patterns

### Service Function Naming

Use consistent naming: `get`, `create`, `update`, `delete`, `list` for CRUD
operations.

**✅ Good:**

```typescript
// services/user/user.service.ts
import httpClient from "../../clients/httpClient";
import {
  User,
  CreateUserPayload,
  UpdateUserPayload,
} from "../../interfaces/user.interface";

export const getUsers = (params: { page: number; perPage: number }) => {
  return httpClient.get("/api/v1/users", { params });
};

export const getUser = (id: number) => {
  return httpClient.get<User>(`/api/v1/users/${id}`);
};

export const createUser = (payload: CreateUserPayload) => {
  return httpClient.post<User>("/api/v1/users", payload);
};

export const updateUser = (id: number, payload: UpdateUserPayload) => {
  return httpClient.patch<User>(`/api/v1/users/${id}`, payload);
};

export const deleteUser = (id: number) => {
  return httpClient.delete(`/api/v1/users/${id}`);
};
```

**❌ Bad:**

```typescript
export const fetchUsers = (params) => {
  return httpClient.get("/api/v1/users", { params });
};

export const addUser = (data) => {
  return httpClient.post("/api/v1/users", data);
};
```

### Type-Safe API Calls

Always type your API responses and payloads.

**✅ Good:**

```typescript
interface UserResponse {
  data: User;
  message: string;
}

interface UsersResponse {
  data: User[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
}

export const getUser = (id: number) => {
  return httpClient.get<UserResponse>(`/api/v1/users/${id}`);
};

export const getUsers = (params: { page: number; perPage: number }) => {
  return httpClient.get<UsersResponse>("/api/v1/users", { params });
};
```

### Service File Organization

Organize services by feature/domain in separate files.

**✅ Good:**

```
services/
  ├── user/
  │   ├── user.service.ts
  │   └── user.interface.ts
  ├── product/
  │   ├── product.service.ts
  │   └── product.interface.ts
  └── order/
      ├── order.service.ts
      └── order.interface.ts
```

---

## Error Handling

### Try-Catch in Async Functions

Always handle errors in async operations.

**✅ Good:**

```typescript
const fetchUserData = async (id: number) => {
  try {
    setLoading(true);
    const response = await getUser(id);
    setUser(response.data);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    toast.error("Failed to load user data");
  } finally {
    setLoading(false);
  }
};
```

**❌ Bad:**

```typescript
const fetchUserData = async (id: number) => {
  setLoading(true);
  const response = await getUser(id);
  setUser(response.data);
  setLoading(false);
};
```

### Error Boundaries

Use error boundaries for component-level error handling.

**✅ Good:**

```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

---

## Testing Best Practices

### Test Structure

Organize tests with descriptive names and clear arrange-act-assert pattern.

**✅ Good:**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button Component", () => {
  const defaultProps = {
    label: "Click me",
    onClick: vi.fn(),
  };

  it("renders with correct label", () => {
    render(<Button {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button {...defaultProps} disabled={true} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
```

**❌ Bad:**

```typescript
it("button test", () => {
  render(<Button label="Click" onClick={() => {}} />);
  // Unclear what is being tested
});
```

### Test Constants

Extract test data into constants for reusability.

**✅ Good:**

```typescript
const TEST_USER = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};

const CUSTOM_CLASSES = {
  container: "custom-container",
  title: "custom-title",
};

describe("UserProfile", () => {
  it("displays user information", () => {
    render(<UserProfile user={TEST_USER} />);
    expect(screen.getByText(TEST_USER.name)).toBeInTheDocument();
  });
});
```

---

## Code Organization

### File Structure

Follow consistent file organization patterns.

**✅ Good:**

```
components/
  ├── Button/
  │   ├── index.tsx
  │   ├── index.test.tsx
  │   └── Button.styles.ts
  ├── Input/
  │   ├── index.tsx
  │   └── index.test.tsx
```

### Import Organization

Organize imports: external libraries first, then internal imports, then types.

**✅ Good:**

```typescript
// External libraries
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import classNames from "classnames";

// Internal components
import Button from "../Button";
import Input from "../Input";

// Types and interfaces
import { User, UserFormData } from "../../interfaces/user.interface";

// Utilities
import { formatDate } from "../../helpers/date";
```

**❌ Bad:**

```typescript
import { formatDate } from "../../helpers/date";
import React from "react";
import Button from "../Button";
import { User } from "../../interfaces/user.interface";
```

### Export Patterns

Use default exports for components, named exports for utilities and types.

**✅ Good:**

```typescript
// Component - default export
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;

// Utility - named export
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Type - named export
export interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

---

## Naming Conventions

### Variables and Functions

Use camelCase for variables and functions. Use descriptive names.

**✅ Good:**

```typescript
const userCount = 10;
const isUserLoggedIn = true;
const getUserById = (id: number) => {
  /* ... */
};
const handleSubmit = () => {
  /* ... */
};
```

**❌ Bad:**

```typescript
const uc = 10;
const flag = true;
const get = (id: number) => {
  /* ... */
};
const submit = () => {
  /* ... */
};
```

### Constants

Use UPPER_SNAKE_CASE for constants that don't change.

**✅ Good:**

```typescript
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = "https://api.example.com";
const DEFAULT_PAGE_SIZE = 20;
```

### Components

Use PascalCase for component names.

**✅ Good:**

```typescript
const UserProfile: React.FC = () => {
  /* ... */
};
const ProductCard: React.FC = () => {
  /* ... */
};
const NavigationMenu: React.FC = () => {
  /* ... */
};
```

### Interfaces and Types

Use PascalCase for interfaces and types. Don't prefix with `I`.

**✅ Good:**

```typescript
interface User {
  id: number;
  name: string;
}

type Status = "active" | "inactive";
```

**❌ Bad:**

```typescript
interface IUser {
  id: number;
}

type TStatus = "active" | "inactive";
```

---

## Performance Optimization

### Conditional Class Names

Use `classNames` utility for conditional class application.

**✅ Good:**

```typescript
import classNames from "classnames";

const Button: React.FC<ButtonProps> = ({ variant, disabled, className }) => {
  const buttonClasses = classNames(
    "px-4 py-2 rounded",
    {
      "bg-blue-500": variant === "primary",
      "bg-gray-500": variant === "secondary",
      "opacity-50 cursor-not-allowed": disabled,
    },
    className
  );

  return <button className={buttonClasses}>Click me</button>;
};
```

**❌ Bad:**

```typescript
const Button: React.FC<ButtonProps> = ({ variant, disabled, className }) => {
  let classes = "px-4 py-2 rounded";
  if (variant === "primary") classes += " bg-blue-500";
  if (variant === "secondary") classes += " bg-gray-500";
  if (disabled) classes += " opacity-50 cursor-not-allowed";
  if (className) classes += ` ${className}`;

  return <button className={classes}>Click me</button>;
};
```

### List Rendering

Always provide stable `key` props for list items.

**✅ Good:**

```typescript
const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

**❌ Bad:**

```typescript
const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### Memoization

Use `React.memo` for components that receive stable props.

**✅ Good:**

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

const ProductCard = React.memo<ProductCardProps>(({ product, onAddToCart }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
});
```

---

## Additional Best Practices

### Accessibility

Always include proper accessibility attributes.

**✅ Good:**

```typescript
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      role="button"
    >
      {label}
    </button>
  );
};
```

### Data Attributes for Testing

Use `data-testid` for testing without relying on implementation details.

**✅ Good:**

```typescript
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} data-testid="submit-button">
      {label}
    </button>
  );
};
```

### Comments

Write self-documenting code. Only add comments when necessary to explain "why",
not "what".

**✅ Good:**

```typescript
// Debounce search to avoid excessive API calls
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  [handleSearch]
);
```

**❌ Bad:**

```typescript
// Set loading to true
setLoading(true);
// Call the API
const response = await fetchData();
// Set loading to false
setLoading(false);
```

---

## Summary Checklist

When writing code, ensure you:

- ✅ Use TypeScript with strict typing
- ✅ Follow consistent naming conventions
- ✅ Use proper React patterns (hooks, components)
- ✅ Organize code logically
- ✅ Handle errors appropriately
- ✅ Write meaningful tests
- ✅ Optimize for performance when needed
- ✅ Maintain accessibility standards
- ✅ Keep code DRY (Don't Repeat Yourself)
- ✅ Write self-documenting code

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
