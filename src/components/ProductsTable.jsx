import {
  Edit,
  Search,
  Trash2,
  User,
  ChevronsUpDown,
  Phone,
  ShoppingBag,
  SquareCheck,
  MapPin,
} from "lucide-react";
import {
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaReddit,
  FaSpotify,
  FaPinterest,
  FaTwitch,
  FaLinkedin,
} from "react-icons/fa";
import { FaWebflow } from "react-icons/fa6";

const PRODUCT_DATA = [
  {
    id: 1,
    name: "John Carter",
    email: "john@google.com",
    phone: "(414) 907 - 1274",
    location: "United States",
    company: "Google",
    iconCompany: <FaGoogle />,
    status: "Online",
  },
  {
    id: 2,
    name: "Sophie Moore",
    email: "sophie@webflow.com",
    phone: "(240) 480 - 4277",
    location: "United Kingdom",
    company: "Webflow",
    iconCompany: <FaWebflow />,
    status: "Offline",
  },
  {
    id: 3,
    name: "Matt Cannon",
    email: "matt@facebook.com",
    phone: "(318) 598 - 9889",
    location: "Australia",
    company: "Facebook",
    iconCompany: <FaFacebook />,
    status: "Offline",
  },
  {
    id: 4,
    name: "Graham Hills",
    email: "graham@twitter.com",
    phone: "(540) 627 - 3890",
    location: "India",
    company: "Twitter",
    iconCompany: <FaTwitter />,
    status: "Online",
  },
  {
    id: 5,
    name: "Sandy Houston",
    email: "sandy@youtube.com",
    phone: "(440) 410 - 3848",
    location: "Canada",
    company: "YouTube",
    iconCompany: <FaYoutube />,
    status: "Offline",
  },
  {
    id: 6,
    name: "Andy Smith",
    email: "andy@reddit.com",
    phone: "(504) 458 - 3268",
    location: "United States",
    company: "Reddit",
    iconCompany: <FaReddit />,
    status: "Online",
  },
  {
    id: 7,
    name: "Lilly Woods",
    email: "lilly@spotify.com",
    phone: "(361) 692 - 1819",
    location: "Australia",
    company: "Spotify",
    iconCompany: <FaSpotify />,
    status: "Offline",
  },
  {
    id: 8,
    name: "Patrick Meyer",
    email: "patrick@pinterest.com",
    phone: "(760) 582 - 5670",
    location: "United Kingdom",
    company: "Pinterest",
    iconCompany: <FaPinterest />,
    status: "Online",
  },
  {
    id: 9,
    name: "Frances Willen",
    email: "frances@twitch.com",
    phone: "(216) 496 - 5684",
    location: "Canada",
    company: "Twitch",
    iconCompany: <FaTwitch />,
    status: "Offline",
  },
  {
    id: 10,
    name: "Ernest Houston",
    email: "ernest@linkedin.com",
    phone: "(704) 339 - 8813",
    location: "India",
    company: "LinkedIn",
    iconCompany: <FaLinkedin />,
    status: "Offline",
  },
];

const ProductsTable = () => {
  return (
    <div
      className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6  mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <User />
                  <span>Name</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <Phone />
                  <span>Phone</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <MapPin />
                  <span>Location</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <ShoppingBag />
                  <span>Company</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <SquareCheck />
                  <span>Status</span>
                  <ChevronsUpDown />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {PRODUCT_DATA.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                    alt="Product img"
                    className="size-10 rounded-full"
                  />
                  {product.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.phone}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-2 text-gray-300">
                  {product.iconCompany}
                  <span>{product.company}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductsTable;
