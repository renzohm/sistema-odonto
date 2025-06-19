import { useState } from 'react'
import { Layout, Menu, theme, Avatar, Dropdown, Typography, Button } from 'antd'
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  TeamOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import DashboardHome from '../components/DashboardHome'
import Calendario from '../components/Calendario'
import Doctores from '../components/Doctores'
import Pacientes from '../components/Pacientes'
import './Dashboard.css'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/dashboard/doctores',
      icon: <TeamOutlined />,
      label: 'Doctores',
    },
    {
      key: '/dashboard/calendario',
      icon: <CalendarOutlined />,
      label: 'Calendario',
    },
    {
      key: '/dashboard/pacientes',
      icon: <UserOutlined />,
      label: 'Pacientes',
    },
  ]

  const userMenuItems = [
    {
      key: '1',
      icon: <SettingOutlined />,
      label: 'Configuración',
    },
    {
      key: '2',
      icon: <LogoutOutlined />,
      label: 'Cerrar Sesión',
      onClick: () => navigate('/login'),
    },
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  const getSelectedKey = () => {
    const path = location.pathname
    return menuItems.find(item => item.key === path)?.key || '/dashboard'
  }

  return (
    <div className="dashboard-wrapper">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="dashboard-sider"
        width={240}
        collapsedWidth={80}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }}
      >
        <div className="dashboard-logo">
          <div className="logo-icon">🦷</div>
          {!collapsed && <span className="logo-text">OdontoSys</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={handleMenuClick}
          className="dashboard-menu"
        />
      </Sider>
      <div className={collapsed ? 'dashboard-main collapsed' : 'dashboard-main'}>
        <Layout className="dashboard-layout">
          <Header 
            style={{ 
              padding: '0 24px', 
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              position: 'sticky',
              top: 0,
              zIndex: 99
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type="text"
                icon={collapsed ? <DashboardOutlined /> : <DashboardOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px', width: 64, height: 64 }}
              />
              <Title level={4} style={{ margin: 0, color: '#2c3e50' }}>
                Sistema Odontológico
              </Title>
            </div>
            
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="user-info">
                <Avatar 
                  size={40} 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#667eea' }}
                />
                <span className="user-name">Dr. Juan Pérez</span>
              </div>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: '24px',
              padding: 24,
              minHeight: 'calc(100vh - 112px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto'
            }}
          >
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/doctores" element={<Doctores />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/pacientes" element={<Pacientes />} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </div>
  )
}

export default Dashboard
