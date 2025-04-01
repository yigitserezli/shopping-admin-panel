import { useState, useEffect } from "react";
import axios from "axios";
import { Product, ProductFormData } from "../types/types";

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Product[]>(`${backendUrl}/api/products`);
            setProducts(response.data);
            console.log("Products fetched successfully:", response.data);
        } catch (err: any) {
            setError(err.message || "An error occurred while fetching products");
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product: Product) => {
        setLoading(true);
        try {
            const response = await axios.post<Product>(`${backendUrl}/api/products`, product);
            setProducts((prevProducts) => [...prevProducts, response.data]);
            console.log("Product added successfully:", response.data);
        } catch (err: any) {
            setError(err.message || "An error occurred while adding the product");
        } finally {
            setLoading(false);
        }
    };

    const editProduct = async (productId: number, updatedProduct: ProductFormData): Promise<void> => {
        setLoading(true);
        try {
            const response = await axios.put<Product>(`${backendUrl}/api/products/${productId}`, updatedProduct);
            setProducts((prevProducts) => prevProducts.map((product) => (product.id === productId ? response.data : product)));
            console.log("Product updated successfully:", response.data);
        } catch (err: any) {
            setError(err.message || "An error occurred while updating the product");
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId: number) => {
        setLoading(true);
        try {
            await axios.delete(`${backendUrl}/api/products/${productId}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            console.log("Product deleted successfully");
        } catch (err: any) {
            setError(err.message || "An error occurred while deleting the product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return { products, loading, error, getAllProducts, addProduct, editProduct, deleteProduct };
};

export default useProducts;
