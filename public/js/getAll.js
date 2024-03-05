"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      const data = await fetch("http://localhost:4000/api/computers", {
        mode: "cors",
      });
      const result = await data.json();

      const resultset = document.getElementById("resultset");

      for (const computer of result) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(computer.id));
        tr.appendChild(createCell(computer.name));
        tr.appendChild(createCell(computer.type));
        tr.appendChild(createCell(computer.processor));
        tr.appendChild(createCell(computer.amount));
        resultset.appendChild(tr);
      }
    } catch (err) {
      showErrorMessage(err.message);
    }
  }
  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
  function showErrorMessage(message) {
    resultarea.innerHTML = `<h1>Error</h1><p>${message}</p>`;
    resultarea.setAttribute("class", "error");
  }
})();
