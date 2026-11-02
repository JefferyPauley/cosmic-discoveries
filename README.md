# **Final Project**

In this project, your group will create a fully functional website consisting of 4 pages. This is an opportunity to apply all the skills you’ve learned throughout the course, including HTML, CSS, JavaScript, and version control with Git. Your website will be deployed online via GitHub Pages, allowing you to showcase your work to others.

## **Group Responsibilities:**
- Each group consists of 3-4 people.
- Each member should take responsibility for one of the pages, excluding the Home Page and stylesheet.
- The Home Page and stylesheet should be a collaborative effort within the group, to add cohesion through your entire site.
- Each group will work from 1 repository - avoid merge conflicts!
- Each member should use their own API key for their page
- Each student must contribute fairly
  - Commit history **will** be reviewed
**Group leaders for this project are responsible for making the repo you will be working in. All groups are fixed and cannot be changed.**


## Project Requirements
Your website must include the following:

**Homepage**
- Serves as the introduction to your website.
- Should clearly describe the purpose and content of the site.
- Includes navigation links to the other three pages.

**Stylesheet**
- Should make all pages consistent in design and feel
- Theme should match the content of your site

**Three Additional Pages** Each of these pages must include:
- **A functional form:** A form that collects user input (e.g., login, feedback, or search).
- **An API call:** Use a public API to fetch and display data based on user input or interaction.
- **CSS styling and animation:** Create a visually appealing design with at least one animation effect (e.g., hover effects, transitions, or keyframes).
- **Images and Links:** Add ways to engage with users utilizing images and links. Images must be responsive.
- **Responsive design:** The page should look good on both desktop and mobile devices.

**Wireframes and Designs**
- Use a tool like Draw.io, Canva, or another design software to create a wireframe for each page.
- The wireframe should outline the layout, key elements, and basic design.

**Deployment**
- Push your project to a GitHub repository.
- Deploy your website using GitHub Pages.
- Include the live website link in the GitHub repository's README file.

**Submission Requirements**
- Deployed Site
- Submit a PDF document to Blackboard:
  - A link to the live deployed site.
  - A link to the repo
  - What the project is about and the purpose of the website.
  - Who your team members are
  - What did your team members contribute
  - A description of each page
  - Images of the WireFrame and Designs below on page.
- README File on Github Repo:
  - A link to the live deployed site.
  - A short description of your project (two paragraphs):
  - What the project is about and the purpose of the website.
  - A description of each page, including:
    - Its function.
    - The form’s purpose and expected input/output.
    - How the API call works and what data it retrieves.
    - What animations and CSS styles are included.

Wireframes and Designs:

- Upload the wireframe files to your GitHub repository or include a link to them if hosted elsewhere.

## **Folder Structure Layout**

```shell
project-folder/
│
├── index.html # Homepage (root file)
├── about.html  # Example of additional page
├── contact.html # Example of additional page
├── assets/  # Folder for all static assets
│  ├── css/  # Stylesheets
│  │  ├── main.css  # Main CSS file
│  │  └── animations.css # Animation-specific
│  │
│  ├── js/ # JavaScript files
│  │  ├── script.js # Main JavaScript file
│  │  ├── api.js # API handling logic (optional)
│  │
│  ├── images/  # Image files
│  │  ├── logo.png # Example logo file
│  │  └── background.jpg # background image
│  │
│  ├── videos/ # Video files
│  │  └── intro.mp4 # Example video file
│  │
│  └── fonts/  # Custom fonts (if any)
│    └── font-awesome/  # Example font folder
│
├── wireframes/ # Folder for wireframe designs
│  ├── homepage-wireframe.png # Homepage wireframe
│  ├── page2-wireframe.png  # Additional page wireframe
│  └── page3-wireframe.png  # Additional page wireframe
│
├── README.md # Project documentation
├── .gitignore # Files/folders to ignore in Git
└── netlify.toml # Netlify configuration file (if needed)

```




# Need Inspiration? Look at the project below!

**Introduction Stellar Explorations**
 
You have been hired by a fictitious client, Stellar Explorations Inc., a company dedicated to promoting space education and awareness. They would like you to build a website that showcases NASA's publicly available data in an engaging and informative way. Your task is to create a website that fetches data from [NASA's API](https://api.nasa.gov/) and displays it on the website with an intuitive and visually appealing interface. **This project should NOT be a Single Page Application (SPA).**

## Requirements

### **API Key**:

- This API requires the generation of an API key. An API key is a unique identifier used to authenticate requests associated with your project.
- Create your API key by signing up for one at the top of the [NASA API page](https://api.nasa.gov/). Fill out the required information and you should receive your API key in your email inbox.
- **Do not share your API key with anyone.**

### **Home Page**:

- This page should have an overview of Stellar Explorations Inc. and the purpose of the website.
- A navigation menu linking to the different pages of the website.

### **APOD (Astronomy Picture of the Day) Page**:

- Fetch and display the current Astronomy Picture of the Day from the NASA API.
  - You will occasionally receive a video as the URL of the APOD for a given day.
  - Ensure you are sending the appropriate parameter along with the API request to retrieve the thumbnails in the event that this occurs.
- Include the picture, title, explanation, and date.
- Add search functionality to view the APOD for any specific date.
- A navigation menu linking to the different pages of the website.

### **Mars Rover Photos Page**:

- Display recent photos taken by the Mars Curiosity Rover in reverse order.
- A navigation menu linking to the different pages of the website.

### **NASA Earth Observation Data Page**:

- Show satellite images of Earth based on user-specified coordinates (latitude and longitude).
- Include an input form for users to enter the coordinates and date to fetch the corresponding satellite images.
- A navigation menu linking to the different pages of the website.

### **User Experience and Design**:

- The website should be responsive and work well on desktop and mobile devices.
- Use a modern, clean design aesthetic that fits the space exploration theme.

### **(Optional) Wireframe**:

- It is highly recommended that you create a set of wireframes for each page.
- We recommend you use the [drawio.com](https://www.drawio.com/) website to create your wireframe, but it can also be done by hand with a notebook.
- Watch [this video](https://www.youtube.com/watch?v=GDPDIPj5XWY) for more information on creating wireframes using drawio.com.

## Stretch Goals

Add one more page to the website called:

- **Interactive Space Weather Dashboard**:
- This page should display real-time data about space weather (solar flares, geomagnetic storms, etc.).
- It should use graphs and charts to make the data more understandable. For more information on graphing solutions, look into the [ChartJS charting library](https://www.chartjs.org/).

## Tips for Success

- **API Key**: The NASA API requires an API key. To create an API key, follow the instructions on the homepage. You should receive the key in your email inbox. You will need to use this key for all API requests.
- **Organize yourself**: This project will require us to be organized in breaking down our tasks. Take some time on the first day to split your project into smaller digestible chunks and order each task by priority.
- **Wireframing**: Although it is not strictly required, we recommend you create visuals of your project before you start coding. Wireframing will make it easy to modify your vision for the application without modifying code. It's easier to change a wireframe compared to changing code.
