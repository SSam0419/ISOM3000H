export type UserProfile = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  reputation: Reputation[];
};

export type Reputation = {
  comment: string;
  rating: number;
  commentedBy: string;
  projectId: string;
};
