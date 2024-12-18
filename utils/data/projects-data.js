import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';
import botImage from '/public/image/botImage.jpg';
import websiteImage from '/public/image/websiteImage.jpg';
import discordImage from '/public/image/discordImage.jpg';
import facebookImage from '/public/image/facebookImage.jpg';

export const projectsData = [
    {
        id: 1,
        name: 'AI Powered Financial App',
        description: "Me and my team built an AI-powered financial mobile application. I have developed API using Express, Typescript, OpenAI, AWS, and MongoDB. Used OTP via AWS SES, Google, and Facebook for the authentication system. Built AI assistants using OpenAI's latest model and trained using our dataset. Voice messages are converted to text using AWS Transcribe. The app fetches data from Google Sheets and generates a PDF term sheet, sent via AWS SES.",
        tools: ['Express', 'MongoDB', 'OpenAI API', 'AWS SES', 'AWS S3', 'Node Mailer', 'Joi', 'Puppeteer', 'EC2', 'PM2', 'Nginx'],
        role: 'Backend Developer',
        code: '',
        demo: '',
        image: crefin,
    },
    {
        id: 2,
        name: 'Travel Agency App',
        description: 'I have designed and developed a full-stack web app for 2Expedition, a travel agency in Armenia. I created the UI using NextJS, Typescript, MUI, TailwindCSS, Google Maps, Sun-Editor, and React Slick. The app supports multiple languages and currencies. I developed the API using NestJS, Typescript, MySQL, TypeORM, AWS, and Nodemailer. I deployed the front-end app to AWS Amplify and the back-end app to AWS EC2.',
        tools: ['NextJS', 'Tailwind CSS', "Google Maps", "NestJS", "TypeScript", "MySQL", "AWS S3", "Sun-Editor", "Gmail Passkey"],
        role: 'Full Stack Developer',
        code: '',
        demo: '',
        image: travel,
    },
    {
        id: 3,
        name: 'AI Powered Real Estate',
        description: 'My team built an AI-based real estate app using Replicate API and OpenAI. We used Express, Typescript, OpenAI, Replicate, Stripe, and Mongoose to develop the API. We utilized NextJS, Formik, TailwindCSS, and other npm libraries for the UI. We have trained multiple AI assistants using the latest GPT model and integrated Replicate API for image processing. We added role-based auth, subscription plans, Cron job scheduling, and payment integration with Stripe.',
        tools: ['React', 'Bootstrap', 'SCSS', 'Stripe', 'Express', 'TypeScript', 'MongoDB', 'Azure Blob', 'OpenAI API', 'Replicate AI', 'Cronjob', 'JWT'],
        code: '',
        role: 'Full Stack Developer',
        demo: '',
        image: realEstate,
    },
    {
        id: 4,
        name: 'Newsroom Management',
        description: "My team and I developed a newspaper management dashboard application called Newsroom Management. As a front-end developer, I worked on creating the dashboard using NextJS, Material UI, Redux, Calendar, and other necessary npm libraries. We used React Redux to manage the application's state and React-hook-form and Sun Editor to handle forms.",
        tools: ['NextJS', 'Material UI', 'Redux', 'Sun Editor', "Calendar"],
        code: '',
        demo: '',
        image: ayla,
        role: 'Full Stack Developer',
    },
    {
        id: 5,
        name: 'Telegram Bots with Webhooks: @GroupUnityRobot & @GroupUnityCaptchaRobot',
        description: "I built and deployed two Telegram bots: @GroupUnityRobot and @GroupUnityCaptchaRobot using webhooks with Python, JavaScript, and PHP. These bots automate group management, handle CAPTCHA challenges, and provide interactive features, enhancing user experience in Telegram groups.",
        tools: ['Telegram Bot API', 'Python', 'Node.js', 'JavaScript', 'PHP', 'Webhooks'],
        role: 'Bot Developer',
        code: '',
        demo: '',
        image: botImage,
    },
    {
        id: 6,
        name: 'Discord Servers & Bots',
        description: "I have built and customized several Discord servers with unique features, including bots that automate tasks, manage roles, and enhance user interaction. These bots integrate seamlessly with the server's functionalities and improve community engagement.",
        tools: ['Discord API', 'Node.js', 'JavaScript', 'Python'],
        role: 'Discord Developer',
        code: '',
        demo: '',
        image: discordImage,
    },
    {
        id: 7,
        name: 'Facebook Bots',
        description: "Developed bots for Facebook to handle customer interactions, automate responses, and improve user experience. These bots offer intelligent responses, manage FAQs, and integrate with Facebook's messaging platform.",
        tools: ['Facebook Messenger API', 'Node.js', 'JavaScript'],
        role: 'Bot Developer',
        code: '',
        demo: '',
        image: facebookImage,
    },
    {
        id: 8,
        name: 'PHP & JavaScript Websites',
        description: "Created several dynamic websites using PHP and JavaScript. These websites include e-commerce platforms, content management systems, and interactive applications tailored to meet clients' needs.",
        tools: ['PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS'],
        role: 'Web Developer',
        code: '',
        demo: '',
        image: websiteImage,
    }
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },
