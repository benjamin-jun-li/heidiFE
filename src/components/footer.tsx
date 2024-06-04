import Heidi from "@/assets/heidi.svg";

const Footer = () => (
  <footer id="footer" className="bg-gray-600 text-white py-6 px-4">
    <section className="flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h1 className="text-xl font-bold">Heidi Voice Studio</h1>
        <p className="text-sm">© 2024 Heidi Voice Studio. All rights reserved.</p>
      </div>
      <div className="flex space-x-6">
        <a href="https://www.heidihealth.com/au" target="_blank" rel="noopener noreferrer">
          <img src={Heidi} alt="heidi logo" />
        </a>
      </div>
    </section>
  </footer>
)

export default Footer;