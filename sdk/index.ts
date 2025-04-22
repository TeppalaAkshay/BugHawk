const BugHawkSDK = (() => {
    const endpoint = 'http://localhost:4000/session/event';
    let sessionId = crypto.randomUUID();
  
    function captureClick(e: MouseEvent) {
      sendEvent('click', {
        tag: (e.target as HTMLElement)?.tagName,
        id: (e.target as HTMLElement)?.id,
        class: (e.target as HTMLElement)?.className,
        x: e.clientX,
        y: e.clientY,
      });
    }
  
    function captureError(e: ErrorEvent) {
      sendEvent('error', {
        message: e.message,
        stack: e.error?.stack,
        filename: e.filename,
        line: e.lineno,
        column: e.colno,
      });
    }
  
    function sendEvent(type: string, details: any) {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ type, timestamp: Date.now(), details }),
      });
    }
  
    function start() {
      window.addEventListener('click', captureClick);
      window.addEventListener('error', captureError);
      console.log('[BugHawk] Session started');
    }
  
    return { start };
  })();
  
  export default BugHawkSDK;
  