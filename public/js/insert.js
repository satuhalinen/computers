"use strict";

(function () {
  let idField;
  let nameField;
  let typeField;
  let processorField;
  let amountField;
  let resultarea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    idField = document.getElementById("id");
    nameField = document.getElementById("name");
    typeField = document.getElementById("type");
    processorField = document.getElementById("processor");
    amountField = document.getElementById("amount");

    document.getElementById("submit").addEventListener("click", send);

    idField.addEventListener("focus", clear);
  }

  function clear() {
    idField.value = "";
    nameField.value = "";
    typeField.value = "";
    processorField.value = "";
    amountField.value = "";
    resultarea.textContent = "";
    resultarea.removeAttribute("class");
  }

  async function send() {
    const computer = {
      id: +idField.value,
      name: nameField.value,
      type: typeField.value,
      processor: processorField.value,
      amount: +amountField.value,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(computer),
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      };
      const data = await fetch("http://localhost:4000/api/computers", options);
      const result = await data.json();

      updateStatus(result);
    } catch (err) {
      updateStatus({ message: err.message, type: "error" });
    }
  }

  function updateStatus(status) {
    resultarea.textContent = status.message;
    resultarea.setAttribute("class", status.type);
  }
})();
