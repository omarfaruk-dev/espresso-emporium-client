import CoffeeContainer from "./CoffeeContainer";
import Footer from "./Footer";
import InstagramFeatures from "./InstagramFeatures";

const Home = () => {
    // const initialCoffees = useLoaderData();
    // const [coffees, setCoffees] = useState(initialCoffees);
    return (
        <>
            <section>
                <CoffeeContainer />
            </section>
            <section>
                <InstagramFeatures/>
            </section>
        </>
    );
};

export default Home;