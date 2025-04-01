import { Card, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate

const { Link } = Typography;

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        const { username, password } = formData;

        if (!username || !password) {
            message.error("Vui lòng nhập tên đăng nhập và mật khẩu.");
            return;
        }

        try {
            // Kiểm tra thông tin đăng nhập
            const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
            const users = await res.json();

            if (users.length > 0) {
                message.success("Đăng nhập thành công!");
                // Lưu thông tin vào localStorage (tuỳ vào cách bạn muốn xử lý)
                localStorage.setItem("user", JSON.stringify(users[0]));
                // Chuyển hướng đến trang Dashboard sau khi đăng nhập thành công
                navigate("/admin/home"); // Chuyển hướng tới trang Dashboard
            } else {
                message.error("Tên đăng nhập hoặc mật khẩu không đúng.");
            }
        } catch {
            message.error("Không thể kết nối đến server.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
            <Card title="Đăng nhập" style={{ width: 350, textAlign: "center" }}>
                <Input 
                    size="large" 
                    placeholder="Tên đăng nhập" 
                    prefix={<UserOutlined />} 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Input.Password 
                    size="large" 
                    placeholder="Mật khẩu" 
                    prefix={<LockOutlined />} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Button type="primary" block size="large" onClick={handleLogin} style={{ marginBottom: 16 }}>Đăng nhập</Button>
                <div style={{ textAlign: "center" }}>
                    <Link href="#">Quên mật khẩu?</Link> | <Link href="/register">Đăng ký</Link>
                </div>
            </Card>
        </div>
    );
};

export default SignIn;

