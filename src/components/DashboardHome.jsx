import { Row, Col, Card, Statistic, Typography, List, Avatar, Tag, Progress } from 'antd'
import { 
  UserOutlined, 
  CalendarOutlined, 
  DollarOutlined, 
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography

const DashboardHome = () => {
  // Datos fake para el dashboard
  const stats = [
    {
      title: 'Pacientes Totales',
      value: 248,
      icon: <UserOutlined />,
      color: '#1890ff',
      suffix: null
    },
    {
      title: 'Citas Hoy',
      value: 12,
      icon: <CalendarOutlined />,
      color: '#52c41a',
      suffix: null
    },
    {
      title: 'Ingresos Mes',
      value: 45780,
      icon: <DollarOutlined />,
      color: '#faad14',
      prefix: '$',
      suffix: null
    },
    {
      title: 'Doctores Activos',
      value: 8,
      icon: <TeamOutlined />,
      color: '#722ed1',
      suffix: null
    }
  ]

  const proximasCitas = [
    {
      id: 1,
      paciente: 'María González',
      hora: '09:00',
      doctor: 'Dr. Juan Pérez',
      tratamiento: 'Limpieza dental',
      estado: 'pendiente'
    },
    {
      id: 2,
      paciente: 'Carlos Rodríguez',
      hora: '10:30',
      doctor: 'Dra. Ana López',
      tratamiento: 'Ortodoncia',
      estado: 'confirmado'
    },
    {
      id: 3,
      paciente: 'Elena Martínez',
      hora: '11:45',
      doctor: 'Dr. Miguel Torres',
      tratamiento: 'Endodoncia',
      estado: 'pendiente'
    },
    {
      id: 4,
      paciente: 'Roberto Silva',
      hora: '14:00',
      doctor: 'Dr. Juan Pérez',
      tratamiento: 'Extracción',
      estado: 'confirmado'
    }
  ]

  const doctoresActivos = [
    {
      id: 1,
      nombre: 'Dr. Juan Pérez',
      especialidad: 'Odontología General',
      pacientesHoy: 5,
      estado: 'activo'
    },
    {
      id: 2,
      nombre: 'Dra. Ana López',
      especialidad: 'Ortodoncia',
      pacientesHoy: 3,
      estado: 'activo'
    },
    {
      id: 3,
      nombre: 'Dr. Miguel Torres',
      especialidad: 'Endodoncia',
      pacientesHoy: 4,
      estado: 'activo'
    }
  ]

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'confirmado':
        return 'green'
      case 'pendiente':
        return 'orange'
      case 'cancelado':
        return 'red'
      default:
        return 'blue'
    }
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px', color: '#2c3e50' }}>
        Dashboard Principal
      </Title>
      
      {/* Estadísticas generales */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card bordered={false} className="stat-card">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color, fontSize: '2rem', fontWeight: 'bold' }}
              />
              <div style={{ 
                fontSize: '2rem', 
                color: stat.color, 
                textAlign: 'center', 
                marginTop: '8px' 
              }}>
                {stat.icon}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Próximas citas */}
        <Col xs={24} lg={12}>
          <Card 
            title="Próximas Citas de Hoy" 
            bordered={false}
            extra={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
          >
            <List
              itemLayout="horizontal"
              dataSource={proximasCitas}
              renderItem={(cita) => (
                <List.Item
                  actions={[
                    <Tag color={getEstadoColor(cita.estado)} key="estado">
                      {cita.estado.toUpperCase()}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <div>
                        <Text strong>{cita.paciente}</Text>
                        <Text type="secondary" style={{ marginLeft: '8px' }}>
                          {cita.hora}
                        </Text>
                      </div>
                    }
                    description={
                      <div>
                        <div>{cita.doctor}</div>
                        <Text type="secondary">{cita.tratamiento}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Doctores activos */}
        <Col xs={24} lg={12}>
          <Card 
            title="Doctores Activos Hoy" 
            bordered={false}
            extra={<TeamOutlined style={{ color: '#52c41a' }} />}
          >
            <List
              itemLayout="horizontal"
              dataSource={doctoresActivos}
              renderItem={(doctor) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        style={{ backgroundColor: '#87d068' }}
                        icon={<UserOutlined />}
                      />
                    }
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong>{doctor.nombre}</Text>
                        <Tag color="green">
                          <CheckCircleOutlined /> Activo
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <div>{doctor.especialidad}</div>
                        <div style={{ marginTop: '8px' }}>
                          <Text type="secondary">Pacientes hoy: </Text>
                          <Text strong>{doctor.pacientesHoy}</Text>
                          <Progress 
                            percent={(doctor.pacientesHoy / 8) * 100} 
                            size="small" 
                            showInfo={false}
                            style={{ marginTop: '4px' }}
                          />
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardHome
