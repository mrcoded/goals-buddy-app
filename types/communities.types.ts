export interface UserCommunitiesProps {
  community: {
    id: string;
    name: string;
  };
}

export interface JoinedCommunityCardProps {
  showLockIcon: boolean;
  userCommunities: UserCommunitiesProps[];
  selectedCommunity: string;
  setSelectedCommunity: (communityId: string) => void;
}
