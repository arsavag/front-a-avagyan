import { useEffect, useState, useMemo } from "react";
import styles from "./Home.module.scss";
import PostCard from "../../components/PostCard"
import Modal from "../../components/Modal"

const Home = ({ search = "" }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://cloud.codesupply.co/endpoint/react/data.json")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </div>

      {selectedPost && (
        <Modal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </main>
  );
};

export default Home;