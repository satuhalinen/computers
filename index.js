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
const { DataStorageLayer } = require(dataStoragePath);
const dataStorageLayer = new DataStorageLayer();

app.use(cors());
app.use(express.json());

app.get("/api/computers", (req, res) => {
  const result = dataStorageLayer.getAll();
  res.json(result);
});

app.get(`/api/computers/:id`, (req, res) => {
  const id = +req.params.id;
  const result = dataStorageLayer.get(id);
  res.json(result);
});

app.post("/api/computers", (req, res) => {
  const result = dataStorageLayer.insert(req.body);
  res.json(result);
});

app.all("*", (req, res) => res.json("not supported"));

app.listen(port, host, () => console.log(`${host}:${port} serving...`));
