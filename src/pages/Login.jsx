import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined, MedicineBoxOutlined } from '@ant-design/icons'
import './Login.css'

const { Title, Text } = Typography

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // Simulación de autenticación
      setTimeout(() => {
        message.success('¡Bienvenido al Sistema Odontológico!')
        navigate('/dashboard')
        setLoading(false)
      }, 1000)
    } catch (error) {
      message.error('Error al iniciar sesión')
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/login_image.png" alt="Dental" />
      </div>
      <div className="login-form-container">
        <Card className="login-card" bordered={false}>
          <div className="login-header">
            <MedicineBoxOutlined className="login-icon" />
            <Title level={2} className="login-title">
              Sistema Odontológico
            </Title>
            <Text type="secondary" className="login-subtitle">
              Gestión integral para consultorios dentales
            </Text>
          </div>
          
          <Form
            name="login"
            className="login-form"
            size="large"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu usuario!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Usuario"
                className="login-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu contraseña!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Contraseña"
                className="login-input"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                loading={loading}
                block
              >
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>

          <div className="login-footer">
            <Text type="secondary">
              © 2025 Sistema Odontológico - Todos los derechos reservados
            </Text>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login
