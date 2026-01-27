import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PitStopAdditionalDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pitstopId, setPitstopId] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = searchParams.get('pitstopId');
    const cat = searchParams.get('category');
    
    if (id && cat) {
      setPitstopId(id);
      setCategory(cat);
    } else {
      // Missing parameters, redirect back
      navigate('/pitstop-onboarding');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Additional details form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-black hover:text-gray-900"
        >
          ←
        </button>
        <h1 className="text-lg font-bold" style={{ color: 'var(--brand)' }}>
          Additional Details - Category {category}
        </h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-center mb-6">
            Additional onboarding form for Category {category} pitstops.
            <br />
            Form fields will be added here.
          </p>

          {/* TODO: Add form fields here */}
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50 mt-6"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
