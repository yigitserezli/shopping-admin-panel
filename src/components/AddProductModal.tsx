import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Product } from "../types/types";

// Zod şeması ile form doğrulaması
const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    stock: z.coerce.number({ invalid_type_error: "Stock must be a number" }).min(0, "Stock cannot be negative"),
    purchasePrice: z.coerce.number({ invalid_type_error: "Purchase price must be a number" }).min(0, "Cannot be negative"),
    sellingPrice: z.coerce.number({ invalid_type_error: "Selling price must be a number" }).min(0, "Cannot be negative"),
    imageUrl: z.string().url("Invalid URL"),
    sku: z.string().min(1, "SKU is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductProps {
    onClose: () => void;
    refetchProducts: () => Promise<void>;
    addProduct: (product: Product) => Promise<void>;
}

const AddProductComponent = ({ onClose, refetchProducts, addProduct }: AddProductProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductFormData) => {
        try {
            await addProduct(data as any);
            toast.success("Product added successfully!");
            reset();
            onClose();
            await refetchProducts();
        } catch (error: any) {
            toast.error("Failed to add product: " + error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-[#141414] p-6 rounded-lg w-full max-w-md relative">
                <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" {...register("name")} className="w-full p-2 rounded bg-gray-800 text-white" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input type="text" {...register("category")} className="w-full p-2 rounded bg-gray-800 text-white" />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea {...register("description")} className="w-full p-2 rounded bg-gray-800 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <input type="number" {...register("stock")} className="w-full p-2 rounded bg-gray-800 text-white" />
                        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Purchase Price</label>
                        <input type="number" step="0.01" {...register("purchasePrice")} className="w-full p-2 rounded bg-gray-800 text-white" />
                        {errors.purchasePrice && <p className="text-red-500 text-sm">{errors.purchasePrice.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Selling Price</label>
                        <input type="number" step="0.01" {...register("sellingPrice")} className="w-full p-2 rounded bg-gray-800 text-white" />
                        {errors.sellingPrice && <p className="text-red-500 text-sm">{errors.sellingPrice.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input type="text" {...register("imageUrl")} className="w-full p-2 rounded bg-gray-800 text-white" />
                        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">SKU</label>
                        <input type="text" {...register("sku")} className="w-full p-2 rounded bg-gray-800 text-white" />
                        {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductComponent;
