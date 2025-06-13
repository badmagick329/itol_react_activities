import { Movie } from "../hooks/useMovieReviews";

type MovieCardProps = {
  movie: Movie;
  averageRating: number;
  reviewCount: number;
  onSelect: (movie: Movie) => void;
};

export default function MovieCard({
  movie,
  averageRating,
  reviewCount,
  onSelect,
}: MovieCardProps) {
  return (
    <div
      className="bg-gray-800 p-4 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={() => onSelect(movie)}
    >
      <div className="text-4xl mb-3 text-center">{movie.poster}</div>
      <h3 className="text-lg font-semibold text-white mb-2 font-display">
        {movie.title}
      </h3>
      <div className="text-sm text-gray-400 mb-2">
        <span>{movie.year}</span> • <span>{movie.genre}</span>
      </div>
      <div className="text-sm text-gray-400 mb-3">
        Directed by {movie.director}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-white font-medium">
            {averageRating > 0 ? averageRating : "No ratings"}
          </span>
        </div>
        <span className="text-gray-400 text-sm">
          {reviewCount} review{reviewCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
