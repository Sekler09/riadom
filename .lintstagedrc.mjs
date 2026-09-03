import path from 'node:path'

const SKIP_PACKAGES = new Set(['eslint-config', 'prettier-config', 'typescript-config'])

function toPosix(file) {
  return file.replaceAll('\\', '/')
}

function quote(value) {
  return `"${toPosix(value)}"`
}

function posixRelative(from, to) {
  return path.posix.relative(toPosix(path.resolve(from)), toPosix(path.resolve(to)))
}

function groupByWorkspace(filenames, kind) {
  /** @type {Record<string, string[]>} */
  const grouped = {}

  for (const filename of filenames) {
    const posix = toPosix(filename)
    const match = posix.match(new RegExp(`(?:^|/)(${kind})/([^/]+)/`))
    if (!match) continue

    const name = match[2]
    if (kind === 'packages' && SKIP_PACKAGES.has(name)) continue

    const dir = `${kind}/${name}`
    if (!grouped[dir]) grouped[dir] = []
    grouped[dir].push(filename)
  }

  return Object.entries(grouped).map(([dir, files]) => {
    const relativeFiles = files.map((file) => quote(posixRelative(dir, file))).join(' ')
    return `pnpm --dir ${quote(dir)} exec eslint -- ${relativeFiles}`
  })
}

export default {
  '*.{js,jsx,ts,tsx}': 'prettier --write',
  'apps/**/*.{js,jsx,ts,tsx}': (filenames) => groupByWorkspace(filenames, 'apps'),
  'packages/**/*.{js,jsx,ts,tsx}': (filenames) => groupByWorkspace(filenames, 'packages'),
  '*.{json,md,yml,yaml}': 'prettier --write',
}
