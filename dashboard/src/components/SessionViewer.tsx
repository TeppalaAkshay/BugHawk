import React, { useEffect, useState } from 'react';

const SessionViewer = () => {
  const [sessions, setSessions] = useState<any>({});

  useEffect(() => {
    fetch('http://localhost:4000/sessions') // Add this endpoint later
      .then(res => res.json())
      .then(data => setSessions(data));
  }, []);

  return (
    <div>
      <h2>BugHawk Session Viewer</h2>
      {Object.entries(sessions).map(([sessionId, events]: any) => (
        <div key={sessionId}>
          <h4>Session: {sessionId}</h4>
          <pre>{JSON.stringify(events, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default SessionViewer;
