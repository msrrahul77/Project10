import express from "express";
import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

const versionsPath = join(__dirname, "app", "..");

// app/ এর ভেতরে v1, v2, v3... ফোল্ডার খুঁজবে
const versions = readdirSync(versionsPath).filter((f) => /^v\d+$/.test(f));

for (const version of versions) {
  const modulesPath = join(versionsPath, version, "modules");

  let modules;
  try {
    modules = readdirSync(modulesPath);
  } catch {
    continue; // modules ফোল্ডার না থাকলে skip
  }

  for (const mod of modules) {
    const routeFile = join(modulesPath, mod, "route", "index.js");

    try {
      const { default: moduleRouter } = await import(
        pathToFileURL(routeFile).href
      );
      router.use(`/api/${version}/${mod}`, moduleRouter);
      console.log(`✅ Loaded: /api/${version}/${mod}`);
    } catch {
      // route file না থাকলে skip
    }
  }
}

export default router;
