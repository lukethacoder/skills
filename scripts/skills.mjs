import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../skills/", import.meta.url));

function findSkills(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findSkills(path);
    return entry.name === "SKILL.md" ? [path] : [];
  });
}

const files = findSkills(root).sort();

if (!process.argv.includes("--check")) {
  for (const file of files) console.log(relative(join(root, ".."), file));
  process.exit();
}

const errors = [];
const names = new Map();

for (const file of files) {
  const path = relative(join(root, ".."), file);
  const content = readFileSync(file, "utf8");
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)?.[1];

  if (!frontmatter) {
    errors.push(`${path}: missing YAML frontmatter`);
    continue;
  }

  const field = (name) =>
    frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1].replace(/^['"]|['"]$/g, "").trim();
  const name = field("name");
  const description = field("description");
  const directoryName = basename(dirname(file));

  if (!name) errors.push(`${path}: missing name`);
  else {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) errors.push(`${path}: name must use lowercase kebab-case`);
    if (name !== directoryName) errors.push(`${path}: name must match directory ${directoryName}`);
    if (names.has(name)) errors.push(`${path}: duplicate name also used by ${names.get(name)}`);
    names.set(name, path);
  }

  if (!description) errors.push(`${path}: missing description`);
  else if (description.length > 1024) errors.push(`${path}: description exceeds 1024 characters`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.length} skill${files.length === 1 ? "" : "s"}.`);
