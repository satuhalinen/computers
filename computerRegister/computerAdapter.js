"use strict";

function adapt(item) {
  return Object.assign(item, {
    id: +item.id,
    amount: +item.amount,
  });
}

module.exports = { adapt };
