"use strict";

const CODES = {
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
};

const TYPES = {
  ERROR: "error",
  INFO: "info",
};

const MESSAGES = {
  INSERT_OK: (key, value) => ({
    message: `Resource with ${key} ${value} was inserted`,
    code: CODES.INSERT_OK,
    type: TYPES.INFO,
  }),
  NOT_INSERTED: () => ({
    message: "Resource was not inserted",
    code: CODES.NOT_INSERTED,
    type: TYPES.ERROR,
  }),
  ALREADY_IN_USE: (value) => ({
    message: `Key ${value} was already in use`,
    code: CODES.ALREADY_IN_USE,
    type: TYPES.ERROR,
  }),
};

module.exports = { CODES, TYPES, MESSAGES };
