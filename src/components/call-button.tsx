import { useState } from 'react';

export default function CallButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const makeCall = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const phoneNumber = '+919572167233'; 
      const response = await fetch('/api/make-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.error) {
          throw new Error(`Failed to make the call: ${data.error}`);
        } else {
          throw new Error('Failed to make the call due to an unknown error');
        }
      }
      
      // Show success message
      alert('Call initiated successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={makeCall}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? 'Making call...' : 'Make Call'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
