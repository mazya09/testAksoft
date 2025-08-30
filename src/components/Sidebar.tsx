import { Layout, Menu, Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { routes, AppRoute } from "./routes";
import "./Sidebar.css";

const { Sider } = Layout;

export const generateMenuItems = (
  routes: AppRoute[],
  collapsed: boolean
): MenuProps["items"] =>
  routes.map((route) => {
    const iconElement = route.icon; // иконка отдельно

    if (route.children) {
      // SubMenu
      return {
        key: route.key,
        icon: iconElement,
        // Label для SubMenu: только текст, иконка уже через icon
        label: collapsed ? (
          <Tooltip title={route.label}>{route.label}</Tooltip>
        ) : (
          route.label
        ),
        children: generateMenuItems(route.children, collapsed),
      };
    }

    // Обычный пункт меню без children
    return {
      key: route.key,
      icon: iconElement,
      label: collapsed ? (
        <Tooltip title={route.label}>{route.label}</Tooltip>
      ) : (
        route.label
      ),
    };
  });

export const Sidebar: FC<{
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState<string>("");

  // Найти ключ текущего маршрута
  const findKeyByPath = (
    routes: AppRoute[],
    path: string
  ): string | undefined => {
    for (const r of routes) {
      if (r.path === path) return r.key;
      if (r.children) {
        const key = findKeyByPath(r.children, path);
        if (key) return key;
      }
    }
    return undefined;
  };

  useEffect(() => {
    const key = findKeyByPath(routes, location.pathname);
    if (key) setCurrent(key);
  }, [location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    const findRoute = (
      routes: AppRoute[],
      key: string
    ): AppRoute | undefined => {
      for (const r of routes) {
        if (r.key === key) return r;
        if (r.children) {
          const child = findRoute(r.children, key);
          if (child) return child;
        }
      }
      return undefined;
    };

    const route = findRoute(routes, e.key);
    if (route?.path) navigate(route.path);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={200}
      className={`sidebar ${
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
    >
      <Menu
        mode="inline"
        selectedKeys={[current]}
        onClick={onClick}
        inlineCollapsed={collapsed}
        items={generateMenuItems(routes, collapsed)}
      />
    </Sider>
  );
};
