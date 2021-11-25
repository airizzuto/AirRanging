
interface Endpoint {
  baseUrl: string;
  slug?: string;
  filters?: string;
  pagination?: string;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export const buildStringEndpoint = ({
  baseUrl, slug, filters, pagination
}: Endpoint): string => {
  let url = baseUrl;

  if (slug) url = url.concat(slug);
  if (filters) url = url.concat(filters);
  if (pagination) url = url.concat(pagination);

  return url;
};

export const buildStringAircraftTitle = (aircraftParams: Array<string | undefined>) => {
  return aircraftParams
    .join(" - ")
    .replace(/(\s-\s)+$/, '');
};
