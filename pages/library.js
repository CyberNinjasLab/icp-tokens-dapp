import Layout from '../ui/components/_base/Layout';

const Library = () => {
	return (
		<Layout>
			<div className='w-full text-center md:mt-6'>
				<span className='text-center block text-3xl md:text-4xl uppercase font-semibold'>Library</span>
				<span className='text-center block text-lg md:text-xl uppercase font-semibold mb-10'>Under construction</span>
				<img src="/illustrations/under-construct.svg" className='max-w-[440px] inline grayscale' />
			</div>
		</Layout>
	);
};

export default Library;