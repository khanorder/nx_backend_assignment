import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME =
  'production' === process.env.NODE_ENV
    ? 'config.yaml'
    : 'config.development.yaml';

export default function loadYamlConfig() {
  return yaml.load(
    readFileSync(join(process.cwd(), YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
}
