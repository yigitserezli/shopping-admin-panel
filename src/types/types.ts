export interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    stock: number;
    purchasePrice: number;
    sellingPrice: number;
    imageUrl: string;
    sku: string;
    createdAt: string;
    updatedAt: string;
}

export type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt" | "description"> & {
    description?: string;
};
