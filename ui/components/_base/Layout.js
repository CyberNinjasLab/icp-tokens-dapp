import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-screen-2xl p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
