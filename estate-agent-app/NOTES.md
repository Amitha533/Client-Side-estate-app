Files that cannot contain inline comments (brief notes):

- JSON files (manifest.json, package.json, package-lock.json, src/data/properties.json) — JSON does not support comments. See descriptions below:
  - `manifest.json`: browser PWA manifest (icons, start_url, colors).
  - `package.json`: project metadata and scripts.
  - `package-lock.json`: lockfile for exact dependency versions.
  - `src/data/properties.json`: sample property data used by the app.

- Binary/image files (public/images/*.png, *.jpg, favicon.ico) — cannot embed human-readable comments without altering the files.

If you'd like, I can add short README files next to those JSON or binary files explaining their purpose, or I can safely add non-functional fields (e.g., `description`) into `package.json` if you want that.