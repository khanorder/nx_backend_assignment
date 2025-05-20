import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME =
  'production' === process.env.NODE_ENV
    ? 'config.yaml'
    : 'config.development.yaml';

export default function loadYamlConfig() {
  const raw = readFileSync(join(process.cwd(), YAML_CONFIG_FILENAME), 'utf8');
  const interpolated = raw.replace(/\$\{(\w+)\}/g, (_, key) => process.env[key] ?? '');
  return yaml.load(interpolated) as Record<string, any>;
}
