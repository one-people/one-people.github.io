import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "@arco-design/web-react";
import Layout from "@/layout";
import { menuRoutes, globalRoutes } from "./routes";
import "./App.css";

const PageTitle = ({ route }: any) => {
  const { title, element } = route;
  document.title = title || "";
  return <>{element}</>;
};

const App = () => {
  const renderRoutes = (routes: any) =>
    routes.map((route: any) =>
      route.children?.length ? (
        <Route key={route.path} path={route.path}>
          {renderRoutes(route.children)}
        </Route>
      ) : (
        <Route
          key={route.path}
          path={route.path}
          element={<PageTitle route={route} />}
        />
      )
    );

  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout menuRoutes={menuRoutes} />}>
            {renderRoutes(menuRoutes)}
          </Route>
          {renderRoutes(globalRoutes)}
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
