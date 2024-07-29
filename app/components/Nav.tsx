"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import 'bootstrap/dist/css/bootstrap.css'
import styles from "../styles/layout.module.css";

export const Nav = () => {
    const pathname = usePathname();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active nav-link">
                        <Link
                            className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
                            href="/"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item nav-link">
                        <Link
                            className={`${styles.link} ${
                                pathname === "/quotes" ? styles.active : ""
                            }`}
                            href="/quotes"
                        >
                            Quotes
                        </Link>
                    </li>
                    <li className="nav-item nav-link">
                        <Link
                            className={`${styles.link} ${
                                pathname === "/movies" ? styles.active : ""
                            }`}
                            href="/movies"
                        >
                            Movies
                        </Link>
                    </li>

                </ul>
            </div>

        </nav>
    );
};


// export const Nav = () => {
//   const pathname = usePathname();
//
//   return (
//     <nav className={styles.nav}>
//       <Link
//         className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
//         href="/"
//       >
//         Home
//       </Link>
//       <Link
//         className={`${styles.link} ${
//           pathname === "/verify" ? styles.active : ""
//         }`}
//         href="/verify"
//       >
//         Verify
//       </Link>
//       <Link
//         className={`${styles.link} ${
//           pathname === "/quotes" ? styles.active : ""
//         }`}
//         href="/quotes"
//       >
//         Quotes
//       </Link>
//     </nav>
//   );
// };

