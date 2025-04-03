// Trang chi tiết nhà thuê  
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function HouseDetail() {
    const { id } = useParams(); // Lấy id từ URL
    const [house, setHouse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/houses/${id}`)
            .then((response) => {
                setHouse(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi tải chi tiết nhà:", error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) return <div className="text-center">Đang tải...</div>;
    if (!house) return <div className="text-center text-red-500">Không tìm thấy nhà!</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{house.name}</h1>
            <img src={house.img} alt={house.name} className="w-full h-64 object-cover my-4" />
            <p><strong>Địa điểm:</strong> {house.location}</p>
            <p><strong>Loại nhà:</strong> {house.type}</p>
            <p><strong>Giá thuê:</strong> {house.price}</p>
            <p><strong>Diện tích:</strong> {house.area}</p>
            <p><strong>Tình trạng:</strong> {house.status === "available" ? "Còn trống" : "Đã thuê"}</p>
        </div>
    );
}

export default HouseDetail;
