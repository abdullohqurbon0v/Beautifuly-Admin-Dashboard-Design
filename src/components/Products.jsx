// import phone from "/phone.png";
// import watch from "../../public/watch.png";

const Products = () => {
  return (
    <div
      className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-6 text-gray-100">Products</h2>
      <div className="flex h-30 justify-between text-sm text-gray-400 pb-2 mb-6">
        <span>Products</span>
        <span>Price</span>
      </div>
      <ul className="mt-4 space-y-4 text-xs">
        <li className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <img
              src={"/phone.png"}
              alt={"piPhone 14 Pro Max"}
              className="w-10 h-12 bg-[#081028] rounded-lg  "
            />
            <div>
              <p className="font-medium text-sm">piPhone 14 Pro Max</p>
              <p className="text-gray-400 ">524 in stock</p>
            </div>
          </div>
          <p className="font-medium">$1099.0</p>
        </li>
        <li className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <img
              src={"/watch.png"}
              alt={"Apple Watch S8"}
              className="w-10 h-10 bg-[#081028] rounded-lg  "
            />
            <div>
              <p className="font-medium text-sm">Apple Watch S8</p>
              <p className="text-gray-400 ">320 in stock</p>
            </div>
          </div>
          <p className="font-medium">$ 799.0</p>
        </li>
      </ul>
    </div>
  );
};
export default Products;
