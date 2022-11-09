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