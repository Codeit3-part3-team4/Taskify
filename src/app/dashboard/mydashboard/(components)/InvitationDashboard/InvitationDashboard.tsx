'use client';

import React, { useRef, useState } from 'react';
import { Invitation } from '@/api/InvitationApi';
import { getInvitationList } from '@/api/InvitationApi';
import SearchForm from './SearchForm';
import InvitationList from './InvitationList';
import useIntersectionObserver from '@/components/hooks/useObserver/useIntersectionObserver';
import Image from 'next/image';

export default function InvitationDashboard() {
  const [processedInvitations, setProcessedInvitations] = useState<Invitation[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const cursorIdRef = useRef<number | null>(null);
  const hasNotNext = processedInvitations.length !== 0 && !cursorIdRef.current;

  const handleIntersection = async () => {
    try {
      if (hasNotNext && !loading) {
        console.log('리턴');
        return;
      }
      const { invitations, cursorId } = await getInvitationList(8, cursorIdRef.current, inputValue);
      cursorIdRef.current = cursorId;
      if (!cursorId) {
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
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white/50 my-5 p-5">
      <h2 className="text-xl mb-5">초대받은 대시보드</h2>
      <div className="mb-5 border border-gray-D9D9D9 rounded-md overflow-hidden">
        <SearchForm onSubmit={handleSearchSubmit} />
      </div>
      {processedInvitations.length > 0 || loading ? (
        <InvitationList processedInvitations={processedInvitations} setProcessedInvitations={setProcessedInvitations} />
      ) : (
        <div className="flex justify-center">
          <Image src="/images/no-invitation.svg" height="100" width="100" alt="초대가 없습니다" />
        </div>
      )}
      <div ref={sentinelRef}></div>
      {/* Intersection Observer 타겟 */}
      {loading && (
        <div className="flex justify-center h-44 items-center">
          <svg className="animate-spin h-10 w-10 border-4 rounded-full border-t-indigo-500" viewBox="0 0 24 24"></svg>
        </div>
      )}
    </div>
  );
}
