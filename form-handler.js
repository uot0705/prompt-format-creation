let fieldCount = 0;
const fieldsContainer = document.getElementById("fields-container"); // グローバルスコープに移動

/**
 * フォーム全体のイベントを設定する初期化関数。
 * - 「フィールド追加」ボタンにクリックイベントを紐づける
 * - 各プリセットチェックボックスの動作を `checkboxConfigs` をもとに生成
 * - プレビューを常に最新状態に保つ
 * ページの DOM が読み込み終わった後に呼び出す
 */
function initializeFormHandlers() {
  const mainQuestion = document.getElementById("main-question");
  const addFieldBtn = document.getElementById("add-field-btn");

  addFieldBtn.addEventListener("click", createField);

  // -------------------- REFACTORED CHECKBOX HANDLERS --------------------
  const checkboxConfigs = {
    "question-checkbox": {
      mainText: "以下の質問に回答してください",
      setup() {
        createField();
        const firstField = fieldsContainer.querySelector(".field input[type='text']");
        firstField.value = "質問内容";
        if (fieldCount < 2) createField();
      },
    },
    "error-checkbox": {
      mainText: "以下のエラー内容を解決してください",
      setup() {
        createField();
        const firstField = fieldsContainer.querySelector(".field input[type='text']");
        firstField.value = "エラー内容";

        createField();
        const secondFieldInput = fieldsContainer.querySelectorAll(".field input[type='text']")[1];
        secondFieldInput.value = "出力内容";
        const secondFieldContent = fieldsContainer.querySelectorAll(".field textarea")[1];
        secondFieldContent.value =
          "以下の内容を全て「エンジニア初心者でもわかりやすいように」丁寧に教えてください\n・エラーの概要:\n・エラーの原因:\n・エラーの解決策:\n・解決策する為の具体的な方法(コードの修正の場合はコードを書く):";
      },
    },
    "variable-name-checkbox": {
      mainText:
        "以下の変数の使い道に合う変数名を5個提案してください。\n提案する変数名は「シンプルな単語を使い」「意味が理解ができる」、「長くなりすぎない簡潔」な命名にしてください",
      setup() {
        createField();
        const firstField = fieldsContainer.querySelector(".field input[type='text']");
        firstField.value = "変数の使い道";

        createField();
        const secondFieldInput = fieldsContainer.querySelectorAll(".field input[type='text']")[1];
        secondFieldInput.value = "出力内容(以下の内容で5個)";
        const secondFieldContent = fieldsContainer.querySelectorAll(".field textarea")[1];
        secondFieldContent.value = "・変数名:\n・おすすめの理由：";
      },
    },
    "refactor-checkbox": {
      mainText: "以下のリファクタをしてください",
      setup() {
        createField();
        const firstFieldInput = fieldsContainer.querySelector(".field input[type='text']");
        firstFieldInput.value = "出力内容";
        const firstFieldTextarea = fieldsContainer.querySelector(".field textarea");
        firstFieldTextarea.value =
          "リファクタしたほうが良い箇所を「3箇所」選んでください。その3箇所の現在のコードを出力して、以下を「エンジニア初心者でもわかりやすいように」教えてください。\n" +
          "・なぜリファクタしたほうが良いか\n" +
          "・どのようなリファクタをすればいいのか\n" +
          "・リファクタしたコード";
      },
    },
    "review-checkbox": {
      mainText: "上司からのレビュー指摘内容を以下の「出力内容」に沿って回答してください",
      setup() {
        createField();
        const firstFieldInput = fieldsContainer.querySelector(".field input[type='text']");
        firstFieldInput.value = "出力内容";
        const firstFieldTextarea = fieldsContainer.querySelector(".field textarea");
        firstFieldTextarea.value =
          "以下の内容を全て「エンジニア初心者でもわかりやすいように」丁寧に教えてください\n" +
          "・上司からのレビュー指摘内容の概要\n" +
          "・レビュー内容に「なぜ」修正した方がいいのかの詳細\n" +
          "・現状のコードの修正箇所を箇条書きで書き出す\n" +
          "・上記の修正箇所の修正コードを提供してください";

        createField();
        const secondFieldInput = fieldsContainer.querySelectorAll(".field input[type='text']")[1];
        secondFieldInput.value = "上司からのレビュー指摘内容";

        createField();
        const thirdFieldInput = fieldsContainer.querySelectorAll(".field input[type='text']")[2];
        thirdFieldInput.value = "対象コード";
      },
    },
    "explanation-checkbox": {
      mainText: "以下のやりとりを出力回答に沿って回答してください",
      setup() {
        createField();
        const firstFieldInput = fieldsContainer.querySelector(".field input[type='text']");
        firstFieldInput.value = "出力内容";
        const firstFieldTextarea = fieldsContainer.querySelector(".field textarea");
        firstFieldTextarea.value =
          "以下の内容を全て「エンジニア初心者でもわかりやすいように」丁寧に教えてください\n" +
          "・やりとりの概要\n" +
          "・結果どうなったのか\n" +
          "・上記の結果に至るまでの経緯を説明してください";

        createField();
        const secondFieldInput = fieldsContainer.querySelectorAll(".field input[type='text']")[1];
        secondFieldInput.value = "やりとり";
      },
    },
    "code-analysis": {
      mainText: "以下の出力回答に沿ってコードの解析をしてください",
      setup() {
        createField();
        const firstFieldInput = fieldsContainer.querySelector(".field input[type='text']");
        firstFieldInput.value = "出力内容";
        const firstFieldTextarea = fieldsContainer.querySelector(".field textarea");
        firstFieldTextarea.value =
          "以下の内容を全て「エンジニア初心者でもわかりやすいように」丁寧に教えてください\n" +
          "・対象コードの全体的な概要\n" +
          "・対象コードの変数や関数ごとに処理を全て時系列で詳細におしえて\n" +
          "・対象コードの押さえておくべきホポイント3つ";

        createField();
        const secondFieldInput = fieldsContainer.querySelectorAll(".field input[type='text']")[1];
        secondFieldInput.value = "対象のコード";
      },
    },
  };

  Object.entries(checkboxConfigs).forEach(([id, cfg]) => {
    const checkbox = document.getElementById(id);
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        uncheckOtherCheckboxes(this);
        resetForm();
        mainQuestion.value = cfg.mainText;
        cfg.setup();
      }
      updateOutput();
    });
  });
  // ----------------------------------------------------------------------
}

/**
 * フォームに新しい入力フィールドを追加する。
 * - タイトル入力と本文テキストエリアを持つフィールドブロックを生成
 * - 並び替え・削除・折りたたみ等の UI 操作用ボタンを付与
 * - 共通ワードボタンでタイトル入力をサポート
 * - 追加後に `updateOutput()` を呼び出してプレビューを更新
 */
function createField() {
  fieldCount++;
  const field = document.createElement("div");
  field.className = "field";

  field.innerHTML = `
    <div class="field-header">
      <button type="button" class="toggle-btn active">▲</button>
      <input type="text" class="title-input" placeholder="タイトル">
      <div class="header-buttons">
        <button type="button" class="up-btn">▲</button>
        <button type="button" class="down-btn">▼</button>
        <button type="button" class="delete-btn">削除</button>
      </div>
    </div>
    <div class="common-words-content">
      <div class="common-words-general">
        <button type="button" class="common-word-btn" data-word="出力内容">出力内容</button>
        <button type="button" class="common-word-btn" data-word="コード">コード</button>
        <button type="button" class="common-word-btn" data-word="エラー内容">エラー内容</button>
      </div>
      <div class="common-words-file">
        <button type="button" class="common-word-btn" data-word="TSファイル">TSファイル</button>
        <button type="button" class="common-word-btn" data-word="HTMLファイル">HTMLファイル</button>
        <button type="button" class="common-word-btn" data-word="SCSSファイル">SCSSファイル</button>
        <button type="button" class="common-word-btn" data-word="テストファイル">テストファイル</button>
      </div>
    </div>
    <div class="field-content" style="display: block;">
      <textarea rows="8" placeholder="内容"></textarea>
    </div>
  `;

  const toggleBtn = field.querySelector(".toggle-btn");
  const upBtn = field.querySelector(".up-btn");
  const downBtn = field.querySelector(".down-btn");
  const content = field.querySelector(".field-content");
  const titleInput = field.querySelector(".title-input");
  const commonWordButtons = field.querySelectorAll(".common-word-btn");

  toggleBtn.addEventListener("click", () => {
    const isVisible = content.style.display === "block";
    content.style.display = isVisible ? "none" : "block";
    toggleBtn.textContent = isVisible ? "▼" : "▲";
    toggleBtn.classList.toggle("active", !isVisible);
  });

  upBtn.addEventListener("click", () => {
    if (field.previousElementSibling) {
      fieldsContainer.insertBefore(field, field.previousElementSibling);
      updateOutput();
    }
  });

  downBtn.addEventListener("click", () => {
    if (field.nextElementSibling) {
      fieldsContainer.insertBefore(field.nextElementSibling, field);
      updateOutput();
    }
  });

  field.querySelector(".delete-btn").addEventListener("click", () => {
    field.remove();
    fieldCount--;
    updateOutput();
  });

  // ✅ クリックしたボタンのワードだけをセットする
  commonWordButtons.forEach((button) => {
    button.addEventListener("click", () => {
      titleInput.value = button.dataset.word; // クリックしたワードのみセット
      updateOutput();
    });
  });

  fieldsContainer.appendChild(field);
  field.querySelectorAll("input, textarea").forEach((element) => {
    element.addEventListener("input", updateOutput);
  });

  updateOutput();
}

/**
 * フォームをリセットして初期状態に戻す。
 * - メイン質問テキストエリアをクリア
 * - すべての動的フィールドを削除
 * - フィールド数カウンタ `fieldCount` を 0 に戻す
 * UI を空の状態にしてから `updateOutput()` は呼ばない（呼び出し元で更新）
 */
function resetForm() {
  document.getElementById("main-question").value = "";
  document.querySelectorAll(".field").forEach((field) => field.remove());
  fieldCount = 0;
}

/**
 * プリセットチェックボックス群を相互排他で管理するヘルパー。
 * 渡されたチェックボックス以外をすべて未選択にする。
 * @param {HTMLInputElement} exceptCheckbox - チェックを残したいチェックボックス
 */
function uncheckOtherCheckboxes(exceptCheckbox) {
  [
    "question-checkbox",
    "error-checkbox",
    "variable-name-checkbox",
    "refactor-checkbox",
    "review-checkbox",
    "explanation-checkbox",
    "code-analysis",
  ].forEach((id) => {
    const cb = document.getElementById(id);
    if (cb !== exceptCheckbox) cb.checked = false;
  });
}
