import DOH from '../../assets/DOH.svg';

function Partners() {
    const partnerLogos = [
        { src: DOH, alt: "DOH Logo"},
        { src: DOH, alt: "DOH Logo"},
        { src: DOH, alt: "DOH Logo"},
        { src: DOH, alt: "DOH Logo"},
        { src: DOH, alt: "DOH Logo"},
        { src: DOH, alt: "DOH Logo"},
        { src: DOH, alt: "DOH Logo"},
    ];

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 md:grid-rows-3 lg:grid-rows-5 xl:grid-rows-5 2xl:grid-rows-6 gap-3 sm:gap-1 md:gap-4 lg:gap-4">
            {partnerLogos.map((logo, index) => (
                <div key={index} className="partner-logos-format">
                    <img src={logo.src} alt={logo.alt} className="w-12 md:w-16"></img>
                </div>
            ))}
        </div>
    );
}

export default Partners;