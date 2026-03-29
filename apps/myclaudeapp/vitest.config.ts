import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
        globals: true,
        include: ["src/**/*.test.{ts,tsx}"],
        reporters: ["verbose"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "next/link": path.resolve(__dirname, "./src/test/mocks/next-link.tsx"),
        },
    },
});
