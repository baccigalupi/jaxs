await Bun.build({
  entrypoints: ["./src/jaxs.ts"],
  outdir: "./dist",
  minify: false,
})