import { useState } from 'react'
import { 
  Card, 
  Row, 
  Col, 
  Avatar, 
  Typography, 
  Tag, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message,
  Divider,
  Space,
  Statistic
} from 'antd'
import { 
  UserOutlined, 
  PlusOutlined, 
  EditOutlined, 
  PhoneOutlined, 
  MailOutlined,
  CalendarOutlined,
  TrophyOutlined
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Option } = Select

const Doctores = () => {
  const [doctores, setDoctores] = useState([
    {
      id: 1,
      nombre: 'Dr. Juan Pérez',
      especialidad: 'Odontología General',
      telefono: '+56 9 1234 5678',
      email: 'juan.perez@odonto.cl',
      experiencia: '8 años',
      pacientesAtendidos: 1250,
      calificacion: 4.8,
      estado: 'activo',
      imagen: null
    },
    {
      id: 2,
      nombre: 'Dra. Ana López',
      especialidad: 'Ortodoncia',
      telefono: '+56 9 8765 4321',
      email: 'ana.lopez@odonto.cl',
      experiencia: '6 años',
      pacientesAtendidos: 890,
      calificacion: 4.9,
      estado: 'activo',
      imagen: null
    },
    {
      id: 3,
      nombre: 'Dr. Miguel Torres',
      especialidad: 'Endodoncia',
      telefono: '+56 9 5555 7777',
      email: 'miguel.torres@odonto.cl',
      experiencia: '10 años',
      pacientesAtendidos: 1580,
      calificacion: 4.7,
      estado: 'activo',
      imagen: null
    },
    {
      id: 4,
      nombre: 'Dra. Carmen Silva',
      especialidad: 'Periodoncia',
      telefono: '+56 9 3333 9999',
      email: 'carmen.silva@odonto.cl',
      experiencia: '5 años',
      pacientesAtendidos: 650,
      calificacion: 4.6,
      estado: 'inactivo',
      imagen: null
    }
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [form] = Form.useForm()

  const especialidades = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Odontopediatría',
    'Implantología'
  ]

  const handleAddDoctor = () => {
    setEditingDoctor(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor)
    form.setFieldsValue(doctor)
    setModalVisible(true)
  }

  const handleSubmit = (values) => {
    if (editingDoctor) {
      // Editar doctor existente
      setDoctores(prev => prev.map(doc => 
        doc.id === editingDoctor.id 
          ? { ...doc, ...values, id: editingDoctor.id }
          : doc
      ))
      message.success('Doctor actualizado exitosamente')
    } else {
      // Agregar nuevo doctor
      const newDoctor = {
        ...values,
        id: Date.now(),
        pacientesAtendidos: 0,
        calificacion: 5.0,
        estado: 'activo'
      }
      setDoctores(prev => [...prev, newDoctor])
      message.success('Doctor agregado exitosamente')
    }
    setModalVisible(false)
    form.resetFields()
  }

  const getEstadoColor = (estado) => {
    return estado === 'activo' ? 'green' : 'red'
  }

  const getEspecialidadColor = (especialidad) => {
    const colores = {
      'Odontología General': 'blue',
      'Ortodoncia': 'purple',
      'Endodoncia': 'orange',
      'Periodoncia': 'green',
      'Cirugía Oral': 'red',
      'Odontopediatría': 'pink',
      'Implantología': 'cyan'
    }
    return colores[especialidad] || 'default'
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#2c3e50' }}>
          Gestión de Doctores
        </Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddDoctor}
          size="large"
        >
          Agregar Doctor
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {doctores.map((doctor) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={doctor.id}>
            <Card
              hoverable
              className="doctor-card"
              actions={[
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  onClick={() => handleEditDoctor(doctor)}
                >
                  Editar
                </Button>,
                <Button type="text" icon={<CalendarOutlined />}>
                  Horarios
                </Button>
              ]}
            >
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  style={{ 
                    backgroundColor: doctor.estado === 'activo' ? '#87d068' : '#ff7875',
                    marginBottom: '12px'
                  }}
                />
                <Title level={4} style={{ margin: '8px 0' }}>
                  {doctor.nombre}
                </Title>
                <Tag color={getEspecialidadColor(doctor.especialidad)}>
                  {doctor.especialidad}
                </Tag>
                <br />
                <Tag color={getEstadoColor(doctor.estado)} style={{ marginTop: '8px' }}>
                  {doctor.estado.toUpperCase()}
                </Tag>
              </div>

              <Divider />

              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                  <Text>{doctor.telefono}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MailOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                  <Text ellipsis>{doctor.email}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TrophyOutlined style={{ marginRight: '8px', color: '#faad14' }} />
                  <Text>{doctor.experiencia} de experiencia</Text>
                </div>
              </Space>

              <Divider />

              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="Pacientes"
                    value={doctor.pacientesAtendidos}
                    valueStyle={{ fontSize: '1rem' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Rating"
                    value={doctor.calificacion}
                    precision={1}
                    suffix="/5"
                    valueStyle={{ fontSize: '1rem', color: '#faad14' }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingDoctor ? 'Editar Doctor' : 'Agregar Nuevo Doctor'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nombre"
                label="Nombre Completo"
                rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
              >
                <Input placeholder="Dr. Juan Pérez" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="especialidad"
                label="Especialidad"
                rules={[{ required: true, message: 'Por favor selecciona la especialidad' }]}
              >
                <Select placeholder="Selecciona especialidad">
                  {especialidades.map(esp => (
                    <Option key={esp} value={esp}>{esp}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="telefono"
                label="Teléfono"
                rules={[{ required: true, message: 'Por favor ingresa el teléfono' }]}
              >
                <Input placeholder="+56 9 1234 5678" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Por favor ingresa el email' },
                  { type: 'email', message: 'Ingresa un email válido' }
                ]}
              >
                <Input placeholder="doctor@odonto.cl" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="experiencia"
                label="Años de Experiencia"
                rules={[{ required: true, message: 'Por favor ingresa los años de experiencia' }]}
              >
                <Input placeholder="5 años" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="estado"
                label="Estado"
                rules={[{ required: true, message: 'Por favor selecciona el estado' }]}
              >
                <Select placeholder="Selecciona estado">
                  <Option value="activo">Activo</Option>
                  <Option value="inactivo">Inactivo</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                {editingDoctor ? 'Actualizar' : 'Agregar'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Doctores
