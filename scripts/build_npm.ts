import { build, emptyDir } from '../build_deps.ts'

await emptyDir("./npm")

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  typeCheck: false,
  shims: {
    deno: {
      test: 'dev'
    }
  },
  package: {
    // package.json properties
    name: "cosmokit",
    version: Deno.args[0],
    description: "A collection of common utilities",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/shigma/cosmokit.git",
    },
    bugs: {
      url: "https://github.com/shigma/cosmokit/issues",
    },
    author: "Shigma <shigma10826@gmail.com>",
  }
})

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE")
Deno.copyFileSync("README.md", "npm/README.md")