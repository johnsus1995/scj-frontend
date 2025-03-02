export default function MenuItem({ icon, title, action, isActive = null }) {
  const Icon = icon;

  return (
    <button
      className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
      onClick={action}
      title={title}
    >
      <Icon className="" />
    </button>
  );
}
