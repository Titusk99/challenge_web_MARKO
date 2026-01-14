export const navigation = {
    women: {
        label: 'WOMEN',
        column1: {
            title: 'New Arrivals',
            items: [
                { label: 'View All', href: '/category/women/new' },
                { label: 'Clothing', href: '/category/women/clothing' },
                { label: 'Shoes', href: '/category/women/shoes' },
                { label: 'Accessories', href: '/category/women/accessories' },
            ]
        },
        column2: {
            title: 'Clothing',
            items: [
                { label: 'Coats & Jackets', href: '/category/women/coats' },
                { label: 'Dresses', href: '/category/women/dresses' },
                { label: 'Tops & Shirts', href: '/category/women/tops' },
                { label: 'Pants', href: '/category/women/pants' },
                { label: 'Knitwear', href: '/category/women/knitwear' },
            ]
        },
        column3: {
            title: 'Curated',
            items: [
                { label: 'The Wedding Edit', href: '/category/women/wedding' },
                { label: 'Vacation Shop', href: '/category/women/vacation' },
                { label: 'Office Wear', href: '/category/women/office' },
            ]
        },
        featured: {
            image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800&auto=format&fit=crop', // Example luxurious image
            title: 'THE SUMMER COLLECTION',
            href: '/collections/summer-women'
        }
    },
    men: {
        label: 'MEN',
        column1: {
            title: 'New Arrivals',
            items: [
                { label: 'View All', href: '/category/men/new' },
                { label: 'Clothing', href: '/category/men/clothing' },
                { label: 'Shoes', href: '/category/men/shoes' },
                { label: 'Accessories', href: '/category/men/accessories' },
            ]
        },
        column2: {
            title: 'Clothing',
            items: [
                { label: 'Suits & Blazers', href: '/category/men/suits' },
                { label: 'Shirts', href: '/category/men/shirts' },
                { label: 'Trousers', href: '/category/men/trousers' },
                { label: 'Jeans', href: '/category/men/jeans' },
                { label: 'Outerwear', href: '/category/men/outerwear' },
            ]
        },
        column3: {
            title: 'Edits',
            items: [
                { label: 'Business Casual', href: '/category/men/business' },
                { label: 'Weekend Ready', href: '/category/men/weekend' },
            ]
        },
        featured: {
            image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&auto=format&fit=crop',
            title: 'MODERN TAILORING',
            href: '/collections/tailoring-men'
        }
    },
    beauty: {
        label: 'BEAUTY',
        column1: {
            title: 'Categories',
            items: [
                { label: 'Skincare', href: '/category/beauty/skincare' },
                { label: 'Makeup', href: '/category/beauty/makeup' },
                { label: 'Fragrance', href: '/category/beauty/fragrance' },
                { label: 'Haircare', href: '/category/beauty/haircare' },
            ]
        },
        column2: {
            title: 'Brands',
            items: [
                { label: 'Chanel', href: '/brands/chanel' },
                { label: 'Dior', href: '/brands/dior' },
                { label: 'La Mer', href: '/brands/la-mer' },
                { label: 'Aesop', href: '/brands/aesop' },
            ]
        },
        column3: {
            title: 'Concern',
            items: [
                { label: 'Anti-Aging', href: '/category/beauty/anti-aging' },
                { label: 'Hydration', href: '/category/beauty/hydration' },
                { label: 'Blemishes', href: '/category/beauty/blemishes' },
            ]
        },
        featured: {
            image: 'https://images.unsplash.com/photo-1612817288484-9660c989716d?q=80&w=800&auto=format&fit=crop',
            title: 'NEW SEASON BEAUTY',
            href: '/collections/new-beauty'
        }
    }
}
