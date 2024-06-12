import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CommentsContext = createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([
    {
        id: 1,
        author: 'User 1',
        text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
        date: 'Wed Jun 1 2024 09:03:03 GMT+0300',
},
{
    id: 2,
    author: 'User 2',
    text: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English.',
    date: 'Wed May 15 2024 09:03:03 GMT+0300',
},
{
    id: 3,
    author: 'User 3',
    text: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy.',
    date: 'Wed Feb 28 2024 09:03:03 GMT+0300',
}
]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();

//   useEffect(() => {
//     fetchComments(page);
//   }, [page]);

//   const fetchComments = async (page) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/comments?page=${page}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setComments((prevComments) => [...prevComments, ...data]);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleAddComment = async () => {
    // try {
    //   const response = await fetch('/api/comments', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       author: 'Current User',
    //       text: newComment,
    //     }),
    //   });
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   setComments([data, ...comments]);
    //   setNewComment('');
    // } catch (error) {
    //   console.error('Error posting comment:', error);
    // }
  };

  const lastCommentElementRef = (node) => {
    // if (loading) return;
    // if (observer.current) observer.current.disconnect();
    // observer.current = new IntersectionObserver((entries) => {
    //   if (entries[0].isIntersecting) {
    //     setPage((prevPage) => prevPage + 1);
    //   }
    // });
    // if (node) observer.current.observe(node);
  };

  return (
    <CommentsContext.Provider value={{
      comments,
      newComment,
      setNewComment,
      loading,
      handleAddComment,
      lastCommentElementRef,
    }}>
      {children}
    </CommentsContext.Provider>
  );
};
