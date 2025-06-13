import logoImg from "../assets/logo.jpg";

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

const Header = ({
  title = "Investment Calculator",
  subtitle = "Do investment calculations",
}: HeaderProps) => {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex-shrink-0">
            <img
              src={logoImg}
              alt="Investment Calculator Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full shadow-md border-2 border-white/20 object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-1 sm:mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base lg:text-lg text-blue-100 font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500"></div>
    </header>
  );
};

export default Header;
