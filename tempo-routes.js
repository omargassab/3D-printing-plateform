// This file is used by Tempo to route to storyboards
// It's only included in development mode when VITE_TEMPO=true

const routes = [
  {
    path: "/tempobook/*",
    element: <div>Tempo Storyboard</div>,
  },
];

export default routes;
