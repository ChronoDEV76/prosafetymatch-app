import { Link } from 'react-router-dom';

export default function SignupCTA() {
  return (
    <Link
      to="/signup"
      className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      role="button"
      aria-label="Aanmaken account"
    >
      Aanmaken
    </Link>
  );
}

