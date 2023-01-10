import {
	DirectoryItemContainer,
	BackgroundImage,
	DirectoryItemBody,
} from './directory-item.style.jsx';

function DirectoryItem({ category }) {
	const { title, imageUrl } = category;

	return (
		<DirectoryItemContainer>
			<BackgroundImage imageUrl={imageUrl} />
			<DirectoryItemBody>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</DirectoryItemBody>
		</DirectoryItemContainer>
	);
}

export default DirectoryItem;
