import { Movie, Review } from "../hooks/useMovieReviews";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

type MovieDetailProps = {
  movie: Movie;
  reviews: Review[];
  averageRating: number;
  onAddReview: (author: string, rating: number, comment: string) => void;
  onBack: () => void;
};

export default function MovieDetail({
  movie,
  reviews,
  averageRating,
  onAddReview,
  onBack,
}: MovieDetailProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddReview = (author: string, rating: number, comment: string) => {
    onAddReview(author, rating, comment);
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          ← Back to Movies
        </button>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
          <div className="flex items-start gap-6">
            <div className="text-6xl">{movie.poster}</div>
            <div className="flex-1">
              {" "}
              <h1 className="text-3xl font-bold text-white mb-2 font-display">
                {movie.title}
              </h1>
              <div className="text-gray-400 mb-3">
                <span>{movie.year}</span> • <span>{movie.genre}</span> •
                <span> Directed by {movie.director}</span>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {movie.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1 text-xl">★</span>
                  <span className="text-white font-medium text-lg">
                    {averageRating > 0 ? averageRating : "No ratings yet"}
                  </span>
                </div>
                <span className="text-gray-400">
                  {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-display">
            Reviews
          </h2>
          {!showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Write Review
            </button>
          )}
        </div>
        {showReviewForm && (
          <ReviewForm
            onSubmit={handleAddReview}
            onCancel={() => setShowReviewForm(false)}
          />
        )}
        <div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
              <p className="text-gray-400">
                No reviews yet. Be the first to review this movie!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
