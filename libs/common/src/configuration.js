"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadYamlConfig;
const fs_1 = require("fs");
const yaml = require("js-yaml");
const path_1 = require("path");
const YAML_CONFIG_FILENAME = 'production' === process.env.NODE_ENV
    ? 'config.yaml'
    : 'config.development.yaml';
function loadYamlConfig() {
    return yaml.load((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), YAML_CONFIG_FILENAME), 'utf8'));
}
//# sourceMappingURL=configuration.js.map