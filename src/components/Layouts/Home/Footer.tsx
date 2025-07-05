const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 py-5">
      <div className="container mx-auto px-5 text-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} TokoKu. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;