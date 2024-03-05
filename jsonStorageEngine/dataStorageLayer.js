"use strict";

const { createStorageLayer } = require("./storageLayer");

function createDataStorage(storagePath, storageConfig) {
  const { getAllFromStorage, getFromStorage, getKeys, resource } =
    createStorageLayer(storagePath, storageConfig);

  class Datastorage {
    get PRIMARY_KEY() {
      return primary_key;
    }
    get KEYS() {
      return getKeys();
    }
    get RESOURCE() {
      return resource;
    }
    getAll() {
      return getAllFromStorage();
    }

    get(value, key = primary_key) {
      return getFromStorage(value, key);
    }
  }

  return new Datastorage();
}

module.exports = { createDataStorage };
