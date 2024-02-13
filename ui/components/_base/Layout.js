import Header from './header/Header';
import Footer from './Footer';
import ThemeRegistry from '../../../utils/ThemeRegistry';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <ThemeRegistry options={{ key: 'mui-theme' }}>
        <main className="pt-[84px] mx-auto container px-4 md:px-8">{children}</main>
      </ThemeRegistry>
      <Footer />
    </div>
  );
};

export default Layout;
