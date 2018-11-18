// @flow
export type Issue = {
  body: string,
  comments: number,
  created_at: string,
  id: number,
  number: number,
  title: string,
  user: { login: string },
  comments_url: string
};

export type SideBarIssue = {
  assignees?: {},
  labels?: Object[],
  milestone?: any,
  projects?: any
};

export type Issues = Issue[];

export type Comment = {
  id: number,
  url: string,
  created_at: string,
  body: string,
  user: { login: string },
  user: { avatar_url: string }
};

export type Comments = Comment[];