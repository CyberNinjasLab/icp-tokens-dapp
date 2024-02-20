import Layout from '../ui/components/_base/Layout';

const Dex = () => {
	return (
		<Layout>
			<div className='w-full text-center md:mt-6'>
				<span className='text-center block text-3xl md:text-4xl uppercase font-semibold'>DEX</span>
				<span className='text-center block text-lg md:text-xl uppercase font-semibold mb-10'>Under construction</span>
				<img src="/illustrations/under-construct.svg" className='max-w-[440px] inline' />
			</div>
		</Layout>
	);
};

export default Dex;