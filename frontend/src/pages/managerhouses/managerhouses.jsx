// Trang quản lý bài đăng (Admin - Manager)
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input, Modal, Form } from "antd";

const API_URL = "http://localhost:3001/houses";

const ManagerHouses = () => {
  const [houses, setHouses] = useState([]); // Danh sách nhà
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [selectedHouse, setSelectedHouse] = useState(null); // Nhà được chọn
  const [form] = Form.useForm();

  // Lấy danh sách nhà từ API
  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get(API_URL);
      setHouses(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Thêm hoặc cập nhật bài đăng nhà
  const handleSaveHouse = async (values) => {
    try {
      if (isEditing) {
        // Cập nhật bài đăng nhà
        await axios.put(`${API_URL}/${selectedHouse.id}`, values);
      } else {
        // Thêm mới bài đăng nhà
        await axios.post(API_URL, values);
      }
      setIsModalOpen(false);
      fetchHouses(); // Load lại danh sách nhà
    } catch (error) {
      console.error("Lỗi khi lưu bài đăng nhà:", error);
    }
  };

  // Xóa bài đăng nhà
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchHouses();
      } catch (error) {
        console.error("Lỗi khi xóa bài đăng nhà:", error);
      }
    }
  };

  // Mở modal để thêm mới hoặc chỉnh sửa
  const showModal = (house = null) => {
    setIsEditing(!!house);
    setSelectedHouse(house);
    setIsModalOpen(true);
    form.setFieldsValue(house || { name: "", location: "", type: "", price: "", area: "", status: "", img: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý Bài Đăng Nhà</h2>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 20 }}>
        + Thêm Nhà
      </Button>

      {/* Bảng danh sách nhà */}
      <Table
        dataSource={houses}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Tên nhà", dataIndex: "name" },
          { title: "Vị trí", dataIndex: "location" },
          { title: "Loại", dataIndex: "type" },
          { title: "Giá", dataIndex: "price" },
          { title: "Diện tích", dataIndex: "area" },
          { title: "Trạng thái", dataIndex: "status" },
          {
            title: "Hành động",
            render: (text, record) => (
              <>
                <Button onClick={() => showModal(record)} style={{ marginRight: 10 }}>
                  Sửa
                </Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Xóa
                </Button>
              </>
            ),
          },
        ]}
      />

      {/* Modal thêm/sửa bài đăng nhà */}
      <Modal
        title={isEditing ? "Chỉnh sửa bài đăng nhà" : "Thêm nhà mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveHouse}>
          <Form.Item name="name" label="Tên nhà" rules={[{ required: true, message: "Nhập tên nhà!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Vị trí" rules={[{ required: true, message: "Nhập vị trí!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại" rules={[{ required: true, message: "Nhập loại nhà!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Nhập giá nhà!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="area" label="Diện tích" rules={[{ required: true, message: "Nhập diện tích nhà!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Chọn trạng thái nhà!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="img" label="Hình ảnh" rules={[{ required: true, message: "Nhập đường dẫn hình ảnh!" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerHouses;
