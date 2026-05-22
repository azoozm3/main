export function openProfileModal() {
  window.dispatchEvent(new CustomEvent("open-profile-modal"));
}
