"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Stack } from "@mantine/core";
import { AsyncMainContainer } from "@/components/containers/MainContainer";
import { agentInternal } from "@/lib/agent/agentInternal";
import { AdminUserDetails } from "@/lib/models/admin/users/AdminUserDetails";
import { AdminUserHeader } from "@/components/admin/users/detail/AdminUserHeader";
import { AdminUserTimeline } from "@/components/admin/users/detail/AdminUserTimeline";
import { AdminUserEditForm } from "@/components/admin/users/detail/AdminUserEditForm";
import { AdminUserActionPanel } from "@/components/admin/users/detail/AdminUserActionPanel";

export default function AdminUserDetailsPage() {
  const pathname = usePathname();
  // Henter ut siste segment i URL-en (f.eks. "01a07106-9d47-7f6e-834e-1bfdae55d58f")
  const id = pathname.split("/").pop();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AdminUserDetails | null>(null);

  const fetchUserDetails = useCallback(async () => {
    // Sjekker at ID faktisk er en gyldig verdi og ikke mappenavnet "users" eller "undefined"
    if (!id || id === "users" || id === "undefined") {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await agentInternal.get(`/api/admin/users/${id}`);
      if (res.ok) {
        const responseData = await res.json();
        setUser(responseData.body);
      }
    } catch (err) {
      console.error("Feil ved henting av brukerdetaljer:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <AsyncMainContainer size="md" py={30} loading={loading}>
      {user && (
        <Stack gap="xl">
          {/* 1. Hovedheader / Brukersummering */}
          <AdminUserHeader user={user} />

          {/* 2. Rediger personalia skjema */}
          <AdminUserEditForm user={user} onUserUpdated={fetchUserDetails} />

          {/* 3. Tidslinje for kontolivssyklus */}
          <AdminUserTimeline user={user} />

          {/* 4. Administrative Handlinger */}
          <AdminUserActionPanel user={user} onRefreshNeeded={fetchUserDetails} />
        </Stack>
      )}
    </AsyncMainContainer>
  );
}