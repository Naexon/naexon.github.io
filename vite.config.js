import { defineConfig } from "vite";

export default defineConfig(({_command, _mode}) => ({
    base: "/",
    root: "src",
    build: {
        outDir: "../dist",
    },
}));