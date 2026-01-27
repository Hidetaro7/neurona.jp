/**
 * 日付フォーマッター
 * microCMS の日付を日本語形式に変換
 * TODO: 後で拡張・改善予定
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    // 簡単なフォーマット: YYYY-MM-DD
    return date.toISOString().split('T')[0];
  } catch (error) {
    return '';
  }
}
