'use client';

import React, { useRef, useState } from 'react';
import { Invitation } from '@/api/InvitationApi';
import { getInvitationList } from '@/api/InvitationApi';
import SearchForm from './SearchForm';
import InvitationList from './InvitationList';
import useIntersectionObserver from '@/components/hooks/useObserver/useIntersectionObserver';

export default function InvitationDashboard() {
  const [processedInvitations, setProcessedInvitations] = useState<Invitation[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const cursorIdRef = useRef<number | null>(null);
  const isClosedRef = useRef<boolean>(false);
  const hasNotNext = processedInvitations.length !== 0 && !cursorIdRef.current;

  const handleIntersection = async () => {
    setLoading(true);
    try {
      if (hasNotNext || loading) {
        return;
      }
      const { invitations, cursorId } = await getInvitationList(8, cursorIdRef.current, inputValue);
      cursorIdRef.current = cursorId;
      if (!cursorId) {
        isClosedRef.current = true;
      }
      setProcessedInvitations(prevInvitations => [...prevInvitations, ...invitations]);
    } catch (error) {
      // 에러 처리
    } finally {
      setLoading(false);
    }
  };

  const { sentinelRef } = useIntersectionObserver(handleIntersection);

  const handleSearchSubmit = async (value: string) => {
    try {
      setLoading(true);
      setInputValue(value);
      const { invitations, cursorId } = await getInvitationList(8, null, value);
      setProcessedInvitations(invitations);
      cursorIdRef.current = cursorId;
      if (!cursorIdRef.current) {
        isClosedRef.current = true;
      }
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-slate-100/55 my-5">
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
