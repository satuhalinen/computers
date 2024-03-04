"use strict";

const path = require("path");
const cors = require("cors");

const express = require("express");
const app = express();

const { port, host, storageEngine, storage } = require("./config.json");

const storageEnginePath = path.join(__dirname, storageEngine.folder);

const dataStoragePath = path.join(
  storageEnginePath,
  storageEngine.dataStorageFile
);

const storagePath = path.join(__dirname, storage.folder);
const { createDataStorage } = require(dataStoragePath);
const dataStorage = createDataStorage(storagePath, storage.storageConfigFile);

const RESOURCE = dataStorage.RESOURCE;

app.use(cors());
app.use(express.json());

app.get("/rest", (req, res) => res.json(RESOURCE));

app.get(`/rest/${RESOURCE}`, (req, res) =>
  dataStorage.getAll().then((result) => res.json(result))
);

app.all("*", (req, res) => res.json("not supported"));
const menuPath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(menuPath));

app.listen(port, host, () => console.log(`${host}:${port} serving...`));
