import { Link } from 'react-router-dom';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { getImgUrl } from '../../utils/getImgUrl';

const UseBookDetails = ({ productId }) => {
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(productId);

  if (isLoading) return <div>Loading book details...</div>;
  if (isError) return <div>Error fetching book details.</div>;
  
  if (!book) {
    return <div>Book not found</div>;
  }
  
  return (
    
    <Link to={`/books/${book._id}`}>
    <h4 className="font-semibold text-gray-700">{book.title}</h4>
      <img
        src={getImgUrl(book.coverImage)}
        alt={book.title}
        className=" max-w-xs rounded-lg shadow-lg self-center"
      />
      
    </Link>
  );
};

export default UseBookDetails;
