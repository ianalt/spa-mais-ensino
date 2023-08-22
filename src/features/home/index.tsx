import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    document.title = '+Ensino: Página inicial';
  }, []);

  return <div>HOME PAGE</div>;
}
