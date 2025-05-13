
import { Link, useLoaderData } from 'react-router';
import CoffeeCard from './CoffeeCard';
import { BsCup } from 'react-icons/bs';

const Home = () => {
    const coffees = useLoaderData();
    console.log(coffees);
    return (
        <div className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://i.ibb.co/8gx8kWjF/bg-home.png')" }}>
            <div className="max-w-6xl mx-auto py-12 px-4">
                <h2 className="text-center text-xl font-bold text-primary mb-8">
                    --- Sip & Savor ---
                </h2>
                <h3 className="text-center text-shadow-primary rancho-font text-5xl font-semibold text-primary mb-6">
                    Our Popular Products
                </h3>
                <div className="text-center mb-8">
                    <Link to="/add-coffee">
                        <button className="text-2xl rancho-font text-white btn bg-secondary hover:opacity-90">
                            Add Coffee <BsCup />
                        </button>
                    </Link>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {

                        coffees.map(coffee => <CoffeeCard key={coffee._id} coffee={coffee}></CoffeeCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;