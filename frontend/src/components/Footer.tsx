const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">AdmissionPortal 2026</h2>
                        <p className="mb-4 text-gray-400">
                            Empowering students to achieve their dreams with world-class education and facilities.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/courses" className="hover:text-blue-400">Courses</a></li>
                            <li><a href="/facilities" className="hover:text-blue-400">Facilities</a></li>
                            <li><a href="/placements" className="hover:text-blue-400">Placements</a></li>
                            <li><a href="/gallery" className="hover:text-blue-400">Gallery</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <p className="text-gray-400">Email: info@college.edu</p>
                        <p className="text-gray-400">Phone: +91 9876543210</p>
                        <p className="text-gray-400">Location: New Delhi, India</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p>© 2026 AdmissionPortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
