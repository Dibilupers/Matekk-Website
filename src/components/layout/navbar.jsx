export default function NavBar() {
    return (
        <header className="flex flex-row items-center p-4 justify-between mx-[7.438rem] sticky top-0 z-50">
            <a>
                {/* Change to img to put the logo later on */}
                <p>logo</p>
            </a>
            <nav className="space-x-8">
                <a href="#home">Home</a>
                <a href="#solutions">Solutions</a>
                <a href="#training">Training</a>
                <a href="#about">About</a>
                <a href="#contact-us">Contact Us</a>
            </nav>
            <button>Enroll Now</button>
        </header>
    );
}