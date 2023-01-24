export interface IMovieProvider {
  buy: Array<{
    logo_path: string | null;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }>;
  flatrate: Array<{
    logo_path: string | null;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }>;
  link: string;
  rent: Array<{
    logo_path: string | null;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }>;
}
