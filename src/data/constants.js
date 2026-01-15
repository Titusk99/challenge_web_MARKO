// Centralized product data to be used across the application

export const GENDERS = ['Women', 'Men', 'Accessories']

export const BRANDS = [
    'Chanel',
    'Dior',
    'La Mer',
    'Aesop',
    'Gucci',
    'Prada',
    'Nike',
    'Zara',
    'Louis Vuitton',
    'Hermès',
    'Saint Laurent'
]

export const COLORS = [
    'Black',
    'White',
    'Beige',
    'Blue',
    'Green',
    'Red',
    'Pink',
    'Grey',
    'Brown',
    'Gold',
    'Purple',
    'Orange',
    'Multi',
    'Imprime'
]

// Mapping of Gender -> Clothing Types (Categories)
export const CLOTHING_TYPES = {
    Women: [
        'Coats & Jackets',
        'Dresses',
        'Tops & Shirts',
        'Pants',
        'Knitwear',
        'Skirts',
        'Shoes',
        'Bags'
    ],
    Men: [
        'Suits & Blazers',
        'Shirts',
        'Trousers',
        'Jeans',
        'Outerwear',
        'Shoes',
        'Accessories'
    ],
    Accessories: [
        'Bags',
        'Jewelry',
        'Watches',
        'Sunglasses',
        'Hats'
    ],
    Beauty: [
        'Skincare',
        'Makeup',
        'Fragrance',
        'Haircare'
    ]
}

// Helper to get all unique types as a flat list
export const ALL_CLOTHING_TYPES = [
    ...new Set(
        Object.values(CLOTHING_TYPES).flat()
    )
]
