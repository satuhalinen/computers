"use strict";

const path = require("path");

const { readStorage } = require("./reader");

function createStorageLayer(storageFolder, storageConfigFile) {
  const storageConfig = path.join(storageFolder, storageConfigFile);

  const {
    storageFile,
    adapterFile,
    primary_key,
    resource,
  } = require(storageConfig);

  const { adapt } = require(path.join(storageFolder, adapterFile));

  const storageFilePath = path.join(storageFolder, storageFile);

  async function getAllFromStorage() {
    return await readStorage(storageFilePath);
  }

  async function getFromStorage(value, key = primary_key) {
    return (await readStorage(storageFilePath)).filter(
      (item) => item[key] == value
    );
  }
  async function getKeys() {
    const storage = await readStorage(storageFilePath);
    const keys = new Set(storage.flatMap((item) => Object.keys(item)));
    return [...keys];
  }

  return {
    getAllFromStorage,
    getFromStorage,
    getKeys,
    primary_key,
    resource,
  };
}

module.exports = { createStorageLayer };
