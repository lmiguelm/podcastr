// SPA - single page application
// SSR - server side rendering
// SSG - static site generation

import { GetStaticProps } from 'next';

export default function Home({ episodes }) {
  return <p>{JSON.stringify(episodes)}</p>;
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes');
  const episodes = await response.json();

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
