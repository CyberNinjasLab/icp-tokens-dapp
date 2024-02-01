import Layout from '../ui/components/_base/Layout';

const News = () => {
	return (
		<Layout>
			<div className="p-4">
				<h1 className="text-xl font-bold mb-4">Useful Links</h1>
				<ul className="list-disc list-inside">
					{/* Add your links here */}
					<li><a href="https://www.example.com" className="text-blue-600 hover:text-blue-800">News Link 1</a></li>
					<li><a href="https://www.anotherexample.com" className="text-blue-600 hover:text-blue-800">News Link 2</a></li>
					{/* ... more links */}
				</ul>
			</div>
		</Layout>
	);
};

export default News;