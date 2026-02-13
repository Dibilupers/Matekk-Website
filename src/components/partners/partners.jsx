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
        <div className="grid grid-cols-6 grid-rows-3 gap-4">
            {partnerLogos.map((logo, index) => (
                <div key={index} className="partner-logos-format">
                    <img src={logo.src} alt={logo.alt} className="w-16"></img>
                </div>
            ))}
        </div>
    );
}

export default Partners;