/**
 * 2つの数値を足す関数
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * 2つの数値を掛ける関数
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * 文字列をスラッグ化する関数
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 特殊文字を削除
    .replace(/[\s_-]+/g, '-') // スペース、アンダースコア、ハイフンを単一のハイフンに
    .replace(/^-+|-+$/g, ''); // 先頭と末尾のハイフンを削除
}