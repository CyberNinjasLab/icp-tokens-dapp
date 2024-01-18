import Header from './Header';
import Footer from './Footer';
import ThemeRegistry from '../../../utils/ThemeRegistry';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <ThemeRegistry options={{ key: 'mui-theme' }}>
        <main className="mx-auto max-w-screen-2xl p-4">{children}</main>
      </ThemeRegistry>
      <Footer />
    </div>
  );
};

export default Layout;
