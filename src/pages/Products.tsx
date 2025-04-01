import { useState } from "react";
import useProducts from "../hooks/useProducts";
import AddProductComponent from "../components/AddProductModal";
import EditProductComponent from "../components/EditProductModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ActivityIndicator from "../components/ActivityIndicator";
import { Product } from "../types/types";

const ProductsList = () => {
    // addProduct ve getAllProducts dahil hook'tan çekiliyor.
    const { products, loading, error, getAllProducts, addProduct, editProduct, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    if (loading) return <ActivityIndicator />;
    if (error) return <div>Hata: {error}</div>;

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedProduct) {
            await deleteProduct(selectedProduct.id);
            setIsDeleteModalOpen(false);
            // Ürün listesini güncellemek için:
            await getAllProducts();
        }
    };
    return (
        <div className="overflow-x-auto">
            <div className="flex justify-end p-4">
                <img src="/addProduct.svg" alt="Add Product" className="h-10 cursor-pointer" onClick={() => setIsModalOpen(true)} />
            </div>
            <table className="min-w-full text-white text-center ">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Purchase Price</th>
                        <th className="py-2 px-4 border-b">Selling Price</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="py-2 px-4 border-b">{product.id}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={product.imageUrl} alt={product.name} className="h-10 w-10 object-cover rounded" />
                            </td>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.purchasePrice}</td>
                            <td className="py-2 px-4 border-b">{product.sellingPrice}</td>
                            <td className="py-2 px-4 border-b">{product.category}</td>
                            <td className="py-2 px-4 border-b">{product.stock}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEditClick(product)} className="text-blue-500 py-1 px-3 cursor-pointer">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteClick(product)} className="text-red-500 py-1 px-3 cursor-pointer">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Product Modal */}
            {isModalOpen && <AddProductComponent onClose={() => setIsModalOpen(false)} refetchProducts={getAllProducts} addProduct={addProduct} />}

            {/* Edit Product Modal */}
            {isEditModalOpen && selectedProduct && (
                <EditProductComponent onClose={() => setIsEditModalOpen(false)} editProduct={editProduct} product={selectedProduct} />
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedProduct && (
                <ConfirmDeleteModal productName={selectedProduct.name} onConfirm={confirmDelete} onCancel={() => setIsDeleteModalOpen(false)} />
            )}
        </div>
    );
};

export default ProductsList;
