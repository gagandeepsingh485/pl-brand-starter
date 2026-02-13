import React from "react";
import HeroBannerWithMedia from "./component/ui/HeroBannerWithMedia";
import ProductGrid from "./component/ui/ProductGrid";
import HeroBannerImage from "./component/ui/HeroBannerImage";

type UIComponent = React.ComponentType<any>

interface Config {
  componentMap: {
    [key: string]: {
      component: UIComponent,
    }
  }
}

const config: Config = {
  componentMap: {
    "hero-banner-with-media": {
      component: HeroBannerWithMedia,
    },
    "product-grid": {
      component: ProductGrid,
    },
    "hero-banner-image": {
      component: HeroBannerImage,
    }
  }
}

export default config;