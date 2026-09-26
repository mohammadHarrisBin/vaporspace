import React, { useState } from 'react';

const TECH_ICONS = {
  react: 'react/react-original',
  'react native': 'react/react-original',
  tailwind: 'tailwindcss/tailwindcss-original',
  'tailwind css': 'tailwindcss/tailwindcss-original',
  'tailwindcss': 'tailwindcss/tailwindcss-original',
  vite: 'vitejs/vitejs-original',
  'vite.js': 'vitejs/vitejs-original',
  'node.js': 'nodejs/nodejs-original',
  nodejs: 'nodejs/nodejs-original',
  node: 'nodejs/nodejs-original',
  express: 'express/express-original',
  'express.js': 'express/express-original',
  postgresql: 'postgresql/postgresql-original',
  postgres: 'postgresql/postgresql-original',
  redis: 'redis/redis-original',
  docker: 'docker/docker-original',
  github: 'github/github-original',
  'github actions': 'githubactions/githubactions-original',
  vercel: 'vercel/vercel-original',
  typescript: 'typescript/typescript-original',
  'ts': 'typescript/typescript-original',
  javascript: 'javascript/javascript-original',
  js: 'javascript/javascript-original',
  python: 'python/python-original',
  django: 'django/django-original',
  flask: 'flask/flask-original',
  mongodb: 'mongodb/mongodb-original',
  mongo: 'mongodb/mongodb-original',
  mysql: 'mysql/mysql-original',
  sqlite: 'sqlite/sqlite-original',
  aws: 'amazonwebservices/amazonwebservices-original',
  'amazon web services': 'amazonwebservices/amazonwebservices-original',
  vue: 'vuejs/vuejs-original',
  'vue.js': 'vuejs/vuejs-original',
  vuejs: 'vuejs/vuejs-original',
  angular: 'angularjs/angularjs-original',
  svelte: 'svelte/svelte-original',
  next: 'nextjs/nextjs-original',
  'next.js': 'nextjs/nextjs-original',
  nextjs: 'nextjs/nextjs-original',
  graphql: 'graphql/graphql-original',
  nginx: 'nginx/nginx-original',
  kubernetes: 'kubernetes/kubernetes-original',
  k8s: 'kubernetes/kubernetes-original',
  terraform: 'terraform/terraform-original',
  firebase: 'firebase/firebase-original',
  supabase: 'supabase/supabase-original',
  stripe: 'stripe/stripe-original',
  elasticsearch: 'elasticsearch/elasticsearch-original',
  'c++': 'cplusplus/cplusplus-original',
  cplusplus: 'cplusplus/cplusplus-original',
  'c#': 'csharp/csharp-original',
  csharp: 'csharp/csharp-original',
  go: 'go/go-original',
  golang: 'go/go-original',
  rust: 'rust/rust-original',
  java: 'java/java-original',
  spring: 'spring/spring-original',
  'spring boot': 'spring/spring-original',
  php: 'php/php-original',
  laravel: 'laravel/laravel-original',
  ruby: 'ruby/ruby-original',
  'ruby on rails': 'rails/rails-original',
  rails: 'rails/rails-original',
  swift: 'swift/swift-original',
  kotlin: 'kotlin/kotlin-original',
  flutter: 'flutter/flutter-original',
  dart: 'dart/dart-original',
  html: 'html5/html5-original',
  html5: 'html5/html5-original',
  css: 'css3/css3-original',
  css3: 'css3/css3-original',
  sass: 'sass/sass-original',
  scss: 'sass/sass-original',
  webpack: 'webpack/webpack-original',
  babel: 'babel/babel-original',
  jest: 'jest/jest-original',
  cypress: 'cypress/cypress-original',
  figma: 'figma/figma-original',
  prisma: 'prisma/prisma-original',
  'rest api': 'postman/postman-original',
  api: 'postman/postman-original',
  'google cloud': 'googlecloud/googlecloud-original',
  gcp: 'googlecloud/googlecloud-original',
  azure: 'azure/azure-original',
  'machine learning': 'tensorflow/tensorflow-original',
  tensorflow: 'tensorflow/tensorflow-original',
  pytorch: 'pytorch/pytorch-original',
  'react.js': 'react/react-original',
  'nodejs': 'nodejs/nodejs-original',
  'expressjs': 'express/express-original',
  'graphql api': 'graphql/graphql-original',
  'tailwindcss/postcss': 'tailwindcss/tailwindcss-original',
  'nginx server': 'nginx/nginx-original',
  'docker compose': 'docker/docker-original',
  'github pages': 'github/github-original',
  'google analytics': 'googlecloud/googlecloud-original',
  'google maps': 'googlecloud/googlecloud-original',
};

export function getTechIconUrl(name) {
  const key = name.toLowerCase().trim();
  const path = TECH_ICONS[key];
  if (!path) return null;
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;
}

export default function TechIcon({ name, size = 16, className = '' }) {
  const [imgError, setImgError] = useState(false);
  const url = getTechIconUrl(name);

  if (!url || imgError) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded bg-secondary text-[8px] font-mono font-bold text-muted-foreground ${className}`}
        style={{ width: size, height: size, minWidth: size }}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }
  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      onError={() => setImgError(true)}
      className={`inline-block object-contain ${className}`}
      style={{ width: size, height: size, minWidth: size }}
      loading="lazy"
    />
  );
}