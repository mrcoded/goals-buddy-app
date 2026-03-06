export interface UserCommunitiesProps {
  community: {
    id: string;
    name: string;
  };
}

export interface JoinedCommunityCardProps {
  showLockIcon: boolean;
  isLoadingUserCommunities: boolean;
  userCommunities: UserCommunitiesProps[];
  selectedCommunity: string;
  setSelectedCommunity: (communityId: string) => void;
}

export interface CommunityInputFormProps {
  mutationFn: (formData: {
    name: string;
    description: string;
  }) => Promise<unknown>;
  isPending: boolean;
  isEditing?: boolean;
  initialData?: { name: string; description: string };
}
