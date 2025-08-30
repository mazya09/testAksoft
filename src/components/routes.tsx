import React from "react";
import {
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Dashboard from "./Dashboard/Dashboard";
import Calendar from "./Calendar/Calendar";
import СonditionalComp from "./СonditionalComp/СonditionalComp";

export type AppRoute = {
  key: string;
  label: string;
  path?: string;
  icon?: React.ReactNode;
  component?: React.FC;
  children?: AppRoute[];
};

export const routes: AppRoute[] = [
  {
    key: "dashboard",
    label: "Записи",
    icon: <DashboardOutlined/> ,
    path: "/dashboard",
    component: Dashboard,
  },
  {
    key: "calendar",
    label: "Календарь",
    icon: <CalendarOutlined />,
    path: "/calendar",
    component: Calendar,
  },
  {
    key: "users",
    label: "Сотрудники",
    icon: <UserOutlined />,
    children: [
      {
        key: "users-list",
        label: "Список пользователей",
        path: "/users",
        icon: <CalendarOutlined />,
        component: СonditionalComp,
      },
      {
        key: "users-add",
        label: "Добавить пользователя",
        path: "/users/add",
        icon: <CalendarOutlined />,
        component: СonditionalComp,
      },
    ],
  },
];
