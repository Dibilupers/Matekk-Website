export function getProfileDisplayName(profile) {
  return profile?.display_name?.trim() || profile?.first_name?.trim() || profile?.username || "Student";
}
