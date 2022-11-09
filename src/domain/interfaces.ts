export interface BaseSearchResponse<T> {
    page:          number;
    total_pages:   number;
    total_results: number;
    results: T;
}


export interface MovieSearch {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export interface DefaultMoviesParams {
    language?: string;
    page?: number;
    region?: string;
    
}

export interface SearchMoviesParams extends DefaultMoviesParams{
    query: string;
    include_adult?: boolean;
    year?: number;
    primary_release_year?: number;
}
export interface MovieByID {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: null;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           null;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          string;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
  }
  
  export interface Genre {
    id:   number;
    name: string;
  }
  
  export interface ProductionCompany {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
  }
  
  export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
  }
  
  export interface SpokenLanguage {
    iso_639_1: string;
    name:      string;
  }
