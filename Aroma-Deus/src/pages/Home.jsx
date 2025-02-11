import { Link } from "react-router";
import { useState, useEffect } from "react";
import { phase2api } from "../helpers/http-client";
import Swal from "sweetalert2";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import Card from "../components/Card";

// const perfumes = [
//   {
//     id: 1,
//     name: "Addict",
//     description:
//       "Notes \nTop Notes : Berries \nHeart Notes : Red Rose, Coffee \nBase Notes : Patchouli, Amber & Tonka Beans",
//     price: 249000,
//     stock: 12,
//     imgUrl: "https://madeforhmns.com/cdn/shop/files/Addict-3.png?v=1718072138",
//     authorId: 1,
//     categoryId: "HMNS",
//   },
//   {
//     id: 2,
//     name: "Fields of Ubud",
//     description:
//       "Notes \nTop Notes : Ambrette Seeds & Bergamot \nHeart Notes : Dried Fruits, Lavender & Sage \nBase Notes : Java Vetiver, Oakmoss & Sandalwood",
//     price: 295000,
//     stock: 35,
//     imgUrl:
//       "https://down-my.img.susercontent.com/file/my-11134207-7r98t-lxf0zfkj4zn4e5",
//     authorId: 2,
//     categoryId: "Project 1945",
//   },
//   {
//     id: 3,
//     name: "Black Opium",
//     description:
//       "Top notes are Pear, Pink Pepper and Orange Blossom; middle notes are Coffee, Jasmine, Bitter Almond and Licorice; base notes are Vanilla, Patchouli, Cashmere Wood and Cedar.",
//     price: 2650000,
//     stock: 8,
//     imgUrl:
//       "https://assets.ongoody.com/store/products/image/IFK7IUNty7QHpTP0uEDNeJiy8L6ghWbc.png?width=800&format=webp",
//     authorId: 3,
//     categoryId: "YSL",
//   },
//   {
//     id: 4,
//     name: "Libre",
//     description:
//       "Top notes are Lavender, Mandarin Orange, Black Currant and Petitgrain; middle notes are Lavender, Orange Blossom and Jasmine; base notes are Madagascar Vanilla, Musk, Cedar and Ambergris.",
//     price: 3290000,
//     stock: 11,
//     imgUrl:
//       "https://www.lmching.com/cdn/shop/files/D_anm_i-1753_540x.jpg?v=1692721820",
//     authorId: 1,
//     categoryId: "YSL",
//   },
//   {
//     id: 5,
//     name: "Homme Intense",
//     description:
//       "Top note is Lavender; middle notes are Iris, Ambrette (Musk Mallow) and Pear; base notes are Virginia Cedar and Vetiver.",
//     price: 3790000,
//     stock: 4,
//     imgUrl: "https://redolencenpl.com/wp-content/uploads/2024/07/63-12.png",
//     authorId: 2,
//     categoryId: "Dior",
//   },
//   {
//     id: 6,
//     name: "J'adore",
//     description:
//       "Top notes are Pear, Melon, Magnolia, Peach, Mandarin Orange and Bergamot; middle notes are Jasmine, Lily-of-the-Valley, Tuberose, Freesia, Rose, Orchid, Plum and Violet; base notes are Musk, Vanilla, Cedar and Blackberry.",
//     price: 4990000,
//     stock: 15,
//     imgUrl:
//       "https://perfumeheadquarters.com/cdn/shop/files/christian-dior-jadore-gift-set-3348901617673-471138.jpg?v=1717637814&width=1445",
//     authorId: 3,
//     categoryId: "Dior",
//   },
//   {
//     id: 7,
//     name: "No. 5 Eau de Parfum",
//     description:
//       "Top notes are Aldehydes, Ylang-Ylang, Neroli, Bergamot and Peach; middle notes are Iris, Jasmine, Rose and Lily-of-the-Valley; base notes are Sandalwood, Vanilla, Oakmoss, Vetiver and Patchouli.",
//     price: 4290000,
//     stock: 5,
//     imgUrl:
//       "https://www.colombiaroyalparfums.store/cdn/shop/files/imagen_2024-11-04_160723152.png?v=1730754445&width=1445",
//     authorId: 1,
//     categoryId: "Chanel",
//   },
//   {
//     id: 8,
//     name: "Bleu de Chanel",
//     description:
//       "Top notes are Grapefruit, Lemon, Mint, Pink Pepper, Bergamot, Aldehydes and Coriander; middle notes are Ginger, Nutmeg, Jasmine and Melon; base notes are Incense, Amber, Cedar, Sandalwood, Patchouli, Amberwood and Labdanum.",
//     price: 3890000,
//     stock: 10,
//     imgUrl:
//       "https://yourperfumeshop.co.uk/cdn/shop/articles/bleu-de-chanel-advert-parfum.png?v=1717604981",
//     authorId: 2,
//     categoryId: "Chanel",
//   },
//   {
//     id: 9,
//     name: "Legend Night",
//     description:
//       "Top notes are Cardamom, Mint, Clary Sage and Bergamot; middle notes are Apple, Lavender, Cedar, Violet and Fir Resin; base notes are Black Vanilla Husk, Akigalawood, Musk, Vetiver and Patchouli.",
//     price: 1890000,
//     stock: 21,
//     imgUrl:
//       "https://cdn.parfumdreams.de/Img/Art/5/Montblanc-Legend-Night-Eau-de-Parfum-Spray-68955x4_5.jpg",
//     authorId: 3,
//     categoryId: "Montblanc",
//   },
// ];

function Home() {
  const [perfumes, setPerfumes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("ASC");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const fetchPerfumes = async () => {
    try {
      console.log(searchQuery, selectedCategory, sort, page);
      const response = await phase2api.get(`/pub/products`, {
        params: {
          q: searchQuery,
          i: selectedCategory,
          sort: sort,
          limit: 9,
          page: page,
        },
      });
      console.log(response.data);
      setPerfumes(response.data.data);
      setCount(response.data.totalData);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch perfumes",
      });
    }
  };

  useEffect(() => {
    fetchPerfumes();
  }, [searchQuery, selectedCategory, sort, page]);

  const fetchCategories = async () => {
    try {
      const response = await phase2api.get(`/pub/categories`);
      // console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch categories",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="bg-[#FEFAF6]">
        <Navbar />
        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Search Bar */}
          <Searchbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
              <Filter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sort={sort}
                setSort={setSort}
              />
            </div>
            {/* Perfume Cards */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example Card */}
                {perfumes.map((perfume) => (
                  <div key={perfume.id}>
                    <Link to={`/perfume/${perfume.id}`}>
                      <Card perfume={perfume} />
                    </Link>
                  </div>
                ))}
                {/* Repeat cards as needed */}
              </div>
              {/* Pagination */}
              <Pagination count={count} page={page} setPage={setPage} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
