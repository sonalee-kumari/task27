import React, { useState } from 'react';
import useFetch from './useFetch';

function App() {
  const [postId, setPostId] = useState(1);
  const dummyApiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=8`;

  // Consume the custom hook
  const { data, loading, error } = useFetch(dummyApiUrl);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>useFetch Custom Hook Demo</h1>
        <p style={styles.subtitle}>
          Fetching dummy posts from{' '}
          <code style={styles.code}>jsonplaceholder.typicode.com/posts</code>
        </p>
      </header>

      {/* 1. Loading State */}
      {loading && (
        <div style={styles.loadingBox}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading data, please wait...</p>
        </div>
      )}

      {/* 2. Error State */}
      {error && !loading && (
        <div style={styles.errorBox}>
          <h3 style={styles.errorTitle}>Error Occurred</h3>
          <p style={styles.errorMessage}>{error}</p>
        </div>
      )}

      {/* 3. Success / Data Display State */}
      {!loading && !error && data && (
        <div style={styles.grid}>
          {data.map((post) => (
            <article key={post.id} style={styles.card}>
              <span style={styles.badge}>Post #{post.id}</span>
              <h2 style={styles.cardTitle}>{post.title}</h2>
              <p style={styles.cardBody}>{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// Clean and responsive inline styling
const styles = {
  container: {
    maxWidth: '960px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1f2937',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
  },
  code: {
    backgroundColor: '#f3f4f6',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.9em',
    color: '#2563eb',
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 0',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    fontSize: '1.1rem',
    color: '#4b5563',
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '20px',
    color: '#991b1b',
    textAlign: 'center',
    margin: '20px 0',
  },
  errorTitle: {
    margin: '0 0 8px 0',
    fontSize: '1.2rem',
  },
  errorMessage: {
    margin: 0,
    fontSize: '0.95rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '9999px',
    marginBottom: '10px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '10px',
    textTransform: 'capitalize',
  },
  cardBody: {
    fontSize: '0.9rem',
    color: '#4b5563',
    lineHeight: '1.5',
    margin: 0,
  },
};

export default App;
