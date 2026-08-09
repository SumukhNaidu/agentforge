import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import ModelManager from "@/pages/ModelManager";
import Chat from "@/pages/Chat";
import PromptLab from "@/pages/PromptLab";
import RAGStudio from "@/pages/RAGStudio";
import Agents from "@/pages/Agents";
import Evaluation from "@/pages/Evaluation";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

import MainLayout from "@/layouts/MainLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/models"
            element={<ModelManager />}
          />

          <Route
            path="/chat"
            element={<Chat />}
          />

          <Route
            path="/prompt-lab"
            element={<PromptLab />}
          />

          <Route
            path="/rag"
            element={<RAGStudio />}
          />

          <Route
            path="/agents"
            element={<Agents />}
          />

          <Route
            path="/evaluation"
            element={<Evaluation />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}