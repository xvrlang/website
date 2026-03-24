const REPO_OWNER = "xvrlang";
const REPO_NAME = "xvr";
const DOCS_DIR = "docs";

const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/docs`;
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/docs`;

const DOCS_MAP = {
  "LLVM.md": "developer-documentation/LLVM.md",
  "SECD.md": "developer-documentation/SECD.md",
  "print_handler.md": "developer-documentation/print_handler.md",
  "stdlib.md": "developer-documentation/stdlib.md",
  "opcode.data.txt": "developer-documentation/opcode.data.txt",
  "chapter1.md": "guide/installation.md",
  "chapter2.md": "guide/playing-with-litereals.md",
  "chapter3.md": "guide/working-with-variables.md",
  "chapter4.md": "guide/what-is-logic-operator.md",
  "chapter5.md": "guide/playing-with-coditional.md",
  "chapter6.md": "guide/are-you-good-at-math.md",
  "chapter7.md": "guide/lets-we-repeat-some-name.md",
  "chapter8.md": "guide/can-we-make-some-custom-statement.md",
  "chapter9.md": "guide/congratulation.md",
};

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function getAllDocFiles() {
  const files = await fetchJSON(API_BASE);
  const mdFiles = [];
  
  for (const f of files) {
    if (f.type === "file" && (f.name.endsWith(".md") || f.name.endsWith(".txt"))) {
      mdFiles.push({ name: f.name, path: f.path, downloadUrl: f.download_url });
    } else if (f.type === "dir" && f.name === "tutorial") {
      const tutorialFiles = await fetchJSON(f.url);
      for (const tf of tutorialFiles) {
        if (tf.type === "file" && tf.name.endsWith(".md")) {
          mdFiles.push({ name: tf.name, path: tf.path, downloadUrl: tf.download_url });
        }
      }
    }
  }
  
  return mdFiles;
}

async function syncDocs() {
  console.log("Fetching docs list from GitHub...");
  const mdFiles = await getAllDocFiles();
  
  console.log(`Found ${mdFiles.length} doc files`);
  
  for (const file of mdFiles) {
    const localPath = DOCS_MAP[file.path] || DOCS_MAP[file.name];
    if (!localPath) {
      console.log(`Skipping: ${file.path} (not in DOCS_MAP)`);
      continue;
    }
    
    console.log(`Syncing: ${file.path} -> ${localPath}`);
    const content = await fetchText(file.downloadUrl);
    
    const fs = await import("fs");
    const fullPath = `${DOCS_DIR}/${localPath}`;
    const dir = fullPath.substring(0, fullPath.lastIndexOf("/"));
    
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content);
  }
  
  console.log("Done!");
}

syncDocs().catch(e => {
  console.error(e);
  process.exit(1);
});
