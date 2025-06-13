import { Movie } from "../hooks/useMovieReviews";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  getAverageRating: (movieId: number) => number;
  getReviewCount: (movieId: number) => number;
};

export default function MovieList({
  movies,
  onSelectMovie,
  getAverageRating,
  getReviewCount,
}: MovieListProps) {
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {" "}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-display">
            Movie Review App
          </h1>
          <p className="text-gray-400 font-display">
            Discover and review your favorite movies
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              averageRating={getAverageRating(movie.id)}
              reviewCount={getReviewCount(movie.id)}
              onSelect={onSelectMovie}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
