// @flow
export type Issue = {
  body: string,
  comments: number,
  created_at: string,
  id: number,
  number: number,
  title: string,
  user: { login: string }
};

export type Issues = Issue[];
