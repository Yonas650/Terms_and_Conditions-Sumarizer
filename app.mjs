import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as marked from 'marked';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

//check and create the uploads directory synchronously
const uploadsDir = path.join(__dirname, 'uploads');
if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created successfully.');
}

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname;
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prompt = `
You are a sophisticated AI trained to assist users by summarizing complex legal documents into clear, structured, and concise summaries. Your task is to analyze the provided Terms of Service document and generate a summary that includes:
1. Key Responsibilities: Summarize the main responsibilities and obligations of the user.
2. Rights: Outline the rights granted to the user by the terms.
3. Limitations: Highlight any limitations on the user’s rights, including data usage and content restrictions.
4. Termination Clauses: Describe the conditions under which the service and the user can terminate the agreement.
5. Data Privacy: Explain how the user's data will be collected, used, and protected.
6. Renewal and Cancellation: Detail the terms regarding subscription renewals, cancellations, and any penalties involved.
`;

async function callOpenAIAPI(text) {
    const apiURL = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    };
    const payload = {
        "model": "gpt-4-turbo",
        "messages": [{"role": "system", "content": prompt}, {"role": "user", "content": text}]
    };

    const response = await fetch(apiURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return marked.parse(result.choices[0].message.content.trim());
}

app.get('/', (req, res) => {
    res.render('submit-tos');
});

app.post('/summarize', async (req, res) => {
    const tosText = req.body.tosText;
    if (!tosText) {
        return res.status(400).send("No text provided.");
    }
    try {
        const summaryHtml = await callOpenAIAPI(tosText);
        res.render('summary-display', { summary: summaryHtml });
    } catch (error) {
        console.error(`Error summarizing ToS: ${error.message}`);
        res.status(500).render('error', { message: 'Failed to summarize Terms of Service text' });
    }
});

app.post('/upload', upload.single('tosFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const filePath = path.join(uploadsDir, req.file.filename);
    console.log(`Full path for uploaded file: ${filePath}`);

    //check if file exists before reading
    try {
        if (existsSync(filePath)) {
            const fileData = await fs.readFile(filePath, 'utf8');
            const summaryHtml = await callOpenAIAPI(fileData);
            await fs.unlink(filePath); //delete file after processing
            res.render('summary-display', { summary: summaryHtml });
        } else {
            throw new Error('File does not exist after upload.');
        }
    } catch (error) {
        console.error(`Error processing file: ${error.message}`);
        res.status(500).render('error', { message: 'Failed to process file' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
