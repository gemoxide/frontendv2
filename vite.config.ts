import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteFonts from "vite-plugin-fonts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        svgr(),
        react(),
        ViteFonts({
            google: {
                families: ["Montserrat"],
            },
        }),
    ]
});
