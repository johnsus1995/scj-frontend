import ScjLogo from "@/assets/images/scjLogoBrown.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="AuthLayout flex justify-center items-center gap-28 h-screen w-3/4">
        <img src={ScjLogo} alt="scj-logo" className="max-w-[400px]" />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
