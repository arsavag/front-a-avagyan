import { useEffect, useState } from "react";
import styles from "./MobileMenu.module.scss";
import { MENU_ITEMS } from "../../constants/menuItems";

export const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedLabel, setExpandedLabel] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleAccordion = (label) => {
    setExpandedLabel((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <header className={styles.menuHeader}>
          <img className={styles.logo} src={`${import.meta.env.BASE_URL}Logo.png`} alt="Logo" />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <img src={`${import.meta.env.BASE_URL}icons/x-icon.svg`} alt="Close menu" />
          </button>
        </header>

        <div className={styles.listWrapper}>
          <ul className={styles.list}>
            {MENU_ITEMS.map((item) => {
              const hasSubmenu = item.submenu?.length > 0;
              const isExpanded = expandedLabel === item.label;

              return (
              <li key={item.label} className={styles.listItem}>
                <button
                  type="button"
                  className={styles.menuItemTrigger}
                  onClick={() => hasSubmenu && toggleAccordion(item.label)}
                >
                  <span>{item.label}</span>
                  {hasSubmenu && (
                    <img
                      src={`${import.meta.env.BASE_URL}icons/chevron-down.svg`}
                      alt=""
                      className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`}
                    />
                  )}
                </button>
                {hasSubmenu && (
                  <ul
                    className={`${styles.submenu} ${isExpanded ? styles.submenuOpen : ""}`}
                  >
                    {item.submenu.map((subItem) => (
                      <li key={subItem} className={styles.submenuItem}>
                        {subItem}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};