document.addEventListener("DOMContentLoaded", function () {
  // 各機能の初期化関数を呼び出す
  initializeFormHandlers(); // フォーム管理機能の初期化
  initializeClipboardHandlers(); // クリップボード管理機能の初期化
  initializeOutputHandlers(); // 出力管理機能の初期化

  // 最初のフィールドを自動で作成（元コードの最初の動作）
  createField();
});
