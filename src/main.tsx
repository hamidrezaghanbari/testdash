import { createRoot } from 'react-dom/client';

import './app.scss';
import 'nprogress/nprogress.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
