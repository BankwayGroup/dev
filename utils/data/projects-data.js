import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';


export const projectsData = [
    {
        id: 1,
        name: 'Completed Projects',
        description: `A portfolio of various projects demonstrating my skills across multiple domains, including AI applications, full-stack development, bot creation, and dynamic website development. 
        - **AI Powered Financial App:** Me and my team built an AI-powered financial mobile application. I developed the API using Express, Typescript, OpenAI, AWS, and MongoDB. Used OTP via AWS SES, Google, and Facebook for the authentication system. Built AI assistants using OpenAI's latest model and trained using our dataset. Voice messages are converted to text using AWS Transcribe. The app fetches data from Google Sheets and generates a PDF term sheet, sent via AWS SES.
        - **Travel Agency App:** Designed and developed a full-stack web app for 2Expedition, a travel agency in Armenia. Created the UI using NextJS, Typescript, MUI, TailwindCSS, Google Maps, Sun-Editor, and React Slick. The app supports multiple languages and currencies. Developed the API using NestJS, Typescript, MySQL, TypeORM, AWS, and Nodemailer. Deployed the front-end app to AWS Amplify and the back-end app to AWS EC2.
        - **AI Powered Real Estate:** Built an AI-based real estate app using Replicate API and OpenAI. Used Express, Typescript, OpenAI, Replicate, Stripe, and Mongoose to develop the API. The UI was created using NextJS, Formik, TailwindCSS, and other npm libraries. Integrated role-based auth, subscription plans, Cron job scheduling, and payment integration with Stripe.
        - **Newsroom Management:** Developed a newspaper management dashboard application called Newsroom Management. As a front-end developer, I worked on creating the dashboard using NextJS, Material UI, Redux, Calendar, and other necessary npm libraries. Used React Redux to manage the application's state and React-hook-form and Sun Editor to handle forms.
        - **Telegram Bots:** Built and deployed two Telegram bots: @GroupUnityRobot and @GroupUnityCaptchaRobot using webhooks with Python, JavaScript, and PHP. These bots automate group management, handle CAPTCHA challenges, and provide interactive features for Telegram groups.
        - **Discord Servers & Bots:** Built and customized several Discord servers with unique features, including bots that automate tasks, manage roles, and enhance user interaction. These bots integrate seamlessly with server functionalities and improve community engagement.
        - **Facebook Bots:** Developed bots for Facebook to handle customer interactions, automate responses, and improve user experience. These bots offer intelligent responses, manage FAQs, and integrate with Facebook's messaging platform.
        - **PHP & JavaScript Websites:** Created several dynamic websites using PHP and JavaScript. These websites include e-commerce platforms, content management systems, and interactive applications tailored to meet clients' needs.`,
        tools: [
            'Express', 'MongoDB', 'OpenAI API', 'AWS SES', 'AWS S3', 'Node Mailer', 'Joi', 'Puppeteer', 
            'EC2', 'PM2', 'Nginx', 'NextJS', 'Tailwind CSS', 'Google Maps', 'NestJS', 'TypeScript', 
            'MySQL', 'Sun-Editor', 'React', 'Bootstrap', 'SCSS', 'Stripe', 'Azure Blob', 'Replicate AI', 
            'Cronjob', 'JWT', 'Material UI', 'Redux', 'Telegram Bot API', 'Python', 'Node.js', 
            'JavaScript', 'PHP', 'Facebook Messenger API', 'HTML', 'CSS'
        ],
        role: 'Full Stack Developer / Bot Developer',
        image: ayla, // Use a single image representative of all projects
    },
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
