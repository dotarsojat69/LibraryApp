import { useEffect } from "react";

function Title() {
  const changeTitle = (newTitle: string) => {
    document.title = newTitle;
  };

  useEffect(() => {
    return () => {
      document.title = "LibraryApp";
    };
  });

  return changeTitle;
}

export default Title;