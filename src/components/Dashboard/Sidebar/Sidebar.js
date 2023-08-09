import React from 'react'
import './index.css';
import {Link, useLocation} from "react-router-dom"

const Sidebar = () => {
    const currentpath = useLocation().pathname;

    return (
        <div className="sidebarComponent">

                <div className="logoContainer">
                <img src="/softel-communications-logo-small.png" alt="MyImage" className="logo"  />
                </div>

                <div className="navigationContainer">
                    <div className="navigationSegment">
                        <Link className={`navigationButton ${currentpath==="/dashboard" ? "open":""}`} to="/dashboard"> <div className="navigationButtonLogoContainer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <mask
                                id="mask0_148_224"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                                >
                                <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_148_224)">
                                <path
                                    d="M12 12.75C11.0872 12.75 10.3173 12.4366 9.69037 11.8097C9.06346 11.1828 8.75 10.4129 8.75 9.50007C8.75 8.58726 9.06346 7.81739 9.69037 7.19048C10.3173 6.56356 11.0872 6.2501 12 6.2501C12.9128 6.2501 13.6827 6.56356 14.3096 7.19048C14.9365 7.81739 15.25 8.58726 15.25 9.50007C15.25 10.4129 14.9365 11.1828 14.3096 11.8097C13.6827 12.4366 12.9128 12.75 12 12.75ZM12 11.2501C12.4974 11.2501 12.9134 11.0828 13.2481 10.7482C13.5827 10.4135 13.75 9.99751 13.75 9.50007C13.75 9.00264 13.5827 8.58661 13.2481 8.25197C12.9134 7.91736 12.4974 7.75005 12 7.75005C11.5025 7.75005 11.0865 7.91736 10.7519 8.25197C10.4173 8.58661 10.2499 9.00264 10.2499 9.50007C10.2499 9.99751 10.4173 10.4135 10.7519 10.7482C11.0865 11.0828 11.5025 11.2501 12 11.2501ZM12 21.4808C9.83716 20.8911 8.04646 19.618 6.62787 17.6616C5.20929 15.7052 4.5 13.518 4.5 11.1001V5.34625L12 2.53857L19.5 5.34625V11.1001C19.5 13.518 18.7907 15.7052 17.3721 17.6616C15.9535 19.618 14.1628 20.8911 12 21.4808ZM12 4.1347L5.99997 6.37507V11.1001C5.99997 12.0514 6.13619 12.9712 6.40863 13.8597C6.68108 14.7482 7.05961 15.577 7.54422 16.3462C8.21857 16.0026 8.92466 15.7341 9.66248 15.5405C10.4003 15.3469 11.1795 15.2501 12 15.2501C12.8205 15.2501 13.5997 15.3469 14.3375 15.5405C15.0753 15.7341 15.7814 16.0026 16.4557 16.3462C16.9403 15.577 17.3189 14.7482 17.5913 13.8597C17.8638 12.9712 18 12.0514 18 11.1001V6.37507L12 4.1347ZM12 16.75C11.3551 16.75 10.7349 16.8199 10.1394 16.9597C9.54388 17.0994 8.98137 17.2956 8.45187 17.5481C8.94804 18.0994 9.49388 18.576 10.0894 18.9779C10.6849 19.3799 11.3218 19.6873 12 19.9001C12.6782 19.6873 13.3134 19.3799 13.9058 18.9779C14.4981 18.576 15.0423 18.0994 15.5385 17.5481C15.009 17.2956 14.4481 17.0994 13.8558 16.9597C13.2634 16.8199 12.6449 16.75 12 16.75Z"
                                    fill="#404B5A"
                                />
                                </g>
                            </svg>
                            </div> Admins </Link>
                        <Link className={`navigationButton ${currentpath==="/dashboard/activity" ? "open":""}`} to="/dashboard/activity"> <div className="navigationButtonLogoContainer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <mask
                                    id="mask0_148_219"
                                    style={{ maskType: "alpha" }}
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                    >
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_148_219)">
                                    <path
                                        d="M2.50014 9.48093V5.53863C2.50014 5.03352 2.67514 4.60596 3.02514 4.25596C3.37514 3.90596 3.80271 3.73096 4.30784 3.73096H19.6924C20.1975 3.73096 20.6251 3.90596 20.9751 4.25596C21.3251 4.60596 21.5001 5.03352 21.5001 5.53863V9.48093H20.0001V5.53863C20.0001 5.4617 19.9681 5.39118 19.904 5.32708C19.8398 5.26297 19.7693 5.23091 19.6924 5.23091H4.30784C4.23091 5.23091 4.16038 5.26297 4.09627 5.32708C4.03217 5.39118 4.00012 5.4617 4.00012 5.53863V9.48093H2.50014ZM4.30784 17.7309C3.80271 17.7309 3.37514 17.5559 3.02514 17.2059C2.67514 16.8559 2.50014 16.4283 2.50014 15.9232V10.9809H4.00012V15.9232C4.00012 16.0001 4.03217 16.0707 4.09627 16.1348C4.16038 16.1989 4.23091 16.2309 4.30784 16.2309H19.6924C19.7693 16.2309 19.8398 16.1989 19.904 16.1348C19.9681 16.0707 20.0001 16.0001 20.0001 15.9232V10.9809H21.5001V15.9232C21.5001 16.4283 21.3251 16.8559 20.9751 17.2059C20.6251 17.5559 20.1975 17.7309 19.6924 17.7309H4.30784ZM1.38477 20.2309V18.7309H22.6155V20.2309H1.38477ZM2.50014 10.9809V9.48093H8.00012C8.13857 9.48093 8.27029 9.51812 8.39529 9.59248C8.52029 9.66683 8.61484 9.76811 8.67894 9.89631L10.0751 12.6733L13.3521 6.86553C13.4162 6.7476 13.5056 6.65722 13.6203 6.59441C13.7351 6.53157 13.8617 6.50016 14.0001 6.50016C14.1386 6.50016 14.2703 6.53157 14.3953 6.59441C14.5203 6.65722 14.6148 6.75786 14.6789 6.89631L15.9713 9.48093H21.5001V10.9809H15.5963C15.4322 10.9809 15.2748 10.9383 15.1242 10.853C14.9735 10.7678 14.8597 10.6431 14.7828 10.479L13.9501 8.80781L10.6636 14.5963C10.5995 14.7245 10.5049 14.8207 10.3799 14.8848C10.2549 14.9489 10.1232 14.9809 9.98474 14.9809C9.84627 14.9809 9.71711 14.9437 9.59724 14.8694C9.47738 14.795 9.38539 14.6937 9.32129 14.5655L7.52897 10.9809H2.50014Z"
                                        fill="#404B5A"
                                    />
                                    </g>
                                </svg>
                            </div> Activity  </Link>
                    </div>
                    <hr></hr>
                    <div className="navigationSegment">
                        <Link className={`navigationButton ${currentpath==="/dashboard/location" ? "open":""}`} to="/dashboard/location"> <div className="navigationButtonLogoContainer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <mask
                                id="mask0_148_241"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                                >
                                <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_148_241)">
                                <path
                                    d="M12.0017 11.8654C12.4992 11.8654 12.9246 11.6882 13.2778 11.3339C13.631 10.9795 13.8076 10.5536 13.8076 10.056C13.8076 9.55839 13.6305 9.133 13.2761 8.7798C12.9218 8.4266 12.4958 8.25 11.9983 8.25C11.5007 8.25 11.0753 8.42717 10.7221 8.7815C10.3689 9.13583 10.1923 9.56179 10.1923 10.0594C10.1923 10.557 10.3694 10.9824 10.7238 11.3356C11.0781 11.6888 11.5041 11.8654 12.0017 11.8654ZM12 19.5135C13.9564 17.7622 15.4535 16.0824 16.4913 14.474C17.5291 12.8657 18.048 11.457 18.048 10.2481C18.048 8.42498 17.4689 6.92627 16.3105 5.7519C15.1522 4.57753 13.7153 3.99035 12 3.99035C10.2846 3.99035 8.84771 4.57753 7.68938 5.7519C6.53105 6.92627 5.95188 8.42498 5.95188 10.2481C5.95188 11.457 6.47079 12.8657 7.5086 14.474C8.54644 16.0824 10.0436 17.7622 12 19.5135ZM12 21.5096C9.4833 19.3288 7.59613 17.2993 6.33843 15.4211C5.08075 13.5429 4.4519 11.8186 4.4519 10.2481C4.4519 7.94038 5.19838 6.07213 6.69133 4.64328C8.18426 3.21443 9.9538 2.5 12 2.5C14.0461 2.5 15.8156 3.21443 17.3086 4.64328C18.8015 6.07213 19.548 7.94038 19.548 10.2481C19.548 11.8186 18.9192 13.5429 17.6615 15.4211C16.4038 17.2993 14.5166 19.3288 12 21.5096Z"
                                    fill="#404B5A"
                                />
                                </g>
                            </svg>
                            </div> Locations </Link>
                            <Link className={`navigationButton ${currentpath==="/dashboard/deviceinventory" ? "open":""}`} to="/dashboard/deviceinventory"> <div className="navigationButtonLogoContainer">
                            
                            </div> Devices Inventory </Link>
                            <Link className={`navigationButton ${currentpath==="/dashboard/discovereddevice" ? "open":""}`} to="/dashboard/discovereddevice"> <div className="navigationButtonLogoContainer">
                        
                            </div> Discovered Devices </Link>
                    </div>

                </div>
       
        </div>
    )
}

export default Sidebar