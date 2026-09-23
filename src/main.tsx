import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { localeFromPath } from "./i18n/config";
import { loadDict } from "./i18n/dictionaries";

// Load only the dictionary for the language in the URL before rendering, so the
// pre-rendered page is replaced by identical content without a flash.
loadDict(localeFromPath(window.location.pathname).code).finally(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
