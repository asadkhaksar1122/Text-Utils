import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Text-Utils/",
  server: {
    host: "0.0.0.0", // Allows access from network devices
    port: 5173, // Default port
  },
});
