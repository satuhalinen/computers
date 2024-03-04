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

  return {
    getAllFromStorage,
    primary_key,
    resource,
  };
}

module.exports = { createStorageLayer };
