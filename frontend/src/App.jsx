import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import Dashboard from "./pages/Dashboard";
import Gateways from "./pages/Gateways";
import Backups from "./pages/Backups";
import Settings from "./pages/Settings";
import ApiKeys from "./pages/ApiKeys";

export default function App() {

  return (

    <BrowserRouter>

      <div className="flex h-screen bg-slate-900 text-white">

        <Sidebar />

        <div className="flex flex-col flex-1">

          <Header />

          <main className="flex-1 p-6 overflow-auto">

            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/gateways"
                element={<Gateways />}
              />

              <Route
                path="/backups"
                element={<Backups />}
              />

              <Route
                path="/keys"
                element={<ApiKeys />}
              />

              <Route
                path="/settings"
                element={<Settings />}
              />

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>

  );

}