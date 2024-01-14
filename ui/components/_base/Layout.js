import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className='mx-auto container px-4 md:px-8 mt-8'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;