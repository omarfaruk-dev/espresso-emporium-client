import CoffeeContainer from "./CoffeeContainer";
import Footer from "./Footer";

const Home = () => {
    // const initialCoffees = useLoaderData();
    // const [coffees, setCoffees] = useState(initialCoffees);
    return (
        <>
            <section>
                <CoffeeContainer />
            </section>
            <section>
                <Footer />
            </section>
        </>
    );
};

export default Home;