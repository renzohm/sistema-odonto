import { useState } from 'react'
import { Calendar, Badge, Card, Typography, Modal, List, Avatar, Tag, Button, Select, Row, Col } from 'antd'
import { UserOutlined, ClockCircleOutlined, MedicineBoxOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

const { Title, Text } = Typography
const { Option } = Select

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState('todos')

  // Datos fake de doctores
  const doctores = [
    { id: 1, nombre: 'Dr. Juan Pérez', color: '#1890ff' },
    { id: 2, nombre: 'Dra. Ana López', color: '#52c41a' },
    { id: 3, nombre: 'Dr. Miguel Torres', color: '#faad14' },
    { id: 4, nombre: 'Dra. Carmen Silva', color: '#722ed1' }
  ]

  // Datos fake de citas
  const citasData = {
    '2025-06-19': [
      {
        id: 1,
        paciente: 'María González',
        doctor: 'Dr. Juan Pérez',
        doctorId: 1,
        hora: '09:00',
        tratamiento: 'Limpieza dental',
        estado: 'confirmado',
        tipo: 'success'
      },
      {
        id: 2,
        paciente: 'Carlos Rodríguez',
        doctor: 'Dra. Ana López',
        doctorId: 2,
        hora: '10:30',
        tratamiento: 'Ortodoncia - Control',
        estado: 'pendiente',
        tipo: 'warning'
      },
      {
        id: 3,
        paciente: 'Elena Martínez',
        doctor: 'Dr. Miguel Torres',
        doctorId: 3,
        hora: '11:45',
        tratamiento: 'Endodoncia',
        estado: 'confirmado',
        tipo: 'success'
      }
    ],
    '2025-06-20': [
      {
        id: 4,
        paciente: 'Roberto Silva',
        doctor: 'Dr. Juan Pérez',
        doctorId: 1,
        hora: '14:00',
        tratamiento: 'Extracción muela del juicio',
        estado: 'confirmado',
        tipo: 'success'
      },
      {
        id: 5,
        paciente: 'Patricia Morales',
        doctor: 'Dra. Carmen Silva',
        doctorId: 4,
        hora: '15:30',
        tratamiento: 'Periodoncia',
        estado: 'cancelado',
        tipo: 'error'
      }
    ],
    '2025-06-21': [
      {
        id: 6,
        paciente: 'Luis Fernández',
        doctor: 'Dra. Ana López',
        doctorId: 2,
        hora: '08:00',
        tratamiento: 'Instalación de brackets',
        estado: 'confirmado',
        tipo: 'success'
      },
      {
        id: 7,
        paciente: 'Andrea Vega',
        doctor: 'Dr. Miguel Torres',
        doctorId: 3,
        hora: '16:00',
        tratamiento: 'Control post-operatorio',
        estado: 'pendiente',
        tipo: 'warning'
      }
    ],
    '2025-06-22': [
      {
        id: 8,
        paciente: 'Fernando Castro',
        doctor: 'Dr. Juan Pérez',
        doctorId: 1,
        hora: '10:00',
        tratamiento: 'Implante dental',
        estado: 'confirmado',
        tipo: 'success'
      }
    ]
  }

  const getListData = (value) => {
    const dateString = value.format('YYYY-MM-DD')
    const citas = citasData[dateString] || []
    
    if (selectedDoctor !== 'todos') {
      return citas.filter(cita => cita.doctorId === parseInt(selectedDoctor))
    }
    
    return citas
  }

  const dateCellRender = (value) => {
    const listData = getListData(value)
    return (
      <ul className="events" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item) => {
          const doctor = doctores.find(d => d.doctorId === item.doctorId)
          return (
            <li key={item.id} style={{ marginBottom: '2px' }}>
              <Badge 
                status={item.tipo} 
                text={
                  <Text 
                    style={{ 
                      fontSize: '10px', 
                      color: doctor?.color || '#666',
                      fontWeight: '500'
                    }}
                  >
                    {item.hora} - {item.paciente.split(' ')[0]}
                  </Text>
                } 
              />
            </li>
          )
        })}
      </ul>
    )
  }

  const onSelect = (value) => {
    setSelectedDate(value)
    const citas = getListData(value)
    if (citas.length > 0) {
      setModalVisible(true)
    }
  }

  const getEstadoColor = (estado) => {
    const colores = {
      'confirmado': 'green',
      'pendiente': 'orange',
      'cancelado': 'red'
    }
    return colores[estado] || 'blue'
  }

  const getDoctorColor = (doctorId) => {
    const doctor = doctores.find(d => d.id === doctorId)
    return doctor?.color || '#666'
  }

  const citasDelDia = getListData(selectedDate)

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#2c3e50' }}>
          Calendario de Citas
        </Title>
        <Text type="secondary">
          Gestiona y visualiza todas las citas de los doctores
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={4} style={{ margin: 0 }}>
                Filtrar por Doctor
              </Title>
              <Select
                value={selectedDoctor}
                onChange={setSelectedDoctor}
                style={{ width: 200 }}
              >
                <Option value="todos">Todos los doctores</Option>
                {doctores.map(doctor => (
                  <Option key={doctor.id} value={doctor.id.toString()}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div 
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: doctor.color,
                          marginRight: '8px'
                        }}
                      />
                      {doctor.nombre}
                    </div>
                  </Option>
                ))}
              </Select>
            </div>
            
            <Calendar
              cellRender={dateCellRender}
              onSelect={onSelect}
              style={{ border: '1px solid #f0f0f0', borderRadius: '8px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Leyenda de doctores */}
      <Card style={{ marginTop: '16px' }} title="Leyenda de Doctores">
        <Row gutter={[16, 8]}>
          {doctores.map(doctor => (
            <Col key={doctor.id} xs={12} sm={8} md={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div 
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: doctor.color,
                    marginRight: '8px'
                  }}
                />
                <Text style={{ fontSize: '12px' }}>{doctor.nombre}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Modal de detalles del día */}
      <Modal
        title={`Citas del ${selectedDate.format('DD [de] MMMM [de] YYYY')}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>
        ]}
        width={700}
      >
        {citasDelDia.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={citasDelDia}
            renderItem={(cita) => (
              <List.Item
                actions={[
                  <Tag color={getEstadoColor(cita.estado)} key="estado">
                    {cita.estado.toUpperCase()}
                  </Tag>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={<UserOutlined />}
                      style={{ backgroundColor: getDoctorColor(cita.doctorId) }}
                    />
                  }
                  title={
                    <div>
                      <Text strong style={{ fontSize: '16px' }}>
                        {cita.paciente}
                      </Text>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                        <ClockCircleOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
                        <Text type="secondary">{cita.hora}</Text>
                      </div>
                    </div>
                  }
                  description={
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <MedicineBoxOutlined style={{ marginRight: '4px', color: getDoctorColor(cita.doctorId) }} />
                        <Text style={{ color: getDoctorColor(cita.doctorId), fontWeight: '500' }}>
                          {cita.doctor}
                        </Text>
                      </div>
                      <Text>{cita.tratamiento}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Text type="secondary">No hay citas programadas para este día</Text>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Calendario
