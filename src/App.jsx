import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home Page (Placeholder)</div>} />
          {/* Other routes will go here */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;