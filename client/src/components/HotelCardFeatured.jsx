import HotelCard from "./HotelCard";
import { UseAppContext } from "../context/AppContext";

const HotelCardFeatured = () => {
  const { rooms, navigate } = UseAppContext(); // Accessing roomsDummyData from context
  return (
    rooms.length > 0 && (
      <div className="mt-20 flex flex-col items-center  text-center ">
        <p>
          <span className="text-4xl md:text-5xl font-stretch-500%">
            Featured Hotels And Destination
          </span>
        </p>
        <div className="text-gray-600 text-center mt-5 max-sm:mx-4">
          From serene beaches to vibrant cities, we've got your stay covered.{" "}
          <br />
          Explore our top-rated hotels and destinations, handpicked for your
          perfect getaway. <br />
          Book now and create unforgettable memories.
        </div>

        {/* hotel card  */}
        <div className="px-6 md:px-16 lg:px-24 flex flex-wrap justify-center gap-4 mt-10 md:mt-20 w-full">
          {rooms.map((room, index) => (
            <HotelCard key={room._id} room={room} />
          ))}
        </div>

        <div>
          <button
            onClick={() => {
              navigate("/hotels");
            }}
            className="bg-black text-white px-5 py-2.5 mt-15 cursor-pointer rounded-md  hover:bg-gray-800 transition-colors"
          >
            View All Hotels
          </button>
        </div>
      </div>
    )
  );
};

export default HotelCardFeatured;
