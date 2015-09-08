"use strict";
var joust = require('jupyter-js-output-area');
// Since I can't import _ from ...
var OutputModel = joust.OutputModel, OutputView = joust.OutputView;

class Sidecar {
  constructor(container, document) {
    this.document = document;
    this.container = container;

    // parentID -> OutputArea
    this.areas = new Map();
  }

  consume(message) {
    if (! message.parent_header && ! message.parent_header.msg_id) {
        return;
    }

    var parentID = message.parent_header.msg_id;
    var area = this.areas[parentID];

    if(!area) {
      // Create it
      area = new OutputArea(this.document);
      area.el.id = parentID; // For later bookkeeping
      this.container.appendChild(area.el);

      // Keep a running tally of output areas
      this.areas[parentID] = area;
    }

    var consumed = area.consume(message);
    if (consumed) {
      area.el.scrollIntoView();
    }

    return consumed;

  }
}

class OutputArea {
  constructor(document) {
    this.model = new OutputModel();
    this.view = new OutputView(this.model, document);

    this.el = this.view.el;
  }

  consume(message) {
    return this.model.consumeMessage(message);
  }
}

module.exports = Sidecar;
