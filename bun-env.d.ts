declare module "*.svg" {
  const path: `${string}.svg`;
  export = path;
}

declare module "*.jpg" {
  const path: string;
  export = path;
}

declare module "*.jpeg" {
  const path: string;
  export = path;
}

declare module "*.png" {
  const path: string;
  export = path;
}

declare module "*.gif" {
  const path: string;
  export = path;
}

declare module "*.webp" {
  const path: string;
  export = path;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export = classes;
}
