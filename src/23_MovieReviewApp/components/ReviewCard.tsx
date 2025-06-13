import { Review } from "../hooks/useMovieReviews";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-500" : "text-gray-600"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-white font-display">
            {review.author}
          </h4>
          <div className="flex items-center mt-1">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm text-gray-400">
              ({review.rating}/5)
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-400">{review.date}</span>
      </div>
      <p className="text-gray-300 leading-relaxed">{review.comment}</p>
    </div>
  );
}
