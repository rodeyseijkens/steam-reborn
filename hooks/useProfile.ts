import { useQuery, UseQueryOptions } from 'react-query';

import profile from '../mock/profile.json';
import { ProfileProps } from '../types/Profile';

const getProfileData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return profile as ProfileProps;
};

function useProfile(options?: UseQueryOptions) {
  return useQuery<ProfileProps>(['profile'], () => getProfileData(), {
    enabled: options?.enabled,
  });
}

export default useProfile;
