const Footer = () => {
    return (
      <footer className="w-full min-h-[20vh] bg-white dark:bg-black">
        <div className="flex items-center container p-6 h-full">
          <p>{new Date().getFullYear()} LibraryApp. New Copyright.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;