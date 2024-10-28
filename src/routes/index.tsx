import Index from "../pages/Index";
import Chart from "../pages/Chart";
import RoleList from "@/pages/RoleList";
import RoleEdit from "@/pages/RoleEdit";
import Exception403 from "../pages/exception/403";
import Exception404 from "../pages/exception/404";
import Exception500 from "../pages/exception/500";
import ResultSuccess from "../pages/result/success";
import ResultFail from "../pages/result/fail";
import Login from "../pages/login/index";

// 因为 React Router v6 采用了相对路径的方式来定义路由，所以路由的 path 前不加 /
// 如果使用绝对路径来定义路由，即在路由的 path 前加 /, 此时子路由的 path 应该包含完整的父路由 path

const menuRoutes = [
  {
    path: "/",
    icon: "iconxitong",
    title: "首页",
    element: <Index />,
    children: [],
  },
  {
    path: "/chart",
    icon: "iconfenlei",
    title: "图表页",
    element: <Chart />,
    children: [],
  },
  {
    path: "/role",
    icon: "iconyonghuguanli",
    title: "角色页",
    children: [
      {
        path: "list",
        title: "角色列表",
        element: <RoleList />,
      },
      {
        path: "edit",
        title: "编辑角色",
        element: <RoleEdit />,
      },
    ],
  },
  {
    path: "/exception",
    icon: "iconyonghuguanli",
    title: "异常页",
    isHiddenInMenu: true,
    children: [
      {
        path: "/exception/403",
        title: "403",
        element: <Exception403 />,
      },
      {
        path: "/exception/404",
        title: "404",
        element: <Exception404 />,
      },
      {
        path: "/exception/500",
        title: "500",
        element: <Exception500 />,
      },
    ],
  },
  {
    path: "/result",
    icon: "iconyonghuguanli",
    title: "结果页",
    isHiddenInMenu: true,
    children: [
      {
        path: "/result/success",
        title: "成功页",
        element: <ResultSuccess />,
      },
      {
        path: "/result/fail",
        title: "失败页",
        element: <ResultFail />,
      },
    ],
  },
];

const globalRoutes = [
  {
    path: "/login",
    title: "登录页",
    element: <Login />,
  },
];

export { menuRoutes, globalRoutes };
