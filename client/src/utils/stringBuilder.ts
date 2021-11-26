
interface Endpoint {
  baseUrl: string;
  slug?: string;
  filters?: string;
  paging?: string;
}

export const buildStringEndpoint = ({
  baseUrl, slug, filters, paging
}: Endpoint): string => {
  let url = baseUrl;

  if (slug) url = url.concat(slug);
  if (filters) url = url.concat(filters);
  if (paging) url = url.concat(paging);

  return url;
};

/**
 * Formats an array of string parameters to a single string
 * @param {Array<string>} aircraftParams Array of parameters to output in title
 * @param {string} separator Separator between parameters
 * @param {RegExp} trimmerRegex Regex to clean any undefined parameters separators
 * @returns {string} formatted title string
 */
export const buildStringAircraftTitle = (
  aircraftParams: Array<string | undefined>,
  separator: string,
  trimmerRegex: RegExp,
): string => {
  return aircraftParams
    .join(separator)
    .replace(trimmerRegex, '');
};
