'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Invitation } from '@/api/InvitationApi';
import { getInvitationList } from '@/api/InvitationApi';
import SearchForm from './SearchForm';
import InvitationList from './InvitationList';

export default function InvitationDashboard() {
  const [processedInvitations, setProcessedInvitations] = useState<Invitation[]>([]);
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
            const { invitations, cursorId } = await getInvitationList(8, cursorIdRef.current, inputValue);
            cursorIdRef.current = cursorId;
            if (!cursorIdRef.current) {
              isCloseFncRef.current = true;
            }
            setProcessedInvitations(prevInvitations => [...prevInvitations, ...invitations]);
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
  }, [inputValue, processedInvitations, loading]);

  const handleSearchSubmit = async (value: string) => {
    try {
      setLoading(true);
      setInputValue(value);
      const { invitations, cursorId } = await getInvitationList(8, null, value);
      setProcessedInvitations(invitations);
      cursorIdRef.current = cursorId;
      if (!cursorIdRef.current) {
        isCloseFncRef.current = true;
      }
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl mb-5">초대받은 대시보드</h2>
      <div className="mb-5">
        <SearchForm onSubmit={handleSearchSubmit} />
      </div>
      <InvitationList processedInvitations={processedInvitations} setProcessedInvitations={setProcessedInvitations} />
      <div ref={sentinelRef}></div> {/* Intersection Observer 타겟 */}
      {loading && (
        <div className="flex justify-center h-44 items-center">
          <svg className="animate-spin h-10 w-10 border-4 rounded-full border-t-indigo-500" viewBox="0 0 24 24"></svg>
        </div>
      )}
    </div>
  );
}
