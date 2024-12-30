function initializeClipboardHandlers() {
  const copyBtn = document.getElementById("copy-btn");
  const fixedCopyBtn = document.getElementById("fixed-copy-btn");

  copyBtn.addEventListener("click", copyToClipboard);
  fixedCopyBtn.addEventListener("click", copyToClipboard);
}

function copyToClipboard() {
  let outputText = `${document
    .getElementById("main-question-output")
    .textContent.trim()}\n\n`;

  document.querySelectorAll(".field").forEach((field) => {
    const title = field.querySelector("input[type='text']").value;
    const content = field.querySelector("textarea").value;
    outputText += `## ${title}\n\`\`\`\n${content}\n\`\`\`\n\n`;
  });

  navigator.clipboard.writeText(outputText).then(() => {
    const copyBtn = document.getElementById("copy-btn");
    const fixedCopyBtn = document.getElementById("fixed-copy-btn");

    copyBtn.textContent = "コピペ成功";
    copyBtn.classList.add("success");
    fixedCopyBtn.textContent = "コピペ成功";
    fixedCopyBtn.classList.add("success");

    setTimeout(() => {
      copyBtn.textContent = "コピペ";
      copyBtn.classList.remove("success");
      fixedCopyBtn.textContent = "コピペ";
      fixedCopyBtn.classList.remove("success");
    }, 2000);
  });
}
