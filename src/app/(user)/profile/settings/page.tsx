import ProfileSettingsForm from "@/components/forms/profile_settings_form";
import { getUserProfile } from "@/lib/data/profile";
import React from "react";

const SettingsPage = async () => {
  const userProfile = await getUserProfile();

  return <ProfileSettingsForm profile={userProfile} />;
};

export default SettingsPage;
