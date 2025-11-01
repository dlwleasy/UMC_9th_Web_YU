export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
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

export type MovieVideo = {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: boolean,
  published_at: string,
  id: string
}

export type MovieVideoResponse = {
  id : number
  results : MovieVideo[]
}

// 영화 장르에 대한 타입
export interface Genre {
  id: number;
  name: string;
}

// 제작사에 대한 타입
export interface ProductionCompany {
  id: number;
  logo_path: string | null; // 로고가 없는 경우가 있으므로 null 허용
  name: string;
  origin_country: string;
}

// 제작 국가에 대한 타입
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// 사용 언어에 대한 타입
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// 영화 시리즈/컬렉션 정보에 대한 타입 (데이터에 null로 되어있어 기본 구조로 가정)
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

// 메인 영화 상세 정보 타입
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null; // 컬렉션이 없을 수 있으므로 null 허용
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string; // 날짜는 string으로 받는 것이 일반적
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}