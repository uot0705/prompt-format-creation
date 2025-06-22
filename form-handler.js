let fieldCount = 0;
const fieldsContainer = document.getElementById("fields-container"); // グローバルスコープに移動

function initializeFormHandlers() {
  const mainQuestion = document.getElementById("main-question");
  const addFieldBtn = document.getElementById("add-field-btn");

  addFieldBtn.addEventListener("click", createField);

  document
    .getElementById("question-checkbox")
    .addEventListener("change", function () {
      if (this.checked) {
        uncheckOtherCheckboxes(this);
        resetForm();
        mainQuestion.value = "以下の質問に回答してください";
        createField();
        const firstField = fieldsContainer.querySelector(
          ".field input[type='text']"
        );
        firstField.value = "質問内容";
        if (fieldCount < 2) createField();
      }
      updateOutput();
    });

  document
    .getElementById("error-checkbox")
    .addEventListener("change", function () {
      if (this.checked) {
        uncheckOtherCheckboxes(this);
        resetForm();
        mainQuestion.value = "以下のエラー内容を解決してください";
        createField();
        const firstField = fieldsContainer.querySelector(
          ".field input[type='text']"
        );
        firstField.value = "エラー内容";

        // 2つめのフィールドに「エラーの詳細情報」を追加
        createField();
        const secondField = fieldsContainer.querySelectorAll(
          ".field input[type='text']"
        )[1];
        secondField.value = "出力内容";
        const secondFieldContent =
          fieldsContainer.querySelectorAll(".field textarea")[1];
        secondFieldContent.value =
          "以下の内容を全て「エンジニア初心者でもわかりやすいように」丁寧に教えてください\n・エラーの概要:\n・エラーの原因:\n・エラーの解決策:\n・解決策する為の具体的な方法(コードの修正の場合はコードを書く):";
      }
      updateOutput();
    });

  document
    .getElementById("variable-name-checkbox")
    .addEventListener("change", function () {
      if (this.checked) {
        uncheckOtherCheckboxes(this);
        resetForm();
        mainQuestion.value =
          "以下の変数の使い道に合う変数名を5個提案してください。\n提案する変数名は「シンプルな単語を使い」「意味が理解ができる」、「長くなりすぎない簡潔」な命名にしてください";

        // 1つめのフィールド: 「変数の使い道」
        createField();
        const firstField = fieldsContainer.querySelector(
          ".field input[type='text']"
        );
        firstField.value = "変数の使い道";

        // 2つめのフィールド: 「出力内容(以下の内容で5個)」
        createField();
        const secondField = fieldsContainer.querySelectorAll(
          ".field input[type='text']"
        )[1];
        secondField.value = "出力内容(以下の内容で5個)";
        const secondFieldContent =
          fieldsContainer.querySelectorAll(".field textarea")[1];
        secondFieldContent.value = "・変数名:\n・おすすめの理由：";
      }
      updateOutput();
    });

  document
    .getElementById("refactor-checkbox")
    .addEventListener("change", function () {
      if (this.checked) {
        uncheckOtherCheckboxes(this);
        resetForm();
        mainQuestion.value = "以下のリファクタをしてください";
        createField();

        const firstFieldInput = fieldsContainer.querySelector(
          ".field input[type='text']"
        );
        firstFieldInput.value = "出力内容";

        // 1つ目のフィールドのtextareaに詳細情報をセット
        const firstFieldTextarea =
          fieldsContainer.querySelector(".field textarea");
        firstFieldTextarea.value =
          "リファクタしたほうが良い箇所を「3箇所」選んでください。その3箇所の現在のコードを出力して、以下を「エンジニア初心者でもわかりやすいように」教えてください。\n" +
          "・なぜリファクタしたほうが良いか\n" +
          "・どのようなリファクタをすればいいのか\n" +
          "・リファクタしたコード";
      }
      updateOutput();
    });

  document
    .getElementById("review-checkbox")
    .addEventListener("change", function () {
      if (this.checked) {
        // 他のチェックボックスのチェックを外し、フォームをリセット
        uncheckOtherCheckboxes(this);
        resetForm();
        const mainQuestion = document.getElementById("main-question");

        // メインの質問フィールドに指定のテキストをセット
        mainQuestion.value =
          "上司からのレビュー指摘内容を以下の「出力内容」に沿って回答してください";

        // ---------------------------
        // 1つ目のフィールド：出力内容とその詳細をセット
        // ---------------------------
        createField();
        const firstFieldInput = fieldsContainer.querySelector(
          ".field input[type='text']"
        );
        firstFieldInput.value = "出力内容";

        // 1つ目のフィールドのtextareaに詳細情報をセット
        const firstFieldTextarea =
          fieldsContainer.querySelector(".field textarea");
        firstFieldTextarea.value =
          "以下の内容を全て「エンジニア初心者でもわかりやすいように」丁寧に教えてください\n" +
          "・上司からのレビュー指摘内容の概要\n" +
          "・レビュー内容に「なぜ」修正した方がいいのかの詳細\n" +
          "・現状のコードの修正箇所を箇条書きで書き出す\n" +
          "・上記の修正箇所の修正コードを提供してください";

        // ---------------------------
        // 2つ目のフィールド：上司からのレビュー指摘内容
        // ---------------------------
        createField();
        const secondFieldInput = fieldsContainer.querySelectorAll(
          ".field input[type='text']"
        )[1];
        secondFieldInput.value = "上司からのレビュー指摘内容";

        // ---------------------------
        // 3つ目のフィールド：対象コード
        // ---------------------------
        createField();
        const thirdFieldInput = fieldsContainer.querySelectorAll(
          ".field input[type='text']"
        )[2];
        thirdFieldInput.value = "対象コード";
      }
      updateOutput();
    });

  document
    .getElementById("explanation-checkbox")
    .addEventListener("change", function () {
      if (this.checked) {
        // 他のチェックボックスのチェックを外し、フォームをリセット
        uncheckOtherCheckboxes(this);
        resetForm();
        const mainQuestion = document.getElementById("main-question");

        // メインの質問フィールドに指定のテキストをセット
        mainQuestion.value = "以下のやりとりを出力回答に沿って回答してください";

        // ---------------------------
        // 1つ目のフィールド：出力内容とその詳細をセット
        // ---------------------------
        createField();
        const firstFieldInput = fieldsContainer.querySelector(
          ".field input[type='text']"
        );
        firstFieldInput.value = "出力内容";

        // 1つ目のフィールドのtextareaに詳細情報をセット
        const firstFieldTextarea =
          fieldsContainer.querySelector(".field textarea");
        firstFieldTextarea.value =
          "以下の内容を全て「エンジニア初心者でもわかりやすいように」丁寧に教えてください\n" +
          "・やりとりの概要\n" +
          "・結果どうなったのか\n" +
          "・上記の結果に至るまでの経緯を説明してください";

        // ---------------------------
        // 2つ目のフィールド：上司からのレビュー指摘内容
        // ---------------------------
        createField();
        const secondFieldInput = fieldsContainer.querySelectorAll(
          ".field input[type='text']"
        )[1];
        secondFieldInput.value = "やりとり";
      }
      updateOutput();
    });

  document
    .getElementById("code-analysis")
    .addEventListener("change", function () {
      if (this.checked) {
        // 他のチェックボックスのチェックを外し、フォームをリセット
        uncheckOtherCheckboxes(this);
        resetForm();
        const mainQuestion = document.getElementById("main-question");

        // メインの質問フィールドに指定のテキストをセット
        mainQuestion.value = "以下の出力回答に沿ってコードの解析をしてください";

        // ---------------------------
        // 1つ目のフィールド：出力内容とその詳細をセット
        // ---------------------------
        createField();
        const firstFieldInput = fieldsContainer.querySelector(
          ".field input[type='text']"
        );
        firstFieldInput.value = "出力内容";

        // 1つ目のフィールドのtextareaに詳細情報をセット
        const firstFieldTextarea =
          fieldsContainer.querySelector(".field textarea");
        firstFieldTextarea.value =
          "以下の内容を全て「エンジニア初心者でもわかりやすいように」丁寧に教えてください\n" +
          "・対象コードの全体的な概要\n" +
          "・対象コードの変数や関数ごとに処理を全て時系列で詳細におしえて\n" +
          "・対象コードの押さえておくべきホポイント3つ";

        // ---------------------------
        // 2つ目のフィールド：上司からのレビュー指摘内容
        // ---------------------------
        createField();
        const secondFieldInput = fieldsContainer.querySelectorAll(
          ".field input[type='text']"
        )[1];
        secondFieldInput.value = "対象のコード";
      }
      updateOutput();
    });
}

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

function resetForm() {
  document.getElementById("main-question").value = "";
  document.querySelectorAll(".field").forEach((field) => field.remove());
  fieldCount = 0;
}

function uncheckOtherCheckboxes(exceptCheckbox) {
  if (exceptCheckbox !== document.getElementById("question-checkbox"))
    document.getElementById("question-checkbox").checked = false;
  if (exceptCheckbox !== document.getElementById("error-checkbox"))
    document.getElementById("error-checkbox").checked = false;
  if (exceptCheckbox !== document.getElementById("variable-name-checkbox"))
    document.getElementById("variable-name-checkbox").checked = false;
  if (exceptCheckbox !== document.getElementById("refactor-checkbox"))
    document.getElementById("refactor-checkbox").checked = false;
  if (exceptCheckbox !== document.getElementById("review-checkbox"))
    document.getElementById("review-checkbox").checked = false;
}
