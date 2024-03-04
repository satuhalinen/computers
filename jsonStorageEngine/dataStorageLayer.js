"use strict";

const { createStorageLayer } = require("./storageLayer");

function createDataStorage(storagePath, storageConfig) {
  const { getAllFromStorage, resource } = createStorageLayer(
    storagePath,
    storageConfig
  );

  class Datastorage {
    get RESOURCE() {
      return resource;
    }
    getAll() {
      return getAllFromStorage();
    }
  } //end of class

  return new Datastorage();
}

module.exports = { createDataStorage };
