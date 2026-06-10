import { describe, expect, it } from 'vitest';
import { validateEmail } from './functions';

describe('validateEmail', () => {
  it('accepts valid email addresses', () => {
    expect(validateEmail('admin@apart.com')).toBe(true);
    expect(validateEmail('test.user+tag@example.co.uk')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(validateEmail('not-an-email')).toBe(false);
    expect(validateEmail('missing-at.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});
