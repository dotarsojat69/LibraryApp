import ReactDOM from "react-dom/client";

import { Toaster } from "@/components/ui/toaster";
import App from "@/root";

import { TokenProvider } from "@/utils/context/token";
import { ThemeProvider } from "@/utils/context/theme";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <ThemeProvider>
       <App />
      <Toaster />
    </ThemeProvider>
  </TokenProvider>
);