import React, { useEffect, useRef, useState } from 'react';
import { Invitation } from '@/api/InvitationApi';
import { getInvitationList } from '@/api/InvitationApi';
import SearchForm from './SearchForm';
import InvitationList from './InvitationList';
import { DashboardsInf } from '@/api/dashboardsApi';

interface InvitationDashboardProps {
  setData: (data: DashboardsInf) => void;
}

export default function InvitationDashboard({
  setData,
}: InvitationDashboardProps) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null);
  const cursorIdRef = useRef<number | null>(null);
  const isCloseFncRef = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(items => {
      if (isCloseFncRef.current || loading) {
        // 추가된 조건: 로딩 중이거나 이미 함수를 종료한 경우에는 실행하지 않음
        return;
      }
      items.forEach(item => {
        if (item.isIntersecting) {
          setLoading(true); // Intersection Observer 콜백 실행 전에 로딩 상태 변경
          const handleInvitationList = async () => {
            const { invitations, cursorId } = await getInvitationList(
              8,
              cursorIdRef.current,
              inputValue,
            );
            cursorIdRef.current = cursorId;
            if (cursorIdRef.current === null) {
              isCloseFncRef.current = true;
            }
            setInvitations(prevInvitations => [
              ...prevInvitations,
              ...invitations,
            ]);
            setLoading(false);
          };
          handleInvitationList();
        }
      });
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [inputValue, invitations, loading]);

  const handleSearchSubmit = async (value: string) => {
    setInputValue(value);
    setLoading(true);
    const { invitations, cursorId } = await getInvitationList(8, null, value);
    setInvitations(invitations);
    cursorIdRef.current = cursorId;
    setLoading(false);
  };

  return (
    <div>
      <h2>초대받은 대시보드</h2>
      <SearchForm onSubmit={handleSearchSubmit} />
      <InvitationList
        invitations={invitations}
        setInvitations={setInvitations}
        setData={setData}
      />
      <div ref={sentinelRef}></div> {/* Intersection Observer 타겟 */}
      {loading && <p>불러오는 중이에요!!!</p>}
    </div>
  );
}
