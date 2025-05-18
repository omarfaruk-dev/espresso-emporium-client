import img1 from '../assets/images/cups/1.png';
import img2 from '../assets/images/cups/2.png';
import img3 from '../assets/images/cups/3.png';
import img4 from '../assets/images/cups/4.png';
import img5 from '../assets/images/cups/5.png';
import img6 from '../assets/images/cups/6.png';
import img7 from '../assets/images/cups/7.png';
import img8 from '../assets/images/cups/8.png';


const InstagramFeatures = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8];

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h2 className="text-center text-xl font-bold text-primary mb-8">
                Follow Us Now!
            </h2>
            <h3 className=" text-center text-shadow-primary rancho-font text-5xl font-semibold text-primary mb-12">
                Follow on Instagram
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-md shadow-sm">
                        <img
                            src={img}
                            alt={`Instagram ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstagramFeatures;
