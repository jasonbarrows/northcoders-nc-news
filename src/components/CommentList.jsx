import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

const CommentList = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getAllCommentsByArticleId(articleId).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    }).catch((err) => {
      setIsError(true);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="m-4 sm:m-0 ">
      <h3 className="text-xl sm:text-2xl font-semibold">Comments</h3>
      <ul className="mt-2 sm:mt-4 flex flex-col space-y-2">
        {
          isLoading
          ? <li className="py-2 sm:py-4 border-t"><span>Loading...</span></li>
          : isError
            ? <li className="py-2 sm:py-4 border-t text-rose-700"><span>There was an error loading the comments.</span></li>
            : comments
              ? comments.map((comment) => (
                <li className="border-t" key={comment.comment_id}>
                  <CommentCard comment={comment} />
                </li>
              ))
              : <li className="py-2 sm:py-4 border-t">
                  <p>Be the first to add a comment.</p>
                </li>
          }
      </ul>
    </div>
  );
};

export default CommentList;