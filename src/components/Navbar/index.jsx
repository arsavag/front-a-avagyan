import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { MENU_ITEMS } from "../../constants/menuItems";

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 200 && currentScroll > lastScroll) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav className={`${styles.navbar} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.container}>
        <ul className={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className={styles.menuItem}>
              {item.label}
              {item.submenu?.length > 0 && (
                <ul className={styles.submenu}>
                  {item.submenu.map((subItem) => (
                    <li key={subItem}>{subItem}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};