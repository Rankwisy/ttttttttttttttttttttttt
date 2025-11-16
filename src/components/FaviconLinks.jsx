import { useEffect } from "react";

export default function FaviconLinks() {
  useEffect(() => {
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon'], link[rel='manifest']");
    existingLinks.forEach(link => link.remove());

    // Favicon SVG (modern browsers)
    const faviconSvg = document.createElement("link");
    faviconSvg.rel = "icon";
    faviconSvg.type = "image/svg+xml";
    faviconSvg.href = "https://ik.imagekit.io/by733ltn6/FAVICONS/favicon.svg";
    document.head.appendChild(faviconSvg);

    // Apple Touch Icon
    const appleTouchIcon = document.createElement("link");
    appleTouchIcon.rel = "apple-touch-icon";
    appleTouchIcon.sizes = "180x180";
    appleTouchIcon.href = "https://ik.imagekit.io/by733ltn6/FAVICONS/apple-touch-icon.png";
    document.head.appendChild(appleTouchIcon);

    // Favicon 96x96
    const favicon96 = document.createElement("link");
    favicon96.rel = "icon";
    favicon96.type = "image/png";
    favicon96.sizes = "96x96";
    favicon96.href = "https://ik.imagekit.io/by733ltn6/FAVICONS/favicon-96x96.png";
    document.head.appendChild(favicon96);

    // Android Chrome 192x192
    const androidChrome192 = document.createElement("link");
    androidChrome192.rel = "icon";
    androidChrome192.type = "image/png";
    androidChrome192.sizes = "192x192";
    androidChrome192.href = "https://ik.imagekit.io/by733ltn6/FAVICONS/web-app-manifest-192x192.png";
    document.head.appendChild(androidChrome192);

    // Android Chrome 512x512
    const androidChrome512 = document.createElement("link");
    androidChrome512.rel = "icon";
    androidChrome512.type = "image/png";
    androidChrome512.sizes = "512x512";
    androidChrome512.href = "https://ik.imagekit.io/by733ltn6/FAVICONS/web-app-manifest-512x512.png";
    document.head.appendChild(androidChrome512);

    // Theme color for mobile browsers (orange to match your brand)
    const themeColor = document.createElement("meta");
    themeColor.name = "theme-color";
    themeColor.content = "#f97316"; // Orange color matching your brand
    document.head.appendChild(themeColor);

    return () => {
      // Cleanup on unmount
      faviconSvg.remove();
      appleTouchIcon.remove();
      favicon96.remove();
      androidChrome192.remove();
      androidChrome512.remove();
      themeColor.remove();
    };
  }, []);

  return null;
}