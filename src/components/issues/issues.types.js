// @flow
export type Issue = {
  body: string,
  comments: number,
  created_at: string,
  id: number,
  number: number,
  title: string,
  user: { login: string },
  comments_url: string,
  labels: []
};

export type SideBarIssue = {
  assignee?: {},
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

export type IssueLabel = {
  id: number,
  name: string,
  color: string,
  default: boolean
};

export type OptionLabel = {
  name: string,
  description: string,
  color: string,
  id?: number,
  default?: boolean
};

export type AssigneeType = {
  avatar_url: string,
  id: number,
  login: string,
  permissions: Object
};
