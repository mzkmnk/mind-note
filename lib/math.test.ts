import { add, multiply, slugify } from './math';

describe('Math utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      // Given
      const a = 2;
      const b = 3;

      // When
      const result = add(a, b);

      // Then
      expect(result).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('should multiply negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6);
    });

    it('should multiply positive and negative numbers', () => {
      expect(multiply(5, -2)).toBe(-10);
    });

    it('should handle zero', () => {
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(5, 0)).toBe(0);
    });
  });
});

describe('String utilities', () => {
  describe('slugify', () => {
    it('should convert string to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should remove special characters', () => {
      expect(slugify('Hello@World!')).toBe('helloworld');
    });

    it('should handle multiple spaces', () => {
      expect(slugify('Hello   World')).toBe('hello-world');
    });

    it('should handle underscores and hyphens', () => {
      expect(slugify('hello_world-test')).toBe('hello-world-test');
    });

    it('should trim leading and trailing hyphens', () => {
      expect(slugify('-hello-world-')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('should handle whitespace only', () => {
      expect(slugify('   ')).toBe('');
    });
  });
});