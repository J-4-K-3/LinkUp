import { createContext, useContext, useState, useEffect } from "react";
import { mockPosts } from "./main_pages/Mockdata";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({ posts: [] });
  const [photo, setPhoto] = useState(localStorage.getItem("photo") || null); // Load photo from localStorage
  const [name, setName] = useState(localStorage.getItem("name") || ""); // Load name from localStorage
  const [surname, setSurname] = useState(localStorage.getItem("surname") || "");
  const [socialLink, setSocialLink] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

    setState({ posts: savedPosts });

    const showPostsProgressively = () => {
      mockPosts.forEach((post, index) => {
        setTimeout(() => {
          setState((prevState) => {
            if (!prevState.posts.some((p) => p.id === post.id)) {
              const newPosts = [...prevState.posts, post];
              localStorage.setItem("posts", JSON.stringify(newPosts));
              return { posts: newPosts };
            }
            return prevState;
          });
        }, 300000 * (index + 1));
      });
    };

    showPostsProgressively();
  }, []);

  useEffect(() => {
    if (photo) localStorage.setItem("photo", photo);
  }, [photo]);

  useEffect(() => {
    if (name) localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    if (surname) localStorage.setItem("surname", surname);
  }, [surname]);

  const addNewPost = (newPost) => {
    const updatedPosts = [newPost, ...state.posts];
    setState({ posts: updatedPosts });
    localStorage.setItem(
      "posts",
      JSON.stringify(
        updatedPosts.filter((p) => !mockPosts.find((m) => m.id === p.id))
      )
    );
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        photo,
        setPhoto,
        name,
        setName,
        surname,
        setSurname,
        socialLink,
        setSocialLink,
        addNewPost,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
