# Domain Guard Implementation

## Overview

This implementation adds domain-based route protection to ensure users can only access the `/products` page when no domain is set in the Zustand store. All other routes will redirect users to the products page if no domain is configured.

## Components

### 1. DomainGuard Component (`src/components/guards/DomainGuard.tsx`)

A React component that checks if a domain is set in the Zustand store and conditionally renders content or redirects to the products page.

**Features:**
- Checks `useDomainStore` for domain state
- Redirects to `/products` if no domain is set and user is not already on products page
- Allows access to products page regardless of domain state
- Configurable fallback path (defaults to `/products`)

### 2. Domain Guard Loader (`src/router/loaders/domainGuard.ts`)

A React Router loader that performs domain checking at the route level before components are rendered.

**Features:**
- Uses `useDomainStore.getState()` to check domain synchronously
- Throws redirect to `/products` if no domain is set and user is not accessing products
- Works with React Router's loader system for early route protection

### 3. Protected Route Loader (`src/router/loaders/protectedRoute.ts`)

A combined loader that handles both domain checking and authentication (currently disabled for development).

## Router Configuration

The following routes are protected with domain checking:

- `/account/*` - Uses `protectedRouteLoader`
- `/events/*` - Uses `protectedRouteLoader`  
- `/campaigns/*` - Uses `protectedRouteLoader`
- `/segment/*` - Uses `protectedRouteLoader`
- `/product/*` - Uses `domainGuardLoader`
- `/backOffice/*` - Uses `domainGuardLoader`

The `/products/*` route remains unprotected and accessible without a domain.

## How It Works

1. **Route Access**: When a user tries to access any protected route
2. **Domain Check**: The loader checks if a domain is set in `useDomainStore`
3. **Redirect Logic**: 
   - If no domain is set AND user is not on `/products/*` → Redirect to `/products`
   - If domain is set OR user is on `/products/*` → Allow access
4. **Products Page**: Always accessible, allows users to set up their domain

## Usage Example

```typescript
// Setting a domain (typically done in products page)
const { setDomain } = useDomainStore();
setDomain('example.com');

// Removing a domain
const { removeDomain } = useDomainStore();
removeDomain();

// Checking current domain
const { domain } = useDomainStore();
console.log('Current domain:', domain); // '' if not set
```

## Testing

To test the functionality:

1. **No Domain Set**: 
   - Navigate to any route other than `/products`
   - Should redirect to `/products`

2. **Domain Set**:
   - Set a domain in the products page
   - Navigate to other routes
   - Should allow access to all routes

3. **Products Page**:
   - Should always be accessible regardless of domain state

## Files Modified

- `src/components/guards/DomainGuard.tsx` - New component
- `src/components/guards/index.ts` - New export file
- `src/components/index.ts` - Added guards export
- `src/router/loaders/domainGuard.ts` - New loader
- `src/router/loaders/protectedRoute.ts` - New combined loader
- `src/router/loaders/index.ts` - Added new loader exports
- `src/router/index.tsx` - Updated route configuration with loaders 