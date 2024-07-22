import styles from "./terms-and-conditions.module.css"

const termsPage = () => {
    return (
        <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Terms of Service and Privacy Policy</h1><br />
                </div>
                <br />
                <div className={styles.text}>
                    <p>
                        Welcome to Around ME, a comprehensive collaboration platform designed to streamline your work processes
                        and keep you in sync with your team and departmental goals. By using our services, you agree to comply
                        with and be bound by the following terms and conditions. Please review them carefully.
                    </p>
                    <br />
                    <ul>
                        <li>
                            <h4>Acceptance of Terms</h4>
                        </li>
                        <p>
                            Welcome to Around ME, a comprehensive collaboration platform designed to streamline your work processes
                            and keep you in sync with your team and departmental goals. By using our services, you agree to comply
                            with and be bound by the following terms and conditions. Please review them carefully.
                        </p>
                        <br />
                        <li>
                            <h4>Description of Services</h4>
                        </li>
                        <p>
                            Around ME provides a centralized system for collaboration, enabling users to stay connected with their
                            team, track departmental goals, and integrate shortcuts from various systems into one platform.
                            Our services include, but are not limited to, communication tools, goal tracking, project management,
                            and integrations with third-party applications.
                        </p><br />
                        <li>
                            <h4>User Responsibilities</h4>
                        </li>
                        <div>
                            <ul>
                                <li><b>Account Security: </b>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                                <li><b>Compliance: </b>You agree to use our services in compliance with all applicable laws and regulations.</li>
                                <li><b>Content: </b>You are responsible for all content you upload, share, or otherwise make available through Around ME. You must ensure that your content does not violate any laws or third-party rights.</li>
                            </ul>
                        </div><br />
                        <li>
                            <h4>Prohibited Activities</h4>
                        </li>
                        <div>
                            <p>Users are prohibited from:</p>
                            <ul>
                                <li>Engaging in any unlawful activities.</li>
                                <li>Uploading or distributing any harmful or malicious software.</li>
                                <li>Interfering with or disrupting the integrity or performance of our services.</li>
                                <li>Attempting to gain unauthorized access to our systems or user accounts.</li>
                            </ul>
                        </div><br />
                        <li>
                            <h4>Termination of Service</h4>
                        </li>
                        <p>
                            Around ME reserves the right to suspend or terminate your access to our services at any time,
                            without notice, for conduct that we believe violates these Terms of Service or is harmful to
                            other users of our services.
                        </p><br />
                        <li>
                            <h4>Intellectual Property</h4>
                        </li>
                        <p>
                            All content, trademarks, service marks, trade names, logos, and intellectual property rights
                            related to Around ME are the property of the company or its licensors. You are granted a limited,
                            non-exclusive, non-transferable license to use our services.
                        </p><br />
                        <li>
                            <h4>Limitation of Liability</h4>
                        </li>
                        <p>
                            Around ME will not be liable for any direct, indirect, incidental, special, consequential, or punitive
                            damages arising out of your use of our services, even if we have been advised of the possibility of
                            such damages.
                        </p><br />
                        <li>
                            <h4>Modifications to Terms</h4>
                        </li>
                        <p>
                            Around ME reserves the right to modify these Terms of Service at any time. We will notify you of any
                            changes by posting the new terms on our website. Your continued use of our services following any
                            changes constitutes your acceptance of the new terms.
                        </p><br />
                        <li>
                            <h4>Information We Collect</h4>
                        </li>
                        <div>
                            <ul>
                                <li>
                                    <b>Personal Information: </b>We may collect personal information such as your name, email address, phone number, and company information when you register for an account or use our services. 
                                </li>
                                <li>
                                    <b>Usage Data: </b>We collect information about your interactions with our platform, including IP addresses, browser types, access times, and pages viewed.
                                </li>
                                <li>
                                    <b>Cookies: </b>We use cookies and similar tracking technologies to track activity on our service and hold certain information.
                                </li>
                            </ul>
                        </div><br />
                        <li>
                            <h4>How We Use Your Information</h4>
                        </li>
                        <div>
                            <ul>
                                <li>
                                    <b>To Provide and Maintain Our Service: </b>We use your information to operate and maintain our platform. 
                                </li>
                                <li>
                                    <b>To Communicate with You: </b>We may use your contact information to send you updates, newsletters, and promotional materials.
                                </li>
                                <li>
                                    <b>To Improve Our Services: </b>We analyze usage data to improve the functionality and user experience of our platform.
                                </li>
                            </ul> 
                        </div><br />
                        <li>
                            <h4>Sharing Your Information</h4>
                        </li>
                        <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this Privacy Policy:</p>
                        <div>
                            <ul>
                                <li>
                                    <b>Service Providers: </b>We may share your information with third-party service providers who perform services on our behalf. 
                                </li>
                                <li>
                                    <b>Legal Requirements: </b>We may disclose your information if required by law or in response to valid requests by public authorities.
                                </li>
                            </ul> 
                    </div><br />
                    <li>
                        <h4>Security of Your Information</h4>
                    </li>
                    <p>
                        We implement a variety of security measures to maintain the safety of your personal information.
                        However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                    </p><br />
                    <li>
                        <h4>Your Rights</h4>
                    </li>
                    <p>
                        You have the right to access, update, or delete the personal information we hold about you.
                        You can manage your account settings through the platform or contact us directly for assistance.
                    </p><br />
                    <li>
                        <h4>Changes to This Privacy Policy</h4>
                    </li>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                        the new Privacy Policy on our website.
                    </p><br />
                    </ul>    
                </div>
        </div>
    )
}

export default termsPage;