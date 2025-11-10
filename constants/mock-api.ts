export type Product = {
    photo_url: string;
    name: string;
    description: string;
    created_at: string;
    price: number;
    id: number;
    category: string;
    updated_at: string;
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fakeProducts = {
    records: [
        {
            "id": 1,
            "name": "Premium Wireless Headphones",
            "description": "High-quality wireless headphones with noise cancellation.",
            "price": 163.02,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/1.png",
            "created_at": "2023-01-01T00:00:00Z",
            "updated_at": "2024-01-01T00:00:00Z"
        },
        {
            "id": 2,
            "name": "Modern Office Chair",
            "description": "Ergonomic office chair with lumbar support.",
            "price": 385.67,
            "category": "Furniture",
            "photo_url": "https://api.slingacademy.com/public/sample-products/2.png",
            "created_at": "2023-02-15T00:00:00Z",
            "updated_at": "2024-01-02T00:00:00Z"
        },
        {
            "id": 3,
            "name": "Designer Denim Jacket",
            "description": "Classic denim jacket with modern styling.",
            "price": 205.44,
            "category": "Clothing",
            "photo_url": "https://api.slingacademy.com/public/sample-products/3.png",
            "created_at": "2023-03-10T00:00:00Z",
            "updated_at": "2024-01-03T00:00:00Z"
        },
        {
            "id": 4,
            "name": "Educational Robot Kit",
            "description": "STEM learning robot kit for children.",
            "price": 250.12,
            "category": "Toys",
            "photo_url": "https://api.slingacademy.com/public/sample-products/4.png",
            "created_at": "2023-04-20T00:00:00Z",
            "updated_at": "2024-01-04T00:00:00Z"
        },
        {
            "id": 5,
            "name": "Organic Coffee Beans",
            "description": "Premium organic coffee beans, freshly roasted.",
            "price": 34.76,
            "category": "Groceries",
            "photo_url": "https://api.slingacademy.com/public/sample-products/5.png",
            "created_at": "2023-05-05T00:00:00Z",
            "updated_at": "2024-01-05T00:00:00Z"
        },
        {
            "id": 6,
            "name": "Smart LED TV",
            "description": "4K Ultra HD Smart LED Television",
            "price": 899.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/6.png",
            "created_at": "2023-06-15T00:00:00Z",
            "updated_at": "2024-01-06T00:00:00Z"
        },
        {
            "id": 7,
            "name": "Leather Sofa Set",
            "description": "Premium leather sofa set with ottoman",
            "price": 1299.99,
            "category": "Furniture",
            "photo_url": "https://api.slingacademy.com/public/sample-products/7.png",
            "created_at": "2023-07-01T00:00:00Z",
            "updated_at": "2024-01-07T00:00:00Z"
        },
        {
            "id": 8,
            "name": "Wireless Earbuds",
            "description": "True wireless earbuds with charging case",
            "price": 129.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/8.png",
            "created_at": "2023-08-12T00:00:00Z",
            "updated_at": "2024-01-08T00:00:00Z"
        },
        {
            "id": 9,
            "name": "Running Shoes",
            "description": "Professional running shoes with arch support",
            "price": 89.99,
            "category": "Clothing",
            "photo_url": "https://api.slingacademy.com/public/sample-products/9.png",
            "created_at": "2023-09-20T00:00:00Z",
            "updated_at": "2024-01-09T00:00:00Z"
        },
        {
            "id": 10,
            "name": "Gaming Console",
            "description": "Next-gen gaming console with controllers",
            "price": 499.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/10.png",
            "created_at": "2023-10-05T00:00:00Z",
            "updated_at": "2024-01-10T00:00:00Z"
        },
        {
            "id": 11,
            "name": "Diamond Necklace",
            "description": "18K gold necklace with diamond pendant",
            "price": 2999.99,
            "category": "Jewelry",
            "photo_url": "https://api.slingacademy.com/public/sample-products/11.png",
            "created_at": "2023-11-15T00:00:00Z",
            "updated_at": "2024-01-11T00:00:00Z"
        },
        {
            "id": 12,
            "name": "Yoga Mat",
            "description": "Non-slip professional yoga mat",
            "price": 45.99,
            "category": "Sports",
            "photo_url": "https://api.slingacademy.com/public/sample-products/12.png",
            "created_at": "2023-12-01T00:00:00Z",
            "updated_at": "2024-01-12T00:00:00Z"
        },
        {
            "id": 13,
            "name": "Mechanical Keyboard",
            "description": "RGB mechanical gaming keyboard",
            "price": 159.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/13.png",
            "created_at": "2023-12-15T00:00:00Z",
            "updated_at": "2024-01-13T00:00:00Z"
        },
        {
            "id": 14,
            "name": "Designer Watch",
            "description": "Luxury analog watch with leather strap",
            "price": 799.99,
            "category": "Accessories",
            "photo_url": "https://api.slingacademy.com/public/sample-products/14.png",
            "created_at": "2024-01-01T00:00:00Z",
            "updated_at": "2024-01-14T00:00:00Z"
        },
        {
            "id": 15,
            "name": "Coffee Maker",
            "description": "Programmable coffee maker with grinder",
            "price": 199.99,
            "category": "Appliances",
            "photo_url": "https://api.slingacademy.com/public/sample-products/15.png",
            "created_at": "2024-01-15T00:00:00Z",
            "updated_at": "2024-01-15T00:00:00Z"
        },
        {
            "id": 16,
            "name": "Winter Jacket",
            "description": "Waterproof winter jacket with hood",
            "price": 245.99,
            "category": "Clothing",
            "photo_url": "https://api.slingacademy.com/public/sample-products/16.png",
            "created_at": "2024-01-20T00:00:00Z",
            "updated_at": "2024-01-16T00:00:00Z"
        },
        {
            "id": 17,
            "name": "Study Desk",
            "description": "Modern study desk with drawers",
            "price": 299.99,
            "category": "Furniture",
            "photo_url": "https://api.slingacademy.com/public/sample-products/17.png",
            "created_at": "2024-01-25T00:00:00Z",
            "updated_at": "2024-01-17T00:00:00Z"
        },
        {
            "id": 18,
            "name": "Digital Camera",
            "description": "Professional DSLR camera with lens",
            "price": 1299.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/18.png",
            "created_at": "2024-02-01T00:00:00Z",
            "updated_at": "2024-01-18T00:00:00Z"
        },
        {
            "id": 19,
            "name": "Protein Powder",
            "description": "Whey protein powder for athletes",
            "price": 59.99,
            "category": "Health",
            "photo_url": "https://api.slingacademy.com/public/sample-products/19.png",
            "created_at": "2024-02-05T00:00:00Z",
            "updated_at": "2024-01-19T00:00:00Z"
        },
        {
            "id": 20,
            "name": "Board Game Set",
            "description": "Classic board game collection",
            "price": 89.99,
            "category": "Toys",
            "photo_url": "https://api.slingacademy.com/public/sample-products/20.png",
            "created_at": "2024-02-10T00:00:00Z",
            "updated_at": "2024-01-20T00:00:00Z"
        },
        {
            "id": 21,
            "name": "Smart Watch",
            "description": "Fitness tracking smartwatch",
            "price": 299.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/21.png",
            "created_at": "2024-02-15T00:00:00Z",
            "updated_at": "2024-01-21T00:00:00Z"
        },
        {
            "id": 22,
            "name": "Dining Table Set",
            "description": "6-seater wooden dining table set",
            "price": 899.99,
            "category": "Furniture",
            "photo_url": "https://api.slingacademy.com/public/sample-products/22.png",
            "created_at": "2024-02-20T00:00:00Z",
            "updated_at": "2024-01-22T00:00:00Z"
        },
        {
            "id": 23,
            "name": "Mountain Bike",
            "description": "Professional mountain bike",
            "price": 799.99,
            "category": "Sports",
            "photo_url": "https://api.slingacademy.com/public/sample-products/23.png",
            "created_at": "2024-02-25T00:00:00Z",
            "updated_at": "2024-01-23T00:00:00Z"
        },
        {
            "id": 24,
            "name": "Laptop Backpack",
            "description": "Water-resistant laptop backpack",
            "price": 79.99,
            "category": "Accessories",
            "photo_url": "https://api.slingacademy.com/public/sample-products/24.png",
            "created_at": "2024-03-01T00:00:00Z",
            "updated_at": "2024-01-24T00:00:00Z"
        },
        {
            "id": 25,
            "name": "Air Purifier",
            "description": "HEPA air purifier for home",
            "price": 249.99,
            "category": "Appliances",
            "photo_url": "https://api.slingacademy.com/public/sample-products/25.png",
            "created_at": "2024-03-05T00:00:00Z",
            "updated_at": "2024-01-25T00:00:00Z"
        },
        {
            "id": 26,
            "name": "Wireless Mouse",
            "description": "Ergonomic wireless mouse",
            "price": 49.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/26.png",
            "created_at": "2024-03-10T00:00:00Z",
            "updated_at": "2024-01-26T00:00:00Z"
        },
        {
            "id": 27,
            "name": "Sunglasses",
            "description": "UV protection sunglasses",
            "price": 159.99,
            "category": "Accessories",
            "photo_url": "https://api.slingacademy.com/public/sample-products/27.png",
            "created_at": "2024-03-15T00:00:00Z",
            "updated_at": "2024-01-27T00:00:00Z"
        },
        {
            "id": 28,
            "name": "Portable Speaker",
            "description": "Waterproof bluetooth speaker",
            "price": 129.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/28.png",
            "created_at": "2024-03-20T00:00:00Z",
            "updated_at": "2024-01-28T00:00:00Z"
        },
        {
            "id": 29,
            "name": "Electric Toothbrush",
            "description": "Sonic electric toothbrush",
            "price": 89.99,
            "category": "Health",
            "photo_url": "https://api.slingacademy.com/public/sample-products/29.png",
            "created_at": "2024-03-25T00:00:00Z",
            "updated_at": "2024-01-29T00:00:00Z"
        },
        {
            "id": 30,
            "name": "Hiking Boots",
            "description": "Waterproof hiking boots",
            "price": 199.99,
            "category": "Clothing",
            "photo_url": "https://api.slingacademy.com/public/sample-products/30.png",
            "created_at": "2024-04-01T00:00:00Z",
            "updated_at": "2024-01-30T00:00:00Z"
        },
        {
            "id": 31,
            "name": "Smart Thermostat",
            "description": "WiFi-enabled smart thermostat",
            "price": 179.99,
            "category": "Electronics",
            "photo_url": "https://api.slingacademy.com/public/sample-products/31.png",
            "created_at": "2024-04-05T00:00:00Z",
            "updated_at": "2024-01-31T00:00:00Z"
        },
        {
            "id": 32,
            "name": "Bookshelf",
            "description": "Modern 5-tier bookshelf",
            "price": 159.99,
            "category": "Furniture",
            "photo_url": "https://api.slingacademy.com/public/sample-products/32.png",
            "created_at": "2024-04-10T00:00:00Z",
            "updated_at": "2024-02-01T00:00:00Z"
        },
        {
            "id": 33,
            "name": "Blender",
            "description": "High-speed blender for smoothies",
            "price": 129.99,
            "category": "Appliances",
            "photo_url": "https://api.slingacademy.com/public/sample-products/33.png",
            "created_at": "2024-04-15T00:00:00Z",
            "updated_at": "2024-02-02T00:00:00Z"
        },
        {
            "id": 34,
            "name": "Dress Shoes",
            "description": "Leather dress shoes",
            "price": 149.99,
            "category": "Clothing",
            "photo_url": "https://api.slingacademy.com/public/sample-products/34.png",
            "created_at": "2024-04-20T00:00:00Z",
            "updated_at": "2024-02-03T00:00:00Z"
        },
        {
            "id": 35,
            "name": "Robot Vacuum",
            "description": "Smart robot vacuum cleaner",
            "price": 399.99,
            "category": "Appliances",
            "photo_url": "https://api.slingacademy.com/public/sample-products/35.png",
            "created_at": "2024-04-25T00:00:00Z",
            "updated_at": "2024-02-04T00:00:00Z"
        }
    ],

    async getProducts({
        page = 1,
        limit = 10,
        search = "",
        categories = ""
    }: {
        page?: number;
        limit?: number;
        search?: string;
        categories?: string;
    }) {
        await delay(500); // Simulate API delay

        let filteredProducts = [...this.records];

        // Apply search filter
        if (search) {
            filteredProducts = filteredProducts.filter(
                product =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply category filter
        if (categories) {
            const categoryList = categories.split('.');
            filteredProducts = filteredProducts.filter(product =>
                categoryList.includes(product.category)
            );
        }

        // Calculate pagination
        const totalProducts = filteredProducts.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        return {
            success: true,
            products: paginatedProducts,
            total_products: totalProducts,
            current_page: page,
            total_pages: Math.ceil(totalProducts / limit),
            limit
        };
    }
}