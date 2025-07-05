"use client";

const page = () => {
  return (
    <div className="px-4 pt-52 md:px-20 text-gray-800 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-[#E84C24] mx-auto mt-4"></div>
        </div>
        <p className="mb-4">
          At <strong>PHOTOFY</strong>, we are committed to protecting your
          privacy. This policy outlines how we collect, use, and safeguard your
          personal information when you visit or use our services.
        </p>

        <h2 className="text-2xl font-semibold text-[#e94f1d] mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address,
          shipping address, phone number, and images you upload to create
          personalised products.
        </p>

        <h2 className="text-2xl font-semibold text-[#e94f1d] mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>To process orders and deliver products</li>
          <li>To personalize user experience</li>
          <li>To improve our website and services</li>
          <li>To send promotional emails (only with your consent)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#e94f1d] mt-6 mb-2">
          3. Image Upload and Privacy
        </h2>
        <p className="mb-4">
          Images you upload are used strictly for product creation and are not
          shared with third parties. We do not retain your images longer than
          necessary for order fulfillment.
        </p>

        <h2 className="text-2xl font-semibold text-[#e94f1d] mt-6 mb-2">
          4. Data Protection
        </h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal
          data from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="text-2xl font-semibold text-[#e94f1d] mt-6 mb-2">
          5. Cookies
        </h2>
        <p className="mb-4">
          We use cookies to enhance your experience on our site. You can control
          cookie preferences through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold text-[#e94f1d] mt-6 mb-2">
          6. Third-Party Services
        </h2>
        <p className="mb-4">
          We may use third-party tools (e.g., payment gateways, analytics) that
          may collect information in accordance with their own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold text-[#e94f1d] mt-6 mb-2">
          7. Your Rights
        </h2>
        <p className="mb-4">
          You have the right to access, modify, or delete your personal data.
          You can contact us to request changes or ask questions regarding our
          data practices.
        </p>

        <h2 className="text-2xl font-semibold text-[#e94f1d] mt-6 mb-2">
          8. Contact Us
        </h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a
            href="mailto:support@photofy.com"
            className="text-[#e94f1d] underline"
          >
            info@photofy.co.uk
          </a>
          .
        </p>

        <p className="text-sm text-gray-600 mt-6">Last updated: May 29, 2025</p>
      </div>
    </div>
  );
};

export default page;
