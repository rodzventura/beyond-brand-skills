// Copia aurora-tokens.json do repositório da marca para este projeto.
// Uso: AURORA_BRAND_DIR=/caminho/para/aurora-brand npm run tokens:sync
// Quem só vai publicar a LP não precisa disto: o JSON já vem versionado em src/design/.
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brandDir =
  process.env.AURORA_BRAND_DIR ?? path.join(os.homedir(), "beyond-brand-skills/aurora/aurora-brand");
const src = path.join(brandDir, "aurora-tokens.json");

if (!existsSync(src)) {
  console.error(`Não encontrei ${src}. Defina AURORA_BRAND_DIR.`);
  process.exit(1);
}
const dest = path.join(root, "src/design/aurora-tokens.json");
const antes = JSON.parse(readFileSync(dest, "utf8")).meta.versao;
copyFileSync(src, dest);
const depois = JSON.parse(readFileSync(dest, "utf8")).meta.versao;
console.log(`aurora-tokens.json: ${antes} → ${depois}`);
