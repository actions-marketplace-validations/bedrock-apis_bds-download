import { defineConfig } from 'rolldown'

export default defineConfig({
  input: 'src/main.ts',
  external: [
    /node:/g
  ]
})