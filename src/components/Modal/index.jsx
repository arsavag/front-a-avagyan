import { useEffect } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ post, children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const content = post ? (
    <>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>
      <div className={styles.imageWrap}>
        <img
          src={post.img}
          srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
          alt={post.title}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>{post.tags}</div>
        <h2 className={styles.title}>{post.title}</h2>
        <div className={styles.byline}>
          <span className={styles.author}>{post.autor}</span>
          <span className={styles.bylineMeta}>{post.date}</span>
          <span className={styles.views}>{`${post.views} views`}</span>
        </div>
        <p className={styles.description}>{post.text}</p>
      </div>
    </>
  ) : (
    <>
      {children}
      <button className={styles.close} onClick={onClose}>
        Close
      </button>
    </>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};

export default Modal;
