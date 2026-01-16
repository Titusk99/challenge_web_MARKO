export const navigation = {
    women: {
        id: 'women',
        name: 'Women',
        sections: [
            {
                id: 'clothing',
                name: 'Clothing',
                items: [
                    { name: 'Dresses', href: '/products?category=dresses&gender=Women' },
                    { name: 'Tops', href: '/products?category=tops&gender=Women' },
                    { name: 'Pants', href: '/products?category=pants&gender=Women' },
                    { name: 'Jackets', href: '/products?category=jackets&gender=Women' },
                    { name: 'Activewear', href: '/products?category=activewear&gender=Women' },
                ],
            },
            {
                id: 'accessories',
                name: 'Accessories',
                items: [
                    { name: 'Bags', href: '/products?category=bags&gender=Women' },
                    { name: 'Jewelry', href: '/products?category=jewelry&gender=Women' },
                    { name: 'Belts', href: '/products?category=belts&gender=Women' },
                    { name: 'Sunglasses', href: '/products?category=sunglasses&gender=Women' },
                ],
            },
            {
                id: 'shoes',
                name: 'Shoes',
                items: [
                    { name: 'Sneakers', href: '/products?category=sneakers&gender=Women' },
                    { name: 'Boots', href: '/products?category=boots&gender=Women' },
                    { name: 'Heels', href: '/products?category=heels&gender=Women' },
                    { name: 'Sandals', href: '/products?category=sandals&gender=Women' },
                ],
            }
        ],
    },
    men: {
        id: 'men',
        name: 'Men',
        sections: [
            {
                id: 'clothing',
                name: 'Clothing',
                items: [
                    { name: 'Shirts', href: '/products?category=shirts&gender=Men' },
                    { name: 'Pants', href: '/products?category=pants&gender=Men' },
                    { name: 'Jackets', href: '/products?category=jackets&gender=Men' },
                    { name: 'Suits', href: '/products?category=suits&gender=Men' },
                ],
            },
            {
                id: 'accessories',
                name: 'Accessories',
                items: [
                    { name: 'Watches', href: '/products?category=watches&gender=Men' },
                    { name: 'Wallets', href: '/products?category=wallets&gender=Men' },
                    { name: 'Belts', href: '/products?category=belts&gender=Men' },
                ],
            },
            {
                id: 'shoes',
                name: 'Shoes',
                items: [
                    { name: 'Sneakers', href: '/products?category=sneakers&gender=Men' },
                    { name: 'Boots', href: '/products?category=boots&gender=Men' },
                    { name: 'Oxfords', href: '/products?category=oxfords&gender=Men' },
                ],
            }
        ],
    },
    beauty: {
        id: 'beauty',
        name: 'Beauty',
        sections: [
            {
                id: 'makeup',
                name: 'Makeup',
                items: [
                    { name: 'Face', href: '/products?category=face' },
                    { name: 'Eyes', href: '/products?category=eyes' },
                    { name: 'Lips', href: '/products?category=lips' },
                ],
            },
            {
                id: 'skincare',
                name: 'Skincare',
                items: [
                    { name: 'Moisturizers', href: '/products?category=moisturizers' },
                    { name: 'Cleansers', href: '/products?category=cleansers' },
                    { name: 'Serums', href: '/products?category=serums' },
                ],
            },
            {
                id: 'fragrance',
                name: 'Fragrance',
                items: [
                    { name: 'Perfume', href: '/products?category=perfume' },
                    { name: 'Cologne', href: '/products?category=cologne' },
                ],
            }
        ],
    }
}
