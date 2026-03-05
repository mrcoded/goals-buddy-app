export interface MatchProps {
  id: string;
  buddy: {
    id: string;
    name: string;
    imageUrl: string | null;
  };
  community: {
    id: string;
    name: string;
    description: string;
  } | null;
  userGoals:
    | {
        title: string;
      }[]
    | null;
  filteredBuddyGoals: { id: string; title: string }[] | null;
}

export interface UserCommunityProps {
  id: string;
  userId: string;
  communityId: string;
  joinedAt: string;
  community: {
    id: string;
    name: string;
    description: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
