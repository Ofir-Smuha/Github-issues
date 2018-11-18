import parse from 'parse-link-header';

export const extractLinkFromHeaders = header => {
  return parse(header.link);
};
