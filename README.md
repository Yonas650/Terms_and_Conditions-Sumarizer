# Terms of Service Summarizer

## Description
Many users tend to skip reading the Terms of Service when signing up to use a new product or service. This is often because these documents are lengthy and filled with complex legal jargon, making them tedious to go through. However, it's crucial to recognize that agreeing to these terms without reading them can lead to significant legal responsibilities. Users may find themselves legally bound to conditions they were unaware of, which can sometimes include unfavorable clauses such as automatic renewals, cancellation penalties, or unexpected usage limits. The Terms of Service Summarizer is a web application designed to mitigate this risk by providing a concise, understandable summary of the key points, enabling users to acknowledge and comprehend their rights and obligations before agreeing to the terms. Utilizing advanced AI techniques, the application parses complex legal documents and provides a concise summary of the main responsibilities, rights, limitations, termination clauses, data privacy policies, and renewal or cancellation terms.

- **The Terms of Service Summarizer is deployed and accessible on Render. To try the application, visit the following link:**

[Visit the Terms of Service Summarizer](https://termsandconditions-sumarizer-human.onrender.com/)


## Features
- **Text Input:** Users can paste the text of a ToS directly into the application.
- **File Upload:** Users can upload ToS documents in text format.
- **AI-Powered Summaries:** Summaries are generated using the latest GPT model from OpenAI, ensuring accurate and readable outputs.
- **Responsive Design:** Compatible with both desktop and mobile devices.

## Technologies Used
- **Frontend:** HTML, Bootstrap for styling.
- **Backend:** Node.js, Express.js.
- **AI:** OpenAI's GPT for generating summaries.
- **Template Engine:** Handlebars.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (version 14.x or later)
- npm

## Installation
Follow these steps to get your development environment set up:
1. Clone the repository:
    ```bash
    git clone https://github.com/Yonas650/tos-summarizer.git
    cd tos-summarizer
    ```
2. Install the required packages:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and fill it with necessary environment variables:
    ```plaintext
    OPENAI_API_KEY=your_openai_api_key_here
    PORT=3000
    ```
4. Start the application:
    ```bash
    node app.mjs
    ```
   This will run the server on http://localhost:3000.

## Usage
Navigate to http://localhost:3000 in your web browser to start using the application:
- To summarize text, paste the Terms of Service text into the textarea and click "Summarize Text".
- To summarize a document, click "Upload File", select your Terms of Service file, and then click "Upload and Summarize".

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request
