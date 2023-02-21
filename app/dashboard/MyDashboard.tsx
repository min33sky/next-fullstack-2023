'use client';

import { useQuery } from '@tanstack/react-query';
import { User } from '../types/user';
import { getMyStatus } from './api/user';
import EditPost from './EditPost';

interface Props {
  myStatus: User;
}

export default function MyDashboard({ myStatus }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['getMyStatus', myStatus.id],
    queryFn: () => getMyStatus(myStatus.id),
    initialData: myStatus,
    onSuccess(data) {
      console.log('데이터 가져오기 성공: ', data);
    },
    onError(error) {
      console.log('데이터 가져오기 실패: ', error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.posts.map((post) => (
        <EditPost key={post.id} {...post} />
      ))}
    </div>
  );
}
