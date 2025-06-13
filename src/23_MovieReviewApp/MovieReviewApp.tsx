import useMovieReviews from "./hooks/useMovieReviews";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Header from "./components/Header";

export default function MovieReviewApp() {
  const {
    movies,
    selectedMovie,
    setSelectedMovie,
    getReviewsForMovie,
    addReview,
    getAverageRating,
  } = useMovieReviews();

  const getReviewCount = (movieId: number) => {
    return getReviewsForMovie(movieId).length;
  };

  const handleSelectMovie = (movie: any) => {
    setSelectedMovie(movie);
  };

  const handleAddReview = (author: string, rating: number, comment: string) => {
    if (selectedMovie) {
      addReview(selectedMovie.id, author, rating, comment);
    }
  };

  const handleBackToList = () => {
    setSelectedMovie(null);
  };
  if (selectedMovie) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <MovieDetail
          movie={selectedMovie}
          reviews={getReviewsForMovie(selectedMovie.id)}
          averageRating={getAverageRating(selectedMovie.id)}
          onAddReview={handleAddReview}
          onBack={handleBackToList}
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MovieList
        movies={movies}
        onSelectMovie={handleSelectMovie}
        getAverageRating={getAverageRating}
        getReviewCount={getReviewCount}
      />
    </div>
  );
}
