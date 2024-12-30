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
        if (fieldCount < 2) createField();
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
      <input type="text" placeholder="タイトル">
      <div class="header-buttons">
        <button type="button" class="up-btn">▲</button>
        <button type="button" class="down-btn">▼</button>
        <button type="button" class="delete-btn">削除</button>
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
  if (exceptCheckbox !== document.getElementById("refactor-checkbox"))
    document.getElementById("refactor-checkbox").checked = false;
}
