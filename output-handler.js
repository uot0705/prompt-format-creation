function initializeOutputHandlers() {
  const mainQuestion = document.getElementById("main-question");

  mainQuestion.addEventListener("input", updateOutput);
}

function updateOutput() {
  const mainQuestionOutput = document.getElementById("main-question-output");
  const fieldsOutput = document.getElementById("fields-output");

  mainQuestionOutput.innerHTML = marked.parse(
    document.getElementById("main-question").value
  );

  const fields = document.querySelectorAll(".field");
  fieldsOutput.innerHTML = "";

  fields.forEach((field) => {
    const title = field.querySelector("input[type='text']").value;
    const content = field.querySelector("textarea").value;

    const titleElement = document.createElement("div");
    titleElement.innerHTML = marked.parse(`## ${title}`);

    const contentElement = document.createElement("pre");
    contentElement.innerHTML = marked.parse(`\`\`\`\n${content}\n\`\`\``);

    fieldsOutput.appendChild(titleElement);
    fieldsOutput.appendChild(contentElement);
  });
}
