// Trang quản lý người dùng (Admin - Manager)  
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input, Modal, Form, message } from "antd";

const API_URL = "http://localhost:3001/users";

const ManagerUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleSaveUser = async (values) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${selectedUser.id}`, values);
      } else {
        await axios.post(API_URL, { ...values, blocked: false });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi lưu người dùng:", error);
    }
  };

  const handleBlockUser = async (id, role) => {
    if (role === "admin") {
      message.error("Không thể khóa tài khoản admin.");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn khóa tài khoản người dùng này?")) {
      try {
        await axios.patch(`${API_URL}/${id}`, { blocked: true });
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi khóa người dùng:", error);
      }
    }
  };

  const handleUnblockUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn mở khóa tài khoản người dùng này?")) {
      try {
        await axios.patch(`${API_URL}/${id}`, { blocked: false });
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi mở khóa người dùng:", error);
      }
    }
  };

  const showModal = (user = null) => {
    setIsEditing(!!user);
    setSelectedUser(user);
    setIsModalOpen(true);
    form.setFieldsValue(user || { username: "", email: "", phone: "", password: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý người dùng</h2>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 20 }}>
        + Thêm Người Dùng
      </Button>
      <Table
        dataSource={users}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Tên đăng nhập", dataIndex: "username" },
          { title: "Email", dataIndex: "email" },
          { title: "Số điện thoại", dataIndex: "phone" },
          {
            title: "Hành động",
            render: (_, record) => (
              <>
                {record.blocked ? (
                  <Button onClick={() => handleUnblockUser(record.id)} style={{ marginRight: 10 }}>
                    Mở khóa
                  </Button>
                ) : (
                  <Button onClick={() => handleBlockUser(record.id, record.role)} style={{ marginRight: 10 }}>
                    Block
                  </Button>
                )}
              </>
            ),
          },
        ]}
      />

      <Modal
        title={isEditing ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveUser}>
          <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Nhập email!" }]}> <Input type="email" /> </Form.Item>
          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Nhập số điện thoại!" }]}> <Input /> </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Nhập mật khẩu!" }]}> <Input.Password /> </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{isEditing ? "Cập nhật" : "Thêm"}</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerUsers;
