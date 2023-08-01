import React from "react";
import {Typography} from "@material-ui/core";

const PrivacyPolicy = (props) => {
    const { lang } = props
    return(
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <p>
                Effective Date: August 1, 2023
            </p>
            <p>
               DocBot is committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard the personal data we obtain through our healthcare artificial intelligence (AI) platform and related services ("Services"). By using our Services, you agree to the practices described in this Privacy Policy.
            </p>
            <p>
                <b>Sensitive Information: </b>
                Given the nature of healthcare services, we may collect sensitive information, such as medical conditions, diagnoses, treatment plans, and test results. We will handle this data with the utmost care and in compliance with applicable laws and regulations.
            </p>
            <h2>How we Use Your Information</h2>
            <b>Provision of Services </b>

            <p>We use the collected information to provide and improve our healthcare AI platform and related services, personalize user experience, and enhance our algorithms for more accurate and effective healthcare recommendations.
            </p>

            <b>Communication </b>

            <p>We may use your information to communicate with you regarding service updates, changes to our policies, and other important information.
            </p>

            <b>Research and Development </b>

            <p>To advance medical knowledge and improve our Services, we may de-identify and aggregate data for research and development purposes, ensuring that your personal information remains protected.

            </p>
            <b>Legal Compliance </b>

            <p>We may process your information to comply with applicable laws, regulations, or legal requests, such as responding to court orders or law enforcement inquiries.

            </p>

            <h2>How We Share Your Information</h2>
            <b>Service Providers</b>
            <p>We may share your personal information with trusted third-party service providers who assist us in delivering our Services, subject to their agreement to maintain the confidentiality and security of your data.



            </p>
            <b>Business Transactions</b>
            <p>
                In the event of a merger, acquisition, or sale of our company or assets, your personal information may be transferred to the acquiring entity.

            </p>
            <b>Legal Obligations</b>
            <p>
                We may disclose your personal information if required by law or to protect our rights, privacy, safety, or property, or that of others.

            </p>

            <b>Anonymized and Aggregated Data</b>
            <p>
                We may share de-identified and aggregated data with partners, researchers, or the general public to promote medical research and insights.
            </p>

            <h2>Data Security</h2>
            <p>
                At DocBot, we prioritize the utmost security and confidentiality of user data by implementing robust data encryption mechanisms. When transmitting sensitive and personal information between user devices and our servers, we utilize industry-standard cryptographic protocols such as AES (Advanced Encryption Standard) with strong key lengths. This ensures that all data in transit remains encrypted, safeguarding it from potential unauthorized access and interception.

            </p>

            <p>
                In addition to encryption during transmission, we maintain a defense-in-depth approach to protect data at rest. All sensitive data stored on our servers, including personal health records and medical history, are encrypted using industry-recognized encryption algorithms. This includes encryption at the file level or, when applicable, encryption of specific database fields. We follow the principle of data minimization, ensuring that we encrypt only the necessary data required for providing our healthcare AI platform's services.

            </p>

            <p>
                Our encryption methods are designed to meet or exceed industry best practices and regulatory requirements, ensuring that your data remains secure throughout its lifecycle. We regularly assess and update our encryption protocols to address emerging security threats and maintain a robust security posture.

            </p>
            <p>
                By adopting strong data encryption measures, we aim to instill confidence in our users, assuring them that their personal information is handled with the highest level of protection. We take our responsibility to safeguard user data seriously, and data encryption is a key component of our comprehensive security strategy.




            </p>

            <h2>Your Choices and Rights</h2>

            <b>Removing data</b>
            <p>If you want to remove your chats, you can reach out to the DocBot team and they will do so.</p>

            <b>Data Retention</b>
            <p>
                We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.

            </p>

            <h2>Children's Policy</h2>
            <p>
                Our Services are not intended for use by children under the age of 18. If we learn that we have collected personal information from a child without parental consent, we will take appropriate steps to remove such data from our systems.

            </p>
        </Typography>
    )
}

export default PrivacyPolicy