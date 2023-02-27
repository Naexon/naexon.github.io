import { defineConfig } from "vite";

export default defineConfig(({_command, _mode}) => ({
    base: "/",
    // base: command === "build" ? "/website/" : "/",
}));