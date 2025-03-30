import { Card, Input, Button, Typography, DatePicker } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Link } = Typography;

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        birthdate: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date, dateString) => {
        setFormData({
            ...formData,
            birthdate: dateString,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
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
                <DatePicker 
                    size="large" 
                    style={{ width: "100%", marginBottom: 16 }} 
                    placeholder="Ngày tháng năm sinh"
                    onChange={handleDateChange}
                />
                <Input 
                    size="large" 
                    placeholder="Địa chỉ thường trú" 
                    prefix={<HomeOutlined />} 
                    name="address"
                    value={formData.address}
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
                    <Link href="#">Đã có tài khoản? Đăng nhập</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
