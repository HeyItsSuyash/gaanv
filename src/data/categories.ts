export interface Category {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  alt: string;
  slug: string;
}

export const initialCategories: Category[] = [
  {
    id: "cat-1",
    name: "Handicrafts",
    subtitle: "Clay, wood, metal and more",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff31f3d6-1772210530281.png",
    alt: "Handcrafted clay and terracotta pottery in warm earthy tones, natural light studio",
    slug: "Handicrafts",
  },
  {
    id: "cat-2",
    name: "Chikankari & Textiles",
    subtitle: "Embroidery, weaves & handlooms",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1694b9db0-1772079211071.png",
    alt: "Close-up of intricate chikankari embroidery on white fabric, delicate floral patterns",
    slug: "Textiles",
  },
  {
    id: "cat-3",
    name: "Handmade Décor",
    subtitle: "Earthy, artisanal home pieces",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_179499a31-1774609499506.png",
    alt: "Artisanal home decor items in terracotta and natural materials, warm indoor setting",
    slug: "Décor",
  },
  {
    id: "cat-4",
    name: "Food & Local Products",
    subtitle: "Village-sourced, natural & pure",
    image: "https://images.unsplash.com/photo-1679069564583-edd3b8baa868",
    alt: "Natural local Indian food products and spices in earthy bowls, bright natural light",
    slug: "Food",
  },
  {
    id: "cat-5",
    name: "Gifts & Hampers",
    subtitle: "Curated with meaning",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f870bcf3-1766556150576.png",
    alt: "Beautiful gift hamper with handmade Indian products, natural jute wrapping and flowers",
    slug: "Gifts",
  },
  {
    id: "cat-6",
    name: "Rural Lifestyle",
    subtitle: "Baskets, bags & everyday craft",
    image: "https://images.unsplash.com/photo-1677146339793-ad2f6e8bf64f",
    alt: "Handwoven bamboo and cane baskets in natural setting, rural Indian craft tradition",
    slug: "Rural Lifestyle",
  },
];
