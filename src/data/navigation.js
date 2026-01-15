export const navigation = {
    women: {
        label: 'WOMEN',
        column1: {
            title: 'New Arrivals',
            items: [
                { label: 'View All', href: '/products?category=women-new' },
                { label: 'Clothing', href: '/products?category=women-clothing' },
                { label: 'Shoes', href: '/products?category=women-shoes' },
                { label: 'Accessories', href: '/products?category=women-accessories' },
            ]
        },
        column2: {
            title: 'Clothing',
            items: [
                { label: 'Coats & Jackets', href: '/products?category=coats-jackets' },
                { label: 'Dresses', href: '/products?category=dresses' },
                { label: 'Tops & Shirts', href: '/products?category=tops-shirts' },
                { label: 'Pants', href: '/products?category=pants' },
                { label: 'Knitwear', href: '/products?category=knitwear' },
            ]
        },
        column3: {
            title: 'Curated',
            items: [
                { label: 'The Wedding Edit', href: '/products?category=wedding' },
                { label: 'Vacation Shop', href: '/products?category=vacation' },
                { label: 'Office Wear', href: '/products?category=office' },
            ]
        },
        featured: {
            image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800&auto=format&fit=crop', // Example luxurious image
            title: 'THE SUMMER COLLECTION',
            href: '/products?category=summer-collection'
        }
    },
    men: {
        label: 'MEN',
        column1: {
            title: 'New Arrivals',
            items: [
                { label: 'View All', href: '/products?category=men-new' },
                { label: 'Clothing', href: '/products?category=men-clothing' },
                { label: 'Shoes', href: '/products?category=men-shoes' },
                { label: 'Accessories', href: '/products?category=men-accessories' },
            ]
        },
        column2: {
            title: 'Clothing',
            items: [
                { label: 'Suits & Blazers', href: '/products?category=suits-blazers' },
                { label: 'Shirts', href: '/products?category=shirts' },
                { label: 'Trousers', href: '/products?category=trousers' },
                { label: 'Jeans', href: '/products?category=jeans' },
                { label: 'Outerwear', href: '/products?category=outerwear' },
            ]
        },
        column3: {
            title: 'Edits',
            items: [
                { label: 'Business Casual', href: '/products?category=business-casual' },
                { label: 'Weekend Ready', href: '/products?category=weekend-ready' },
            ]
        },
        featured: {
            image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&auto=format&fit=crop',
            title: 'MODERN TAILORING',
            href: '/products?category=modern-tailoring'
        }
    },
    beauty: {
        label: 'BEAUTY',
        column1: {
            title: 'Categories',
            items: [
                { label: 'Skincare', href: '/products?category=skincare' },
                { label: 'Makeup', href: '/products?category=makeup' },
                { label: 'Fragrance', href: '/products?category=fragrance' },
                { label: 'Haircare', href: '/products?category=haircare' },
            ]
        },
        column2: {
            title: 'Brands',
            items: [
                { label: 'Chanel', href: '/products?category=chanel' },
                { label: 'Dior', href: '/products?category=dior' },
                { label: 'La Mer', href: '/products?category=la-mer' },
                { label: 'Aesop', href: '/products?category=aesop' },
            ]
        },
        column3: {
            title: 'Concern',
            items: [
                { label: 'Anti-Aging', href: '/products?category=anti-aging' },
                { label: 'Hydration', href: '/products?category=hydration' },
                { label: 'Blemishes', href: '/products?category=blemishes' },
            ]
        },
        featured: {
            image: 'https://images.unsplash.com/photo-1612817288484-9660c989716d?q=80&w=800&auto=format&fit=crop',
            title: 'NEW SEASON BEAUTY',
            href: '/products?category=new-beauty'
        }
    }
}
