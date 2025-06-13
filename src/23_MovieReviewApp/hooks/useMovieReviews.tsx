import { useState } from "react";

export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  poster: string;
  description: string;
};

export type Review = {
  id: number;
  movieId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

const dummyMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    director: "Christopher Nolan",
    poster: "🦇",
    description: "Batman faces the Joker in this epic superhero thriller.",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    director: "Christopher Nolan",
    poster: "🌀",
    description: "A thief enters dreams to plant an idea in someone's mind.",
  },
  {
    id: 3,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    director: "Quentin Tarantino",
    poster: "💼",
    description: "Interconnected stories of crime in Los Angeles.",
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    director: "The Wachowskis",
    poster: "💊",
    description: "A computer programmer discovers reality is a simulation.",
  },
  {
    id: 5,
    title: "Goodfellas",
    year: 1990,
    genre: "Crime",
    director: "Martin Scorsese",
    poster: "🔫",
    description: "The story of Henry Hill and his life in the mob.",
  },
];

const dummyReviews: Review[] = [
  {
    id: 1,
    movieId: 1,
    author: "John Doe",
    rating: 5,
    comment: "Absolutely phenomenal! Heath Ledger's Joker is unforgettable.",
    date: "2024-01-15",
  },
  {
    id: 2,
    movieId: 1,
    author: "Jane Smith",
    rating: 4,
    comment: "Great movie, but a bit long. Amazing action sequences.",
    date: "2024-01-20",
  },
  {
    id: 3,
    movieId: 2,
    author: "Mike Johnson",
    rating: 5,
    comment: "Mind-bending masterpiece. Nolan at his best!",
    date: "2024-02-01",
  },
  {
    id: 4,
    movieId: 3,
    author: "Sarah Wilson",
    rating: 4,
    comment: "Classic Tarantino. Great dialogue and storytelling.",
    date: "2024-02-10",
  },
  {
    id: 5,
    movieId: 4,
    author: "Tom Brown",
    rating: 5,
    comment: "Revolutionary film that changed cinema forever.",
    date: "2024-02-15",
  },
];

export default function useMovieReviews() {
  const [movies] = useState<Movie[]>(dummyMovies);
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const getReviewsForMovie = (movieId: number): Review[] => {
    return reviews.filter((review) => review.movieId === movieId);
  };

  const addReview = (
    movieId: number,
    author: string,
    rating: number,
    comment: string
  ) => {
    const newReview: Review = {
      id: Date.now(),
      movieId,
      author,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([...reviews, newReview]);
  };

  const getAverageRating = (movieId: number): number => {
    const movieReviews = getReviewsForMovie(movieId);
    if (movieReviews.length === 0) return 0;
    const sum = movieReviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / movieReviews.length) * 10) / 10;
  };

  return {
    movies,
    reviews,
    selectedMovie,
    setSelectedMovie,
    getReviewsForMovie,
    addReview,
    getAverageRating,
  };
}
