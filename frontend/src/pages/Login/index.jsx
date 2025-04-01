import { Card, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Link } = Typography;

const SignIn = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
            <Card title="Đăng nhập" style={{ width: 350, textAlign: "center" }}>
                <Input 
                    size="large" 
                    placeholder="Tên đăng nhập" 
                    prefix={<UserOutlined />} 
                    style={{ marginBottom: 16 }}
                />
                <Input.Password 
                    size="large" 
                    placeholder="Mật khẩu" 
                    prefix={<LockOutlined />} 
                    style={{ marginBottom: 16 }}
                />
                <Button type="primary" block size="large" style={{ marginBottom: 16 }}>Đăng nhập</Button>
                <div style={{ textAlign: "center" }}>
                    <Link href="#">Quên mật khẩu?</Link> | <Link href="#">Đăng ký</Link>
                </div>
            </Card>
        </div>
    );
};

export default SignIn;
