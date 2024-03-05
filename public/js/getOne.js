"use strict";

(function () {
  let keylist;
  let resultarea;
  let searchvalue;

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    keylist = document.getElementById("keylist");
    resultarea = document.getElementById("resultarea");
    searchvalue = document.getElementById("searchvalue");

    try {
      const data = await fetch("http://localhost:4000/api/computers/keys", {
        mode: "cors",
      });
      if (data.ok) {
        const keys = await data.json();
        if (keys.length > 0) {
          populateList(keys);
        } else {
          showErrorMessage("search not available");
        }
      } else {
        showErrorMessage("failed communication!");
      }
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  function populateList(keynames) {
    for (const field of keynames) {
      const option = document.createElement("option");
      option.value = field;
      option.textContent = field;

      keylist.appendChild(option);
    }

    keylist.value = keynames[0];

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    const keyName = keylist.value;
    const value = searchvalue.value;

    try {
      const data = await fetch(
        `http://localhost:4000/api/computers/${keyName}/${value}`,
        { mode: "cors" }
      );

      const result = await data.json();

      updatePage(result);
    } catch (err) {
      showErrorMessage(err.message);
    }
  }

  function updatePage(data) {
    if (!data) {
      showErrorMessage("Programming error!");
    } else if (data.length === 0) {
      showErrorMessage("Nothing found");
    } else {
      const htmlString = data.map((item) => createComputer(item)).join(" ");
      resultarea.innerHTML = htmlString;
    }
  }

  function createComputer(computer) {
    return `<div class="computer">
        <p>id: ${computer.id}</p>
        <p>name: ${computer.name}</p>
        <p>type: ${computer.type}</p>
        <p>processor: ${computer.processor}</p>
        <p>amount: ${computer.amount}</p>
    </div>`;
  }

  function showErrorMessage(message) {
    resultarea.innerHTML = `<h1>Error</h1><p>${message}</p>`;
    resultarea.setAttribute("class", "error");
  }
})();
