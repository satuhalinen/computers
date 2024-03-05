"use strict";

(function () {
  let idField;
  let nameField;
  let typeField;
  let processorField;
  let amountField;

  let resultarea;

  let searchState = true;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    idField = document.getElementById("id");
    nameField = document.getElementById("name");
    typeField = document.getElementById("type");
    processorField = document.getElementById("processor");
    amountField = document.getElementById("amount");

    resultarea = document.getElementById("resultarea");

    updateFieldsAccess();

    document.getElementById("submit").addEventListener("click", send);

    document.getElementById("clear").addEventListener("click", reset);

    idField.addEventListener("focus", clearAll);
  }

  function reset() {
    searchState = true;
    clearAll();
  }

  function clearAll() {
    if (searchState) {
      idField.value = "";
      nameField.value = "";
      typeField.value = "";
      (processorField.value = ""), (amountField.value = "");
      resultarea.textContent = "";
      resultarea.removeAttribute("class");
      updateFieldsAccess();
    }
  }

  function updateFieldsAccess() {
    if (searchState) {
      idField.removeAttribute("readonly");
      nameField.setAttribute("readonly", true);
      typeField.setAttribute("readonly", true);
      processorField.setAttribute("readonly", true);
      amountField.setAttribute("readonly", true);
    } else {
      idField.setAttribute("readonly", true);
      nameField.removeAttribute("readonly");
      typeField.removeAttribute("readonly");
      processorField.removeAttribute("readonly");
      amountField.removeAttribute("readonly");
    }
  }

  async function send() {
    const baseUri = "http://localhost:4000/rest/computers";
    try {
      if (searchState) {
        const data = await fetch(`${baseUri}/id/${idField.value}`, {
          mode: "cors",
        });
        const result = await data.json();

        if (result.length > 0) {
          const computer = result[0];
          idField.value = computer.id;
          nameField.value = computer.name;
          typeField.value = computer.type;
          processorField.value = computer.processor;
          amountField.value = computer.amount;
          searchState = false;
          updateFieldsAccess();
        } else {
          updateStatus({ message: "Nothing found", type: "error" });
        }
      } else {
        const computer = {
          id: +idField.value,
          name: nameField.value,
          type: typeField.value,
          processor: processorField.value,
          amount: +amountField.value,
        };
        const options = {
          method: "PUT",
          mode: "cors",
          body: JSON.stringify(computer),
          headers: { "Content-Type": "application/json" },
        };

        const data = await fetch(`${baseUri}/${computer.id}`, options);
        const result = await data.json();

        updateStatus(result);
        searchState = true;
        updateFieldsAccess();
      }
    } catch (error) {
      updateStatus({ message: error.message, type: "error" });
    }
  }

  function updateStatus(status) {
    resultarea.textContent = status.message;
    resultarea.setAttribute("class", status.type);
  }
})();
