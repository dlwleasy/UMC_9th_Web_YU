export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  // 필요하다면 추가 필드도 정의 가능
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieCredit = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: 0
}

export type MovieCreditResponse = {
  id: number,
  cast: MovieCredit[]
}

