import Link from 'next/link';

const NotFound: React.FC = () => (
    <div className="error">
      <div className="error-code m-b-10">404</div>
      <div className="error-content">
        <div className="error-message">We couldn't find it...</div>
        <div className="error-desc m-b-30">
          The page you're looking for doesn't exist. <br />
          Perhaps, there pages will help find what you're looking for.
        </div>
        <div>
          <Link href="/auth/login" >
            <a className="btn btn-success p-l-20 p-r-20">Go Home</a>
          </Link>
        </div>
      </div>
    </div>
  );

export default NotFound;
