import Link from 'next/link';
import { Card, CardContent, Typography } from '@mui/material';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-xl animate-fadeIn">
                <CardContent className="text-center">
                    <Typography variant="h1" className="text-9xl font-extrabold text-gray-800 animate-pulse">
                        404
                    </Typography>
                    <Typography variant="h5" className="font-semibold text-gray-600">
                        Oops! Page not found.
                    </Typography>
                    <Typography variant="body1" className="mt-4 text-gray-500">
                        The page you are looking for doesn't exist or has been moved.
                    </Typography>
                    <Link href="/" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out">
                        Go Back Home
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;
