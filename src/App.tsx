import { JSX, useState } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, routes } from './components/routes';
import { Sidebar } from './components/Sidebar';

const { Content } = Layout;

  const renderRoutes = (routes: AppRoute[]): JSX.Element[] =>
  routes.flatMap((r) => {
    if (r.children) return renderRoutes(r.children);
    if (r.path && r.component) {
      const Component = r.component;
      return <Route key={r.key} path={r.path} element={<Component />} />;
    }
    return [];
  });

export const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Content style={{ margin: 16 }}>
          <Routes>{renderRoutes(routes)}</Routes>
        </Content>
      </Layout>
    </Layout>

  );
};
