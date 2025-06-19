import { useState } from 'react'
import { 
  Table, 
  Card, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Modal, 
  Descriptions, 
  Typography, 
  Avatar,
  Row,
  Col,
  Divider,
  Timeline,
  Badge
} from 'antd'
import { 
  SearchOutlined, 
  EyeOutlined, 
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  FileTextOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Search } = Input

const Pacientes = () => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPaciente, setSelectedPaciente] = useState(null)

  // Datos fake de pacientes
  const pacientesData = [
    {
      id: 1,
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '+56 9 1111 2222',
      edad: 32,
      fechaNacimiento: '1992-03-15',
      direccion: 'Av. Providencia 1234, Santiago',
      numeroFicha: 'P001',
      estado: 'activo',
      ultimaVisita: '2025-06-15',
      proximaCita: '2025-06-25',
      doctorAsignado: 'Dr. Juan Pérez',
      historialMedico: [
        {
          fecha: '2025-06-15',
          tratamiento: 'Limpieza dental',
          doctor: 'Dr. Juan Pérez',
          notas: 'Limpieza rutinaria, buen estado general de los dientes',
          estado: 'completado'
        },
        {
          fecha: '2025-05-20',
          tratamiento: 'Consulta de revisión',
          doctor: 'Dr. Juan Pérez',
          notas: 'Revisión general, se programa limpieza',
          estado: 'completado'
        },
        {
          fecha: '2025-04-10',
          tratamiento: 'Obturación molar derecho',
          doctor: 'Dr. Juan Pérez',
          notas: 'Obturación de caries en molar superior derecho',
          estado: 'completado'
        }
      ],
      alergias: ['Penicilina'],
      enfermedades: ['Ninguna'],
      medicamentos: ['Ninguno']
    },
    {
      id: 2,
      nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      telefono: '+56 9 3333 4444',
      edad: 28,
      fechaNacimiento: '1996-08-22',
      direccion: 'Las Condes 567, Santiago',
      numeroFicha: 'P002',
      estado: 'activo',
      ultimaVisita: '2025-06-10',
      proximaCita: '2025-06-20',
      doctorAsignado: 'Dra. Ana López',
      historialMedico: [
        {
          fecha: '2025-06-10',
          tratamiento: 'Control de ortodoncia',
          doctor: 'Dra. Ana López',
          notas: 'Ajuste de brackets, evolución favorable',
          estado: 'completado'
        },
        {
          fecha: '2025-05-10',
          tratamiento: 'Instalación de brackets',
          doctor: 'Dra. Ana López',
          notas: 'Instalación exitosa de aparato ortodóncico',
          estado: 'completado'
        }
      ],
      alergias: ['Ninguna'],
      enfermedades: ['Ninguna'],
      medicamentos: ['Ibuprofeno (según necesidad)']
    },
    {
      id: 3,
      nombre: 'Elena Martínez',
      email: 'elena.martinez@email.com',
      telefono: '+56 9 5555 6666',
      edad: 45,
      fechaNacimiento: '1979-12-05',
      direccion: 'Ñuñoa 890, Santiago',
      numeroFicha: 'P003',
      estado: 'activo',
      ultimaVisita: '2025-06-18',
      proximaCita: '2025-06-21',
      doctorAsignado: 'Dr. Miguel Torres',
      historialMedico: [
        {
          fecha: '2025-06-18',
          tratamiento: 'Endodoncia - Segunda sesión',
          doctor: 'Dr. Miguel Torres',
          notas: 'Continuación de tratamiento de conducto',
          estado: 'en_proceso'
        },
        {
          fecha: '2025-06-11',
          tratamiento: 'Endodoncia - Primera sesión',
          doctor: 'Dr. Miguel Torres',
          notas: 'Inicio de tratamiento de conducto en molar inferior',
          estado: 'completado'
        }
      ],
      alergias: ['Látex'],
      enfermedades: ['Hipertensión'],
      medicamentos: ['Losartán 50mg']
    },
    {
      id: 4,
      nombre: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      telefono: '+56 9 7777 8888',
      edad: 38,
      fechaNacimiento: '1986-11-30',
      direccion: 'Maipú 1122, Santiago',
      numeroFicha: 'P004',
      estado: 'inactivo',
      ultimaVisita: '2025-05-15',
      proximaCita: null,
      doctorAsignado: 'Dr. Juan Pérez',
      historialMedico: [
        {
          fecha: '2025-05-15',
          tratamiento: 'Extracción muela del juicio',
          doctor: 'Dr. Juan Pérez',
          notas: 'Extracción exitosa, se dan indicaciones post-operatorias',
          estado: 'completado'
        }
      ],
      alergias: ['Ninguna'],
      enfermedades: ['Diabetes tipo 2'],
      medicamentos: ['Metformina 850mg']
    }
  ]

  const [pacientes] = useState(pacientesData)

  const columns = [
    {
      title: 'N° Ficha',
      dataIndex: 'numeroFicha',
      key: 'numeroFicha',
      width: 100,
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Paciente',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            icon={<UserOutlined />} 
            style={{ marginRight: '12px', backgroundColor: '#87d068' }}
          />
          <div>
            <div><Text strong>{text}</Text></div>
            <div><Text type="secondary" style={{ fontSize: '12px' }}>{record.edad} años</Text></div>
          </div>
        </div>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => 
        record.nombre.toLowerCase().includes(value.toLowerCase()) ||
        record.numeroFicha.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: 'Contacto',
      key: 'contacto',
      render: (_, record) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <PhoneOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
            <Text style={{ fontSize: '12px' }}>{record.telefono}</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MailOutlined style={{ marginRight: '4px', color: '#1890ff' }} />
            <Text style={{ fontSize: '12px' }} ellipsis>{record.email}</Text>
          </div>
        </div>
      )
    },
    {
      title: 'Doctor Asignado',
      dataIndex: 'doctorAsignado',
      key: 'doctorAsignado',
      render: (text) => <Text>{text}</Text>
    },
    {
      title: 'Última Visita',
      dataIndex: 'ultimaVisita',
      key: 'ultimaVisita',
      render: (date) => date ? new Date(date).toLocaleDateString('es-CL') : 'N/A'
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag color={estado === 'activo' ? 'green' : 'red'}>
          {estado.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          onClick={() => handleVerDetalle(record)}
          size="small"
        >
          Ver Detalle
        </Button>
      )
    }
  ]

  const handleVerDetalle = (paciente) => {
    setSelectedPaciente(paciente)
    setModalVisible(true)
  }

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const getEstadoTratamiento = (estado) => {
    const estados = {
      'completado': { color: 'green', text: 'Completado' },
      'en_proceso': { color: 'blue', text: 'En Proceso' },
      'cancelado': { color: 'red', text: 'Cancelado' },
      'pendiente': { color: 'orange', text: 'Pendiente' }
    }
    return estados[estado] || { color: 'default', text: estado }
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#2c3e50' }}>
          Gestión de Pacientes
        </Title>
        <Text type="secondary">
          Busca y gestiona la información de todos los pacientes
        </Text>
      </div>

      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Search
            placeholder="Buscar por nombre o número de ficha..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            onChange={(e) => !e.target.value && setSearchText('')}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={pacientes}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} de ${total} pacientes`
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Modal de detalles del paciente */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              icon={<UserOutlined />} 
              style={{ marginRight: '12px', backgroundColor: '#87d068' }}
            />
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {selectedPaciente?.nombre}
              </Title>
              <Text type="secondary">Ficha N° {selectedPaciente?.numeroFicha}</Text>
            </div>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>
        ]}
        width={900}
      >
        {selectedPaciente && (
          <div>
            <Row gutter={[16, 16]}>
              {/* Información personal */}
              <Col span={12}>
                <Card size="small" title="Información Personal">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Edad">
                      {selectedPaciente.edad} años
                    </Descriptions.Item>
                    <Descriptions.Item label="Fecha de Nacimiento">
                      {new Date(selectedPaciente.fechaNacimiento).toLocaleDateString('es-CL')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Teléfono">
                      {selectedPaciente.telefono}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {selectedPaciente.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Dirección">
                      {selectedPaciente.direccion}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              {/* Información médica */}
              <Col span={12}>
                <Card size="small" title="Información Médica">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Doctor Asignado">
                      {selectedPaciente.doctorAsignado}
                    </Descriptions.Item>
                    <Descriptions.Item label="Última Visita">
                      {selectedPaciente.ultimaVisita ? 
                        new Date(selectedPaciente.ultimaVisita).toLocaleDateString('es-CL') : 
                        'N/A'
                      }
                    </Descriptions.Item>
                    <Descriptions.Item label="Próxima Cita">
                      {selectedPaciente.proximaCita ? 
                        new Date(selectedPaciente.proximaCita).toLocaleDateString('es-CL') : 
                        'No programada'
                      }
                    </Descriptions.Item>
                    <Descriptions.Item label="Estado">
                      <Tag color={selectedPaciente.estado === 'activo' ? 'green' : 'red'}>
                        {selectedPaciente.estado.toUpperCase()}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              {/* Alergias y medicamentos */}
              <Col span={12}>
                <Card size="small" title="Información Clínica">
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>Alergias:</Text>
                    <div style={{ marginTop: '4px' }}>
                      {selectedPaciente.alergias.map((alergia, index) => (
                        <Tag key={index} color="red">{alergia}</Tag>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>Enfermedades:</Text>
                    <div style={{ marginTop: '4px' }}>
                      {selectedPaciente.enfermedades.map((enfermedad, index) => (
                        <Tag key={index} color="orange">{enfermedad}</Tag>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Text strong>Medicamentos:</Text>
                    <div style={{ marginTop: '4px' }}>
                      {selectedPaciente.medicamentos.map((medicamento, index) => (
                        <Tag key={index} color="blue">{medicamento}</Tag>
                      ))}
                    </div>
                  </div>
                </Card>
              </Col>

              {/* Historial médico */}
              <Col span={12}>
                <Card size="small" title="Historial de Tratamientos">
                  <Timeline
                    items={selectedPaciente.historialMedico.map((item, index) => ({
                      key: index,
                      dot: <MedicineBoxOutlined style={{ fontSize: '16px' }} />,
                      color: getEstadoTratamiento(item.estado).color,
                      children: (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text strong>{item.tratamiento}</Text>
                            <Badge 
                              status={getEstadoTratamiento(item.estado).color === 'green' ? 'success' : 
                                     getEstadoTratamiento(item.estado).color === 'blue' ? 'processing' : 'error'} 
                              text={getEstadoTratamiento(item.estado).text}
                            />
                          </div>
                          <div style={{ marginTop: '4px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {new Date(item.fecha).toLocaleDateString('es-CL')} - {item.doctor}
                            </Text>
                          </div>
                          <div style={{ marginTop: '4px' }}>
                            <Text style={{ fontSize: '12px' }}>{item.notas}</Text>
                          </div>
                        </div>
                      )
                    }))}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Pacientes
