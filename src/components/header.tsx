import HeidiSvg from "@/assets/heidi.svg";

const Header = () => (
  <header className="h-16 w-full px-6 flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
    <img src={HeidiSvg} alt="heidi logo" className="h-10" />
    <nav className="flex flex-row justify-between items-center gap-x-6">
      <a href="/" className="text-white text-lg font-semibold hover:text-gray-200 transition duration-200">Home</a>
      <a href="#footer" className="text-white text-lg font-semibold hover:text-gray-200 transition duration-200">Contact us</a>
    </nav>
  </header>
)

export default Header;