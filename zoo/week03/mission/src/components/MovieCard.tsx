import type { Movie } from "../types/movie";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "";

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={poster}
        alt={`${movie.title} 영화 이미지`}
        className="w-full h-auto object-cover"
        loading="lazy"
      />

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center text-white p-4">
          <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
          {movie.overview && (
            <p className="text-sm text-gray-200 leading-relaxed mt-2 line-clamp-3">
              {movie.overview}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
