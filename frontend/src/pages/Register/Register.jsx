import { Card, Input, Button, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Link } = Typography;

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword, phone } = formData;

        if (!username || !email || !password || !phone) {
            message.error("Vui lòng nhập đầy đủ các trường bắt buộc.");
            return;
        }

        if (!validateEmail(email)) {
            message.error("Email không hợp lệ.");
            return;
        }

        if (password.length < 6 || password.length > 15) {
            message.error("Mật khẩu phải từ 6 đến 15 ký tự.");
            return;
        }

        if (password !== confirmPassword) {
            message.error("Mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            // Kiểm tra username đã tồn tại chưa
            const checkRes = await fetch(`http://localhost:3001/users?username=${username}`);
            const existingUsers = await checkRes.json();
            if (existingUsers.length > 0) {
                message.error("Tên đăng nhập đã tồn tại.");
                return;
            }

            // Gửi dữ liệu đăng ký
            const res = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, phone, password })
            });

            if (res.ok) {
                message.success("Thêm dữ liệu thành công");
            } else {
                message.error("Lỗi khi đăng ký.");
            }
        } catch {
            message.error("Không thể kết nối đến server.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
            <Card title="Đăng ký" style={{ width: 350, textAlign: "center" }}>
                <Input 
                    size="large" 
                    placeholder="Tên đăng nhập" 
                    prefix={<UserOutlined />} 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Input 
                    size="large" 
                    type="email" 
                    placeholder="Email" 
                    prefix={<MailOutlined />} 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Input 
                    size="large" 
                    type="tel" 
                    placeholder="Số điện thoại" 
                    prefix={<PhoneOutlined />} 
                    name="phone"
                    value={formData.phone}
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
                <Input.Password 
                    size="large" 
                    placeholder="Xác nhận mật khẩu" 
                    prefix={<LockOutlined />} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ marginBottom: 16 }}
                />
                <Button type="primary" block size="large" onClick={handleSubmit} style={{ marginBottom: 16 }}>Đăng ký</Button>
                <div style={{ textAlign: "center" }}>
                    <Link href="Login">Đã có tài khoản? Đăng nhập</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
