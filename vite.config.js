import { defineConfig } from "vite";
import { resolve, join } from "path";
import { sync } from "glob";

export default defineConfig(({_command, _mode}) => ({
    base: "/",
    root: join(__dirname, "src"),
    build: {
        outDir: join(__dirname, "dist"),
        emptyOutDir: true,
        rollupOptions: {
            input: sync(resolve(__dirname, "src", "**/*.html")),
            output: {
                entryFileNames: "assets/scripts/[name]-[hash].js",
                chunkFileNames: "assets/scripts/[name]-[hash].js",
                assetFileNames: (info) => {
                    const ext = info.name.split(".").pop();
                    
                    // add more extensions if needed
                    switch (ext) {
                        case "js":
                            return "assets/scripts/[name]-[hash].js";

                        case "css":
                            return "assets/styles/[name]-[hash].css";

                        case "png": case "jpg": case "jpeg": case "gif": case "svg": case "ico":
                            return "assets/images/[name]-[hash].[ext]";

                        case "ttf":
                            return "assets/fonts/[name]-[hash].[ext]";

                        default:
                            return "assets/[name]-[hash].[ext]";
                    }
                },
            },
        },
    },
}));