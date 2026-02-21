import styles from "./PostCard.module.scss";

const PostCard = ({ post, onClick }) => {
  console.log(post);
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={post.img}
        srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
        alt={post.title}
      />

      <div className={styles.content}>
        <div className={styles.meta}>
          {post.tags}
        </div>

        <h3>{post.title}</h3>
        <div className={styles.byline}>
          <span className={styles.author}>{post.autor}</span>
          <span className={styles.bylineMeta}>
            {post.date}
          </span>
          <span className={styles.views}>{`${post.views} views`}</span>
        </div>
        <p className={styles.description}>{post.text}</p>
      </div>
    </div>
  );
};

export default PostCard;