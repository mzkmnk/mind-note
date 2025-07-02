/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// テストで使用するプロバイダーのラッパー
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  );
};

// カスタムレンダリング関数
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// テストで使用するモックルーター
export const mockRouter = {
  push: (global as any).jest ? (global as any).jest.fn() : () => {},
  replace: (global as any).jest ? (global as any).jest.fn() : () => {},
  back: (global as any).jest ? (global as any).jest.fn() : () => {},
  forward: (global as any).jest ? (global as any).jest.fn() : () => {},
  refresh: (global as any).jest ? (global as any).jest.fn() : () => {},
  prefetch: (global as any).jest ? (global as any).jest.fn() : () => {},
};

// テストで使用するモックパラメータ
export const createMockParams = (id: string) => ({
  params: { id }
});

// テストで使用するモックSearchParams
export const createMockSearchParams = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  return searchParams;
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };